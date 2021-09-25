import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import SortHelper from '../Components/SortHelper/SortHelper'

function Results() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <Header/>
            <SortHelper/>
            <Footer/>
        </>
    )
}

export default Results
