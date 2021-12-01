import React, { useEffect } from 'react'
import { popularShows, topRatedTvShows, trendingShows } from '../assets/URLs/URLs'
import Banner from '../Components/Banner/Banner'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import MovieList from '../Components/MovieList/MovieList'
import WatchlistTray from '../Components/Watchlist/WatchlistTray'
import { useFirebase } from '../contexts/FirebaseContext'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'

function TV() {

    const { watchlist, currentUser } = useFirebase()

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    
    return (
        <>
            <Header />
            <Banner url={trendingShows} />
            {currentUser && watchlist && watchlist.length !== 0 && < WatchlistTray />}
             <MovieList title='Top picks for you' url={trendingShows} />
            <MovieList title='Popular Shows' url={popularShows} />
            <MovieList title='Shows Recommended For You' url={topRatedTvShows} />
            <NavbarBottom/>
            <Footer />
        </>
    )
}

export default React.memo(TV)
