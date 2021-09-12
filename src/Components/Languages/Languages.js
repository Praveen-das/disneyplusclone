import React, { useCallback, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { imageURL } from '../../assets/URLs/URLs'
import { useAuth } from '../../contexts/AuthContext'
import './languages.css'

function Languages() {
    const lastElementRef = useRef()
    const { language } = useParams()
    const { Genres, SortMovies } = useAuth()

    const languages = [{id:'en',name:'English'},{id:'hi',name:'Hindi'},{id:'ml',name:'Malayalam'},{id:'ta',name:'Tamil'},{id:'te',name:'Telugu'},{id:'mr',name:'Marathi'},{id:'kn',name:'Kannada'},{id:'bn',name:'Bengali'},]
    const [pageNumber, setPageNumber] = useState(1);

    const genres = Genres()
    const { movies, loading, hasMore } = SortMovies(language,pageNumber)
    
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
                    languages.filter((elements)=> language.includes(elements.id))[0].name
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

export default Languages
