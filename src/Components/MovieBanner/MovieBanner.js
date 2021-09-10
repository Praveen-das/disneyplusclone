import React, { useRef } from 'react'
import { useLocation } from 'react-router';
import { imageURL } from '../../assets/URLs/URLs'
import { Link } from 'react-router-dom'

import './movieBanner.css'

function MovieBanner(props) {
    const bannerRef = useRef()
    const location = useLocation()
    const { movie, genres } = location.state

    console.log(movie);

    return (
        <>
            <div className="mbContainer">
                <div className="mBanner" ref={bannerRef}>
                    <div className="bContents">
                        <h1 className='bTitle'>{movie.title || movie.name}</h1>
                        <label className='bDate' htmlFor="">{movie.release_date || movie.first_air_date} &#8901; </label>
                        {genres && genres.filter(elements =>
                            movie.genre_ids.includes(elements.id)
                        ).map((genre, index) =>
                            movie.genre_ids.length !== index + 1 ?
                                <label key={index} className='bCategory'>{genre.name} &#8901; </label> :
                                <label key={index} className='bCategory'>{genre.name}</label>
                        )}
                        <p className='mbDescription'>{movie.overview}</p>
                        <div className="mbBtns">
                            <div className="WatchMovieBtn">
                                <span></span>
                                <Link to={{
                                    pathname: '/watch',
                                    state: { movie: movie, genres: genres }
                                }} className='bWatchMovie'>Watch Movie</Link>
                            </div>
                            <div className="WatchMovieBtn2">
                                <div className="wl">
                                    <div></div>
                                    <Link to='/#' className='bWatchList'>WATCHLIST</Link>
                                </div>
                                <div className="share">
                                    <div></div>
                                    <Link to='/#' className='bShare'>SHARE</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="imgWrapper">
                        <img className='bImage' src={movie.backdrop_path && imageURL + 'original' + movie.backdrop_path} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieBanner
