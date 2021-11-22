import React from 'react'
import { imageURL } from '../../assets/URLs/URLs'
import { useHelper } from '../../contexts/Contexts'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom'

import './banner.css'

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Banner(props) {

    const { OTTList, Genres } = useHelper()

    const { movies } = OTTList(props.url, 1)
    const genres = Genres()

    return (
        <>
            <div className="bannerWrapper">
                <Swiper
                    navigation={true}
                    spaceBetween='-17'
                    loop={true}
                    allowTouchMove={false}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    breakpoints={{
                        "320": {
                            "spaceBetween": -17
                        },
                        "376": {
                            "spaceBetween": -20
                        },
                        "581": {
                            "spaceBetween": -35
                        },
                        "769": {
                            "spaceBetween": -65
                        },
                        "1024": {
                            "spaceBetween": -70
                        },
                        "1440": {
                            "spaceBetween": -65
                        },
                    }}
                    className="mySwiper"
                >
                    {movies && movies.map((movie, index) =>
                        <SwiperSlide key={index}>
                            <Link to={{
                                pathname: '/movies',
                                state: { movie: movie, genres: genres }
                            }}>
                                <div className="bContainer">
                                    <div className="banner">
                                        <div className="bContents">
                                            <h1 className='bTitle'>{movie.title ? movie.title : movie.name}</h1>
                                            <div>
                                                {genres && genres.filter(elements =>
                                                    movie.genre_ids.includes(elements.id)
                                                ).map((genre, index) =>
                                                    movie.genre_ids.length !== index + 1 ?
                                                        <label key={index} className='bCategory'>{genre.name} &#8901; </label> :
                                                        <label key={index} className='bCategory'>{genre.name}</label>
                                                )}
                                            </div>
                                            <p className='bDescription'>{movie.overview}</p>
                                        </div>
                                        <div className="imgWrapper">
                                            <img className='bImage' src={movie.backdrop_path && imageURL + 'w780' + movie.backdrop_path} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

        </>
    )
}

export default React.memo(Banner)
