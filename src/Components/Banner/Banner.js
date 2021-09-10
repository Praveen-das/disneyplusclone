import React, { useRef } from 'react'
import { imageURL } from '../../assets/URLs/URLs'
import { useAuth } from '../../contexts/AuthContext'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom'

import './banner.css'

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Banner(props) {
    const { OTTList } = useAuth()
    const { movies, genres } = OTTList(1, props.url)
    const bannerRef = useRef()
    
    return (
        <>
            <Swiper
                navigation={true}
                spaceBetween={-65}
                loop={true}
                allowTouchMove={false}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                className="mySwiper"
            >
                {movies && movies.map((movie, index) =>
                
                    <SwiperSlide key={index}>
                        <Link to={{
                            pathname: '/movie',
                            state: { movie: movie, genres: genres }
                        }}>
                        
                            <div className="bContainer">
                                <div key={index} className="banner" ref={bannerRef}>
                                    <div className="bContents">
                                        <h1 className='bTitle'>{movie.title}</h1>
                                        {genres && genres.filter(elements =>
                                            movie.genre_ids.includes(elements.id)
                                        ).map((genre, index) =>
                                            movie.genre_ids.length !== index + 1 ?
                                                <label key={index} className='bCategory'>{genre.name} &#8901; </label> :
                                                <label key={index} className='bCategory'>{genre.name}</label>
                                        )}
                                        <p className='bDescription'>{movie.overview}</p>
                                    </div>
                                    <div className="imgWrapper">
                                        <img className='bImage' src={movie.backdrop_path && imageURL + 'original' + movie.backdrop_path} alt="" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>

        </>
    )
}

export default Banner
