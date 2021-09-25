import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import MovieBanner from '../Components/MovieBanner/MovieBanner'

function Movie() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <Header />
            <MovieBanner/>
            <Footer />
        </>
    )
}

export default Movie
