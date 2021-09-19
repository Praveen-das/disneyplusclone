import React, { useCallback, useEffect, useRef, useState } from 'react'
import './movieList.css'
import { imageURL } from '../../assets/URLs/URLs'
import { useHelper } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function MovieList(props) {
    const trayRef = useRef()
    const firstElementRef = useRef()
    const lastElementRef = useRef()
    const [pageNumber, setPageNumber] = useState(1);

    const { OTTList, HandleSearch } = useHelper()

    const { movies, genres, loading, hasMore } =
        (props.url && OTTList(pageNumber, props.url)) ||
        (props.q && HandleSearch(props.q, pageNumber))

    const lastElement = useCallback(node => {
        if (loading) return
        if (lastElementRef.current) lastElementRef.current.disconnect()
        lastElementRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(previous => previous + 1)
            }
        })
        if (node) lastElementRef.current.observe(node)
    },[hasMore,loading])


    return (

        <>
            <div className="trayContainer" ref={trayRef}>
                <label className='title' htmlFor="">{props.title}</label>
                <Swiper
                    navigation={true}
                    spaceBetween={10}
                    slidesPerGroup={1}
                    speed={1000}
                    freeMode={true}
                    // width={230}
                    className="mlSlides"
                >
                    {
                        movies && movies.map((movie, index) => {
                            if (movie.poster_path)
                                return <SwiperSlide key={index} className='slideWrapper expand'>
                                    <Link to={{
                                        pathname: '/movies',
                                        state: { movie: movie, genres: genres }
                                    }}>
                                        <div className="slide">
                                            {
                                                index === 0 ? <img className='movieImage' ref={firstElementRef} src={movie.poster_path && imageURL + 'w300' + movie.poster_path} alt="" /> :
                                                    movies.length === index + 1 ? <img className='movieImage' ref={lastElement} alt='' /> :
                                                        <img className='movieImage' src={movie.poster_path && imageURL + 'w300' + movie.poster_path} alt="" />
                                            }
                                            <div className="slideContents">
                                                <label className='movieLabel' htmlFor="">{movie.title ? movie.title : movie.name}</label>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, perferendis.</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='bBtns'>
                                        <div className='wmBtn'>
                                            <i className='fa fa-caret-right'></i>
                                            <Link className='watchMovie' to={{
                                                pathname: '/movies/watch',
                                                state: { movie: movie, genres: genres }
                                            }}>WATCH MOVIE</Link>
                                        </div>
                                        <div className='atfBtn'>
                                            <i className='fa fa-plus'></i>
                                            <Link className='addToFavourite' to="/#">ADD TO WATCHLIST</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            return null
                        })
                    }
                </Swiper>
            </div>
        </>
    )
}

export default MovieList
