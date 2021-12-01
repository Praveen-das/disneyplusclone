import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'
import SortHelper from '../Components/SortHelper/SortHelper'

function Results() {
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return (
        <div id='wrapper'>
            <Header/>
            <SortHelper/>
            <NavbarBottom/>
            <Footer/>
        </div>
    )
}

export default Results
