import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Watchlist from '../Components/Watchlist/Watchlist'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'

function WatchlistPage() {
    return (
        <div id="wrapper">
            <Header />
            <div id="watchlist-wrapper">
                <Watchlist />
            </div>
            <NavbarBottom/>
            <Footer />
        </div>
    )
}

export default WatchlistPage
