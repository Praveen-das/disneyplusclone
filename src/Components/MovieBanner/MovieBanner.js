import React, { useRef } from 'react'
import { useLocation } from 'react-router';
import { imageURL } from '../../assets/URLs/URLs'
import { Link } from 'react-router-dom'

import './movieBanner.css'

function MovieBanner(props) {
    console.log(props);
    const bannerRef = useRef()
    const location = useLocation()
    const { movie, genres } = location.state

    console.log(movie);

    return (
        <>
            <div className="mbContainer">
                <div className="mBanner" ref={bannerRef}>
                    <div className="bContents">
                        <h1 className='bTitle'>{movie.title}</h1>
                        <label className='bDate' htmlFor="">{movie.release_date} &#8901; </label>
                        {genres && genres.map((genre, index) =>
                            genres.length !== index + 1 ?
                                <label key={index} className='bCategory'>{genre.name} &#8901; </label> :
                                <label key={index} className='bCategory'>{genre.name}</label>
                        )}
                        <p className='mbDescription'>{movie.overview}</p>
                        <div className="mbBtns">
                            <div className="WatchMovieBtn">
                                <span></span>
                                <Link className='bWatchMovie'>Watch Movie</Link>
                            </div>
                            <div className="WatchMovieBtn2">
                                <div className="wl">
                                    <div></div>
                                    <Link className='bWatchList'>WATCHLIST</Link>
                                </div>
                                <div className="share">
                                    <div></div>
                                    <Link className='bShare'>SHARE</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="bImages">
                        <img className='bImage' src={movie.backdrop_path && imageURL + 'original' + movie.backdrop_path} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieBanner
