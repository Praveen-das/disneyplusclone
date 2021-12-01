import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import GetStarted from '../Components/GetStarted/GetStarted'

function GetStaredPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return (
        <>
            <GetStarted />
            <Footer />
        </>
    )
}

export default GetStaredPage
