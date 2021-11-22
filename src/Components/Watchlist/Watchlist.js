import React from 'react'
import { useFirebase } from '../../contexts/FirebaseContext'
import './watchlist.css'
import WatchlistCard from '../Cards/WatchlistCard'

function Watchlist() {
    const { watchlist } = useFirebase()

    return (
        <>
            <div className="watchlist-wrapper">
                <label className='watchlist-title' htmlFor="">Watchlist</label>
                <div className="watchlist">
                    {
                        watchlist && watchlist.length !== 0  && watchlist.map((movie, index) => {
                            return <div key={index} className="watchlist-slide-wrapper">
                                <WatchlistCard movie={movie} />
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Watchlist
