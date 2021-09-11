import React from 'react'
import { trendingMovies } from '../assets/URLs/URLs'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import MovieBanner from '../Components/MovieBanner/MovieBanner'
import MovieList from '../Components/MovieList/MovieList'

function Movie() {
    return (
        <>
            <Header />
            <MovieBanner/>
            <MovieList title='More Like This' url={trendingMovies}/>
            <Footer />
        </>
    )
}

export default Movie
