import React, { useEffect } from 'react'
import Header from '../Components/Header/Header'
import MyAccount from '../Components/MyAccount/MyAccount'
import Footer from '../Components/Footer/Footer'

function MyAccountPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return (
        <>
            <Header MyAccountPage/>
            <MyAccount/>
            <Footer/>
        </>
    )
}

export default MyAccountPage
