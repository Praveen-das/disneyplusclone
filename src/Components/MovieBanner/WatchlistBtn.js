import React from 'react'
import { useFirebase } from '../../contexts/FirebaseContext'

function WatchlistBtn({movie}) {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useFirebase()

    return (
        <>
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
        </>
    )
}

export default WatchlistBtn
