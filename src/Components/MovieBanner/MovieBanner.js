import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { API_KEY, imageURL, sortURL } from '../../assets/URLs/URLs'
import { Link } from 'react-router-dom'
import MovieList from '../MovieList/MovieList'
import './movieBanner.css'
import { useHelper } from '../../contexts/Contexts';
import WatchlistBtn from './WatchlistBtn';

function MovieBanner() {
    const location = useLocation()
    const { movie } = location.state
    const { Genres } = useHelper()
    const genres = Genres()
    const [stringLength, setStringLength] = useState()

    useEffect(() => {
        setStringLength(window.innerWidth / 2)
        window.onresize = () => {
            setStringLength(window.innerWidth / 2)
        }
    }, [movie])

    useEffect(() => {

    }, [movie])

    return (
        <>
            <div className="mbContainer">
                <div className="mBanner">
                    <div className="mBanner-contents-wrapper">
                        <div className='mBanner-contents'>
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
                        </div>
                        <div className="mbBtns">
                            <div className="WatchMovieBtn">
                                
                                <Link to={{
                                    pathname: '/movies/watch',
                                    state: { movie: movie, genres: genres }
                                }} className='bWatchMovie'>Watch Movie</Link>
                            </div>
                            <div className="WatchMovieBtn2">
                                <WatchlistBtn movie={movie} />
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
            <div className="movieBanner-details">
                <h1 htmlFor="">{movie.title || movie.name}</h1>
                {genres && genres.filter(elements =>
                    movie.genre_ids.includes(elements.id)
                ).map((genre, index) =>
                    movie.genre_ids.length !== index + 1 ?
                        <label key={index} className='bCategory'>{genre.name} &#8901; </label> :
                        <label key={index} className='bCategory'>{genre.name}</label>
                )}
                <p>
                    {movie.overview.substring(0, stringLength)}
                    {stringLength < movie.overview.length && <span onClick={(e) => {
                        setStringLength(movie.overview.length)
                    }}>...</span>}
                </p>
                <div className='device-btns'>
                    <WatchlistBtn movie={movie} />
                    <div className="device-share">
                        <i className="fab fa-facebook-square"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fas fa-link"></i>
                    </div>
                </div>
            </div>
            <MovieList title='More Like This' url={`${movie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}/similar?api_key=${API_KEY}&language=en-US`} />
            <MovieList title='New to Disney+' url={sortURL + '&with_genres=16'} />
        </>
    )
}

export default MovieBanner
