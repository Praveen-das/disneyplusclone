import React, { useEffect } from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Banner from '../Components/Banner/Banner'
import { sortURL, trendingMovies } from '../assets/URLs/URLs'
import DisneyplusTray from '../Components/DisneyplusTray/DisneyplusTray'
import MovieList from '../Components/MovieList/MovieList'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'

function DisneyPlusPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
         <Header/>
         <Banner url={trendingMovies}/>
         <DisneyplusTray/>
         <MovieList title='Recommended For You' url={sortURL + '&with_genres=16'}/>
         <NavbarBottom/>
         <Footer/>   
        </>
    )
}

export default DisneyPlusPage
