import React, { useEffect } from 'react'
import Header from '../Components/Header/Header'
import Channels from '../Components/Channels/Channels'
import Footer from '../Components/Footer/Footer'

function ChannelsPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <Header/>
            <Channels/>
            <Footer/>
        </>
    )
}

export default ChannelsPage
