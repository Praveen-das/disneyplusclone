import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import MovieBanner from '../Components/MovieBanner/MovieBanner'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'

function Movie() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <Header />
            <MovieBanner/>
            <NavbarBottom/>
            <Footer />
        </>
    )
}

export default Movie
