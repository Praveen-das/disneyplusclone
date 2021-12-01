import React, { useEffect } from 'react'
import Header from '../Components/Header/Header'
import Channels from '../Components/Channels/Channels'
import Footer from '../Components/Footer/Footer'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'

function ChannelsPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return (
        <>
            <Header/>
            <Channels/>
            <NavbarBottom/>
            <Footer/>
        </>
    )
}

export default ChannelsPage
