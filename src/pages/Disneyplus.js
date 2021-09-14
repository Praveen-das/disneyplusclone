import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Banner from '../Components/Banner/Banner'
import { recommended, sortURL, trendingMovies } from '../assets/URLs/URLs'
import DisneyplusTray from '../Components/DisneyplusTray/DisneyplusTray'
import MovieList from '../Components/MovieList/MovieList'

function DisneyPlusPage() {
    return (
        <>
         <Header/>
         <Banner url={trendingMovies}/>
         <DisneyplusTray/>
         <MovieList title='Recommended For You' url={sortURL + '&with_genres=16'}/>
         <Footer/>   
        </>
    )
}

export default DisneyPlusPage
