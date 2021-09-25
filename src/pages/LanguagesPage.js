import React, { useEffect } from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Languages from '../Components/Languages/Languages'

function LanguagesPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <Header/>
            <Languages/>
            <Footer/>
        </>
    )
}

export default LanguagesPage

