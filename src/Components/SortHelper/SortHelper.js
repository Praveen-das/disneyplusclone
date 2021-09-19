import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { imageURL } from '../../assets/URLs/URLs'
import { useHelper } from '../../contexts/AuthContext'
import './sortHelper.css'

function SortHelper() {
    const { Genres, SortMovies, isoCodes, HandleSearch } = useHelper()
    const lastElementRef = useRef()
    const [pageNumber, setPageNumber] = useState(1);
    const params = useParams()
    const genres = Genres()

    useEffect(() => {
        setPageNumber(1)
    }, [params])

    console.log(params.q);

    const { movies, loading, hasMore } =
        (params.language && SortMovies(params.language , pageNumber)) ||
        (params.q && HandleSearch(params.q, pageNumber))

    const lastElement = useCallback(node => {
        if (loading) return
        if (lastElementRef.current) lastElementRef.current.disconnect()
        lastElementRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(previous => previous + 1)
            }
        })

        if (node) lastElementRef.current.observe(node)

    }, [lastElementRef, loading, hasMore])


    return (

        <>
            <div className="lTrayContainer">
                <label className='title' htmlFor="">{
                    params.language ? isoCodes().filter((elements) => params.language.includes(elements.id))[0].language
                        :
                        'Showing all results for ' + params.q
                }</label>
                <div className="lTrayWrapper">
                    <div className="lSlides">
                        {
                            movies && movies.map((movie, index) => {
                                if (movie.poster_path) {
                                    return <div key={index} className="lSlideWrapper expand">
                                        <Link to={{
                                            pathname: '/movies',
                                            state: { movie: movie, genres: genres }
                                        }}>
                                            <div className="lSlide">
                                                {
                                                    movies.length === index + 1 ? <img className='lMovieImage' ref={lastElement} alt='' /> : <img className='lMovieImage' src={movie.poster_path && imageURL + 'w300' + movie.poster_path} alt="" />
                                                }
                                                <div className="lSlideContents">
                                                    <label className='movieLabel' htmlFor="">{movie.title ? movie.title : movie.name}</label>
                                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, perferendis.</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className='bBtns'>
                                            <div className='wmBtn'>
                                                <i className='fa fa-caret-right'></i>
                                                <Link className='watchMovie' to={{
                                                    pathname: '/watch',
                                                    state: { movie: movie, genres: genres }
                                                }}>WATCH MOVIE</Link>
                                            </div>
                                            <div className='atfBtn'>
                                                <i className='fa fa-plus'></i>
                                                <Link className='addToFavourite' to="/#">ADD TO WATCHLIST</Link>
                                            </div>
                                        </div>
                                    </div>
                                }
                                return null
                            })
                        }
                    </div>
                    <span>{loading && 'loading....'}</span>
                </div>
            </div>
        </>
    )
}

export default SortHelper
