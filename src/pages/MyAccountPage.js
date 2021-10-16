import React from 'react'
import Header from '../Components/Header/Header'
import MyAccount from '../Components/MyAccount/MyAccount'
import Footer from '../Components/Footer/Footer'

function MyAccountPage() {
    return (
        <>
            <Header MyAccountPage/>
            <MyAccount/>
            <Footer/>
        </>
    )
}

export default MyAccountPage
