import React, { useCallback, useEffect, useRef } from 'react'
import './watchlist.css'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { useFirebase } from '../../contexts/FirebaseContext';
import WatchlistCard from '../Cards/WatchlistCard';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function WatchlistTray() {

    const { watchlist } = useFirebase()
    const swiper = useRef()
    const lastElementRef = useRef()

    function handleNavigation(e) {
        if (e.activeIndex !== 0) {
            e.el.children[0].style.cssText = 'visibility : visible; transition: 0.5s'
        } else {
            e.el.children[0].style.cssText = 'visibility : hidden; transition: 0s'
        }
    }

    useEffect(() => {
        if (watchlist && watchlist.length > 6) {
            swiper.current.children[1].style.cssText = 'visibility : visible; transition: 0.5s'
        } else {
            swiper.current.children[1].style.cssText = 'visibility : hidden; transition: 0s'
        }
    }, [watchlist])

    const lastElement = useCallback(node => {
        if (lastElementRef.current) lastElementRef.current.disconnect()
        lastElementRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting)
                return swiper.current.children[1].style.cssText = 'visibility : hidden; transition: 0s'
            return swiper.current.children[1].style.cssText = 'visibility : visible; transition: 0.5s'
        })
        if (node) lastElementRef.current.observe(node)
    }, [])

    return (
        <>
            <div className="trayContainer">
                <label className='list-title' htmlFor="">Watchlist</label>
                <Swiper
                    ref={swiper}
                    navigation={true}
                    slidesPerGroup={6}
                    slidesPerView={6}
                    spaceBetween={10}
                    speed={1000}
                    // freeMode={true}
                    // mousewheel={false}
                    onActiveIndexChange={(e) => handleNavigation(e)}
                    onAfterInit={(e) => handleNavigation(e)}
                    className="wl-Slides"
                >
                    {
                        watchlist && watchlist.map((movie, index) => {
                            return <SwiperSlide key={index} >
                                {
                                    watchlist.length === index + 1 ?
                                        <div ref={lastElement}><WatchlistCard movie={movie} /></div> :
                                        <WatchlistCard movie={movie} />
                                }
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </>
    )
}

export default WatchlistTray
