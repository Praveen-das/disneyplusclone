import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { imageURL } from '../../assets/URLs/URLs'
import { useFirebase } from '../../contexts/FirebaseContext';
import './moviecard.css'

function MovieCard({ movie, type }) {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useFirebase()
    const horizontal = type && type

    return (
        <>
            <div className="slide active">
                <Link to={{
                    pathname: '/movies',
                    state: { movie: movie }
                }}>
                    <div className="slide-container">
                        {horizontal ?
                            <img className='movieImage' src={movie.backdrop_path && imageURL + 'w154' + movie.backdrop_path} alt="" />
                            :
                            <img className='movieImage' src={movie.poster_path && imageURL + 'w154' + movie.poster_path} alt="" />
                        }
                        <div className="slideContents">
                            <label className='movieLabel' htmlFor="">{movie.title ? movie.title : movie.name}</label>
                            <p className='movieDescription'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, perferendis.</p>
                        </div>
                    </div>
                </Link>
                <div className='bBtns'>
                    <div className='wmBtn'>
                        <i className='fa fa-caret-right'></i>
                        <Link className='watchMovie' to={{
                            pathname: '/movies/watch',
                            state: { movie: movie }
                        }}>WATCH MOVIE</Link>
                    </div>
                    {
                        watchlist && watchlist.map(o => o.id).includes(movie.id)
                            ?
                            <button onClick={() => removeFromWatchlist(movie)} className='atfBtn'>
                                <i className='fa fa-plus'></i>
                                REMOVE FROM WATCHLIST
                            </button>
                            :
                            <button onClick={() => addToWatchlist(movie)} className='atfBtn'>
                                <i className='fa fa-plus'></i>
                                ADD TO WATCHLIST
                            </button>
                    }
                </div>
            </div>
        </>
    )
}

export default MovieCard
