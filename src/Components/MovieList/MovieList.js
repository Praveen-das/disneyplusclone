import React, { useCallback, useRef, useState } from 'react'
import './movieList.css'
import { useHelper } from '../../contexts/Contexts'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import MovieCard from '../Cards/MovieCard'

SwiperCore.use([Autoplay, Pagination, Navigation]);


function MovieList(props) {
    const lastElementRef = useRef()
    const swiper = useRef()
    const [pageNumber, setPageNumber] = useState(1);

    const { OTTList, HandleSearch } = useHelper()

    const { movies, loading, hasMore } =
        (props.url && OTTList(props.url, pageNumber)) ||
        (props.q && HandleSearch(props.q, pageNumber))

    const lastElement = useCallback(node => {
        if (loading) return
        if (lastElementRef.current) lastElementRef.current.disconnect()
        lastElementRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(previous => previous + 1)
            }
        }, { rootMargin: '100%' })
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
                    ref={swiper}
                    navigation={true}
                    // slidesPerGroup={8}
                    slidesPerView={3}
                    speed={1000}
                    // freeMode={true}
                    // mousewheel={false}
                    onBeforeInit={(e) => handleNavigation(e)}
                    onActiveIndexChange={(e) => handleNavigation(e)}
                    breakpoints={{
                        "320": {
                            "slidesPerView": 3,
                            "spaceBetween": 18
                        },
                        "481": {
                            "slidesPerView": 4,
                            "spaceBetween": 16
                        },
                        "581": {
                            "slidesPerView": 5,
                            "spaceBetween": 15
                        },
                        "769": {
                            "slidesPerView": 6,
                            "spaceBetween": 10
                        },
                        "1024": {
                            "slidesPerView": 7,
                            "spaceBetween": 10
                        },
                        "1200": {
                            "slidesPerView": 8,
                            "spaceBetween": 10
                        }
                    }}
                    className="mlSlides"
                >
                    {
                        movies.length !== 0 && movies.map((movie, index) => {
                            if (movie.poster_path)
                                return <SwiperSlide key={index} >
                                    {
                                        movies.length === index + 1 ?
                                            <div ref={lastElement} className='slide-loading'><i className="fas fa-circle-notch fa-spin" ></i></div> :
                                            <MovieCard movie={movie} />
                                    }
                                </SwiperSlide>
                            return null
                        })
                    }
                </Swiper>
            </div>
        </>
    )
}

export default React.memo(MovieList)
