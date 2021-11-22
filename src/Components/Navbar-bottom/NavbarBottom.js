import React from 'react'
import { Link } from 'react-router-dom'
import './navbarbottom.css'
function NavbarBottom() {
    return (
        <>
            <div className="Bottom-navbar">
                <Link className='nb-links' to='/'>
                    <div className="device-home"></div>
                    <label htmlFor="">Home</label>
                </Link>
                <Link className='nb-links' to='/tv'>
                    <div className="device-tv"></div>
                    <label htmlFor="">TV</label>
                </Link>
                <Link className='nb-links' to='/disneyplus'>
                    <img src="/disney-hotstar-logo-main.svg" alt="" />
                </Link>
                <Link className='nb-links' to='/languages'>
                    <div className="device-movies"></div>
                    <label htmlFor="">Movies</label>
                </Link>
                <Link className='nb-links' to='/sports'>
                    <div className="device-sports"></div>
                    <label htmlFor="">Sports</label>
                </Link>
            </div>
        </>
    )
}

export default NavbarBottom
