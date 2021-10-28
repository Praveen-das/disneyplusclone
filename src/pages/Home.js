import React, { useEffect } from 'react'
import { recommended, trendingMovies, trendingShows } from '../assets/URLs/URLs'
import Banner from '../Components/Banner/Banner'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import MovieList from '../Components/MovieList/MovieList'
import WatchlistTray from '../Components/Watchlist/WatchlistTray'
import { useFirebase } from '../contexts/FirebaseContext'

function Home() {

    const { watchlist, currentUser } = useFirebase()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            <Header />
            <Banner url={trendingMovies} />
            {currentUser && watchlist && watchlist.length !== 0 && < WatchlistTray />}
             <MovieList title='Latest & Trending' url={trendingMovies} />
            <MovieList title='Popular Shows' url={trendingShows} />
            <MovieList title='Shows Recommended For You' url={recommended} />
            <Footer />
        </>
    )
}

export default React.memo(Home)
