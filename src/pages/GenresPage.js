import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Genres from '../Components/Genres/Genres'
import Header from '../Components/Header/Header'

function GenresPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <Header />
            <Genres />
            <Footer />
        </>
    )
}

export default GenresPage
