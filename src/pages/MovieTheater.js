import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import MoviePlayer from '../Components/MoviePlayer/MoviePlayer'

function MovieTheater() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div>
            <Header/>
            <MoviePlayer/>
            <Footer/>
        </div>
    )
}

export default MovieTheater
