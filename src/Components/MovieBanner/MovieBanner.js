import React, { useRef } from 'react'
import { useLocation } from 'react-router';
import { API_KEY, imageURL } from '../../assets/URLs/URLs'
import { Link } from 'react-router-dom'
import MovieList from '../MovieList/MovieList'
import './movieBanner.css'

function MovieBanner() {
    const bannerRef = useRef()
    const location = useLocation()
    const { movie, genres } = location.state


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
                                    pathname: '/movies/watch',
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
            <MovieList title='More Like This' url={`${movie.media_type==='tv' ? 'tv' : 'movie'}/${movie.id}/similar?api_key=${API_KEY}&language=en-US`}/>
        </>
    )
}

export default MovieBanner
