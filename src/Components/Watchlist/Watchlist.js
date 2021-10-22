import React, { useEffect } from 'react'
import { useFirebase } from '../../contexts/FirebaseContext'
import './watchlist.css'

function Watchlist() {
    const { Watchlist } = useFirebase()
    const movies = Watchlist()
    console.log(movies);
    return (
        <>

        </>
    )
}

export default Watchlist
