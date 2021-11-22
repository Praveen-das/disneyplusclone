import React from 'react'
import { Link } from 'react-router-dom'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'

function ComingSoon() {
    const style= {
        width:'100%',
        height:'65vh',
        display:'grid',
        placeItems:'center'
    }
    return (
        <div style={style}>
            <Link to='/'><img className='device-disneyplus' src='/disney-hotstar-logo.svg' alt="logo" /></Link>
            <h1>Currently not available</h1>
            <NavbarBottom/>
        </div>
    )
}

export default ComingSoon
