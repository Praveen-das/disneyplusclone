import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Genres from '../Components/Genres/Genres'
import Header from '../Components/Header/Header'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'

function GenresPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div id='wrapper'>
            <Header />
            <Genres />
            <NavbarBottom/>
            <Footer />
        </div>
    )
}

export default GenresPage
