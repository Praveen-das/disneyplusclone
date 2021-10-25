import React, { useCallback, useRef, useState } from 'react'
import './movieList.css'
import { useHelper } from '../../contexts/Contexts'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import VerticalCard from '../Cards/VerticalCard'

SwiperCore.use([Autoplay, Pagination, Navigation]);


function MovieList(props) {
    const lastElementRef = useRef()
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
                    {
                        movies.length !== 0 && movies.map((movie, index) => {
                            if (movie.poster_path)
                                return <SwiperSlide
                                    key={index} className='active'>
                                    {
                                        movies.length === index + 1 ?
                                            <div ref={lastElement} className='slide-loading'><i className="fas fa-circle-notch fa-spin" ></i></div> :
                                            <VerticalCard movie={movie} />
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

export default MovieList
