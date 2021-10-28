import React from 'react'
import { Link } from 'react-router-dom'
import { imageURL } from '../../assets/URLs/URLs'
import { useFirebase } from '../../contexts/FirebaseContext';
import './watchlistcard.css'

function WatchlistCard({ movie }) {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useFirebase()

    return (
        <>
            <div className="wl-slide active">
                <Link to={{
                    pathname: '/movies',
                    state: { movie: movie }
                }}>
                    <div className="wl-slide-container">
                        <img className='wl-movieImage' src={movie.backdrop_path && imageURL + 'w300' + movie.backdrop_path} alt="" />
                        <div className="wl-slideContents">
                            <label className='wl-movieLabel' htmlFor="">{movie.title ? movie.title : movie.name}</label>
                            <p className='wl-movieDescription'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, perferendis.</p>
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

export default WatchlistCard
