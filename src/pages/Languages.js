import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import SortedByLanguage from '../Components/Languages/Languages'

function Languages() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <Header/>
            <SortedByLanguage/>
            <Footer/>
        </>
    )
}

export default Languages
