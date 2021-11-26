import React from 'react'
import { useLocation } from 'react-router';
import { API_KEY, imageURL } from '../../assets/URLs/URLs'
import { Link } from 'react-router-dom'
import MovieList from '../MovieList/MovieList'
import './movieBanner.css'
import { useHelper } from '../../contexts/Contexts';
import { useFirebase } from '../../contexts/FirebaseContext';

function MovieBanner() {
    const location = useLocation()
    const { movie } = location.state
    const { Genres } = useHelper()
    const genres = Genres()
    const { watchlist, addToWatchlist, removeFromWatchlist } = useFirebase()

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
                                <span></span>
                                <Link to={{
                                    pathname: '/movies/watch',
                                    state: { movie: movie, genres: genres }
                                }} className='bWatchMovie'>Watch Movie</Link>
                            </div>
                            <div className="WatchMovieBtn2">
                                {
                                    watchlist && watchlist.map(o => o.id).includes(movie.id)
                                        ?
                                        <div onClick={() => removeFromWatchlist(movie)} className="wl">
                                            <i className="fas fa-check"></i>
                                            <label className='bWatchList'>WATCHLIST</label>
                                        </div>
                                        :
                                        <div onClick={() => addToWatchlist(movie)} className="wl">
                                            <i className="fas fa-plus"></i>
                                            <label className='bWatchList'>WATCHLIST</label>
                                        </div>
                                }
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
            <MovieList title='More Like This' url={`${movie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}/similar?api_key=${API_KEY}&language=en-US`} />
        </>
    )
}

export default MovieBanner
