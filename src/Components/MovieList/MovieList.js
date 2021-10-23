import React, { useCallback, useEffect, useRef, useState } from 'react'
import './movieList.css'
import { imageURL } from '../../assets/URLs/URLs'
import { useHelper } from '../../contexts/Contexts'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { useFirebase } from '../../contexts/FirebaseContext'

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

SwiperCore.use([Autoplay, Pagination, Navigation]);


function MovieList(props) {
    const lastElementRef = useRef()
    const [pageNumber, setPageNumber] = useState(1);

    const { OTTList, HandleSearch } = useHelper()
    const {watchlist, addToWatchlist} = useFirebase()

    // useEffect(()=>{
    //     console.log(watchlist);
    // },[watchlist])

    const { movies, genres, loading, hasMore } =
        (props.url && OTTList(props.url, pageNumber)) ||
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
    }, [hasMore, loading])

    function handleNavigation(e) {
        if (e.activeIndex !== 0) {
            e.el.children[0].style.cssText = 'visibility : visible; transition: 0.5s'
        } else {
            e.el.children[0].style.cssText = 'visibility : hidden; transition: 0s'
        }
    }

    return (
        <>
            <div className="trayContainer">
                <label className='list-title' htmlFor="">{props.title}</label>
                <Swiper
                    navigation={true}
                    slidesPerGroup={1}
                    spaceBetween={10}
                    speed={1000}
                    // freeMode={true}
                    // mousewheel={false}
                    onBeforeInit={(e) => handleNavigation(e)}
                    onActiveIndexChange={(e) => handleNavigation(e)}
                    className="mlSlides"
                >
                    {}
                    {
                        movies && movies.map((movie, index) => {
                            if (movie.poster_path)
                                return <SwiperSlide
                                    key={index} className='expand'>
                                    <Link to={{
                                        pathname: '/movies',
                                        state: { movie: movie, genres: genres }
                                    }}>

                                        <div className="slide">
                                            {
                                                movies.length === index + 1 ?
                                                    <div className='slide-loading'><i ref={lastElement} className="fas fa-circle-notch fa-spin" ></i></div> :
                                                    <img className='movieImage' src={movie.poster_path && imageURL + 'w154' + movie.poster_path} alt="" />
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
                                        {
                                            // console.log(watchlist.filter(elm=> elm.id === movie.id))
                                                //                                             ?
                                                // <button className='atfBtn'>
                                                //     <i className='fa fa-plus'></i>
                                                //     REMOVE FROM WATCHLIST
                                                // </button> :
                                                <button onClick={()=>addToWatchlist(movie)} className='atfBtn'>
                                                    <i className='fa fa-plus'></i>
                                                    ADD TO WATCHLIST
                                                </button>
                                        }
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
