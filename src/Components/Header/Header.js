import React from 'react'
import './header.css'
import { Kids, Logo } from '../../assets/URLs/imgURLs'

function Header() {
    return (
        <div>
            <div className="navbar">
                <div className="left">
                    <div className="hamburger">
                        <span className='line'></span>
                        <span className='line'></span>
                        <span className='line'></span>
                    </div>
                    <img className='disneyplus' src={Logo} alt="logo" />
                    <a href="/#">TV</a>
                    <a href="/#">Movies</a>
                    <a href="/#">Sports</a>
                    <a href="/#">Premium</a>
                    <a href="/#">Disney+</a>
                    <img className='kidsLogo' src={Kids} alt="kids" />
                </div>
                <div className="right">
                    <div className="searchbox">
                        <input className='search' placeholder='Search' type="text" ></input>
                        <span className='fa fa-search'></span>
                    </div>
                    <button>SUBSCRIBE</button>
                    <a href="/#">LOGIN</a>
                </div>
            </div>
        </div>
    )
}

export default Header
