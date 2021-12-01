import React, { useEffect } from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Languages from '../Components/Languages/Languages'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'

function LanguagesPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div id='wrapper'>
            <Header/>
            <Languages/>
            <NavbarBottom/>
            <Footer/>
        </div>
    )
}

export default LanguagesPage

