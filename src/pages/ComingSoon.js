import React from 'react'
import { Link } from 'react-router-dom'
import NavbarBottom from '../Components/Navbar-bottom/NavbarBottom'
import disneyplusLogo from '../assets/Logos/disney-hotstar-logo.svg'

function ComingSoon() {
    const style= {
        width:'100%',
        height:'65vh',
        display:'grid',
        placeItems:'center'
    }
    return (
        <div style={style}>
            <Link to='/'><img className='device-disneyplus' src={disneyplusLogo} alt="logo" /></Link>
            <h1>Currently not available</h1>
            <NavbarBottom/>
        </div>
    )
}

export default ComingSoon
