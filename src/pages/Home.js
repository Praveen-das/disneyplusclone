import React, { useEffect } from 'react'
import { recommended, trendingMovies, trendingShows } from '../assets/URLs/URLs'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import MovieList from '../Components/MovieList/MovieList'

function Home() {

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    
    return (
        <>
            <Header />
            <Banner url={trendingMovies}/>
            <MovieList title='Latest & Trending' url={trendingMovies}/>
            <MovieList title='Popular Shows' url={trendingShows}/>
            <MovieList title='Shows Recommended For You' url={recommended}/>
            <Footer/>
        </>
    )
}

export default Home
