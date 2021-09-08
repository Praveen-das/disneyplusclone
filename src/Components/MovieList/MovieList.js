import React, { useCallback, useRef, useState } from 'react'
import './movieList.css'
import { imageURL } from '../../assets/URLs/URLs'
import { useAuth } from '../../contexts/AuthContext'

function MovieList(props) {
    const leftRef = useRef()
    const rightRef = useRef()
    const [pageNumber, setPageNumber] = useState(1);
    var [currentSlide, setCurrentSlide] = useState(0)

    const {
        OTTList
    } = useAuth()

    const { movies, loading, hasMore } = OTTList(pageNumber, props.url)

    const lastElementRef = useRef()
    const firstElementRef = useRef()

    const lastElement = useCallback(node => {
        if (loading) return
        if (lastElementRef.current) lastElementRef.current.disconnect()
        lastElementRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(previous => previous + 1)
            }
        })

        if (node) lastElementRef.current.observe(node)

    }, [loading, hasMore])

    const firstElement = useCallback(node => {
        firstElementRef.current = new IntersectionObserver(entries => {
            if(entries[0]){
                if (entries[0].isIntersecting) {
                    leftRef.current.style.display = 'none'
                } else if(leftRef.current){
                    leftRef.current.style.display = 'inline'
                }
            }
        })

        if (node) firstElementRef.current.observe(node)
    }, [])

    const HandleSwipe = (direction) => {
        direction === 'left' ? setCurrentSlide(currentSlide < 0 ? currentSlide + 99 : '') : setCurrentSlide(currentSlide - 99)
    }

    return (

        <>
            <div className="trayContainer">
                <label className='title' htmlFor="">{props.title}</label>
                <div className="trayWrapper">
                    <span onClick={() => HandleSwipe('left')} className='fa fa-chevron-left leftArrow' ref={leftRef}></span>
                    <span onClick={() => HandleSwipe('right')} className='fa fa-chevron-right rightArrow' ref={rightRef}></span>
                    <div className="slides" style={{ left: `${currentSlide}%` }}>
                        {
                            movies && movies.map((movie, index) => {
                                if (movie.poster_path) {
                                    return <div key={index} className="movieWrapper">
                                        <div className="movieDetalis">
                                            <label className='movieLabel' htmlFor="">{movie.title ? movie.title : movie.name}</label>
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, perferendis.</p>
                                            <div>
                                                <div className='wmBtn'>
                                                    <i className='fa fa-caret-right'></i>
                                                    <a href="/#">WATCH MOVIE</a><br />
                                                </div>
                                                <div className='atfBtn'>
                                                    <i className='fa fa-plus'></i>
                                                    <a href="/#">ADD TO WATCHLIST</a>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            index === 0 ? <img className='movieImage' ref={firstElement} src={movie.poster_path && imageURL + 'w300' + movie.poster_path} alt="" />
                                                : movies.length === index + 1 ? <img className='movieImage' ref={lastElement} alt='' /> : <img className='movieImage' src={movie.poster_path && imageURL + 'w300' + movie.poster_path} alt="" />
                                        }
                                    </div>
                                }
                                return null
                            })
                        }
                        <span>{loading && 'loading....'}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieList
