import React from 'react'
import './header.css'
import { Kids, Logo } from '../../assets/URLs/imgURLs'
import { Link } from 'react-router-dom'

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
                    <Link to='/'><img className='disneyplus' src={Logo} alt="logo" /></Link>
                    <div className='dropDown'>
                        <label htmlFor="">TV</label>
                        <div className='dropDownContents'>
                            <Link><h1>Hotstar Special</h1></Link>
                            <Link><h1>Quix</h1></Link>
                            <Link><h1>Star Jalsha</h1></Link>
                            <Link><h1>StarPlus</h1></Link>
                            <Link><h1>Star Vijay</h1></Link>
                            <Link><h1>Star Bharat</h1></Link>
                            <Link><h1>Asianet</h1></Link>
                            <Link><h1>Star Maa</h1></Link>
                            <Link><h1>more...</h1></Link>
                        </div>
                    </div>
                    <div className='dropDown'>
                        <label htmlFor="">Movies</label>
                        <div className='dropDownContents'>
                            <Link><h1>Hindi</h1></Link>
                            <Link><h1>Bengali</h1></Link>
                            <Link><h1>Telugu</h1></Link>
                            <Link><h1>Malayalam</h1></Link>
                            <Link><h1>Tamil</h1></Link>
                            <Link><h1>Marathi</h1></Link>
                            <Link><h1>English</h1></Link>
                            <Link><h1>Kannada</h1></Link>
                        </div>
                    </div>
                    <label href="/#">Premium</label>
                    <label href="/#">Disney+</label>
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
