import React, { useEffect, useRef, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useHelper } from '../../contexts/Contexts'
import { imageURL } from '../../assets/URLs/URLs'
import Login from '../Login/Login'
import Alert from '../Alert/Alert'
import { useFirebase } from '../../contexts/FirebaseContext'
import kidsLogo from '../../assets/Logos/kids-logo.svg'
import disneyplusLogo from '../../assets/Logos/disney-hotstar-logo.svg'
import defaultProfilePicture from '../../assets/Logos/default-profile-picture.svg'

function Header(props) {
    const [query, setQuery] = useState()
    const [hasMore, setHasMore] = useState(false)
    const inputRef = useRef()
    const searchbox = useRef()
    const loginRef = useRef()
    const [active, setActive] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const overlayRef = useRef()

    const {
        HandleSearch,
        Genres,
        alert
    } = useHelper()

    const {
        logout,
        currentUser,
        subscriptions
    } = useFirebase()

    const { movies } = HandleSearch(query)
    const genres = Genres()

    useEffect(() => {
        window.onclick = (e) => {
            if (searchbox.current && searchbox.current.contains(e.target))
                return inputRef.current.style.cssText = 'width:350px; border-bottom: 1px solid #1f80e0;'
            if (inputRef.current) {
                inputRef.current.style.cssText = 'width:230px; border-bottom: 1px solid var(--headerFC);'
                inputRef.current.value = ''
                setQuery()
            }
        }
    }, [loginRef, searchbox])

    useEffect(() => {
        if (movies.length > 5 && movies.map((movie) => movie.backdrop_path))
            return setHasMore(true)
        return setHasMore(false)
    }, [movies])

    function handleOverlay(active) {
        if (active) return setOverlay(active)
        setOverlay(active)
    }

    useEffect(() => {
        if (overlay) return document.body.style.overflow = 'hidden'
        return document.body.style.overflow = 'unset'
    }, [overlay])

    function DetectDevice() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return 'mobile'
        }
        return ''
    }

    return (
        <>
            <div className='navbar-wrapper'>
                <div className="navbar">
                    <div className="left">
                        {overlay && <div ref={overlayRef} className="dropdown-overlay-device" onClick={() => handleOverlay(false)}></div>}
                        <div className='dropDown dropDown-hamburger'>
                            <div className="hamburger" onClick={() => handleOverlay(true)}>
                                <span className='line'></span>
                                <span className='line'></span>
                                <span className='line'></span>
                            </div>
                            <div className='dropDownContents h-dropDownContents'>
                                {currentUser ?
                                    <Link to='/my-account' className="device-account">
                                        <img className='h-user-profile' src={currentUser.photoURL ?
                                            currentUser.photoURL
                                            : defaultProfilePicture
                                        } alt=''></img>
                                        <div className='device-user'>
                                            <label className='device-username' htmlFor="">{(currentUser.displayName || currentUser.phoneNumber)}</label>
                                            <label className='device-type' htmlFor="">Logged in Via <DetectDevice /></label>
                                        </div>
                                    </Link>
                                    :
                                    <Link to='/sign-in' className="device-login">
                                        <label htmlFor="">Log in</label>
                                        <label htmlFor="">For a better experience</label>
                                    </Link>
                                }
                                <Link to='/watchlist' className="device-watchlist">Watchlist</Link>
                                <div className="main-menus">
                                    <Link to={'/languages'}>
                                        <div className="languages movieLinks">
                                            <div className="languages-icon"></div>
                                            <h1 className='menu-languages'>Languages</h1>
                                        </div>
                                    </Link>
                                    <Link to={'/genres'}>
                                        <div className="genres movieLinks">
                                            <div className="genres-icon"></div>
                                            <h1 className='menu-genres'>Genres</h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link to='/'><img className='disneyplus' src={disneyplusLogo} alt="logo" /></Link>
                        <div className='dropDown dropDown-movies'>
                            <label className='title-movies' htmlFor="">Movies</label>
                            <div className='dropDownContents'>
                                <Link className='movieLinks' to={'/movies/languages/hi'}>Hindi</Link>
                                <Link className='movieLinks' to={'/movies/languages/bn'}>Bengali</Link>
                                <Link className='movieLinks' to={'/movies/languages/te'}>Telugu</Link>
                                <Link className='movieLinks' to={'/movies/languages/ml'}>Malayalam</Link>
                                <Link className='movieLinks' to={'/movies/languages/ta'}>Tamil</Link>
                                <Link className='movieLinks' to={'/movies/languages/mr'}>Marathi</Link>
                                <Link className='movieLinks' to={'/movies/languages/en'}>English</Link>
                                <Link className='movieLinks' to={'/movies/languages/kn'}>Kannada</Link>
                            </div>
                        </div>
                        <Link className='title-disneyplus' to="/disneyplus">Disney+</Link>
                        <Link to='/kids'><img className='kidsLogo' src={kidsLogo} alt="kids" /></Link>
                    </div>
                    <div className="right">
                        <div className="searchbox" ref={searchbox}>
                            <input onChange={(e) => setQuery(e.target.value)} className='search' placeholder='Search' type="text" ref={inputRef}></input>
                            <span className='fa fa-search'></span>
                            <div className="searchResults" style={query ? { display: 'block' } : { display: 'none' }}>
                                {
                                    movies && movies.map((movie, index) =>
                                        index + 1 <= 5 ?
                                            movie.backdrop_path &&
                                            <Link
                                                key={index}
                                                style={{ padding: '0' }}
                                                to={{
                                                    pathname: '/movies',
                                                    state: { movie: movie, genres: genres }
                                                }}
                                            >
                                                <div key={index} className="result">
                                                    <img className='rImage' src={imageURL + 'w300' + movie.backdrop_path} alt="" />
                                                    <div className="resultContents">
                                                        <label className='rTitle' htmlFor="">{movie.title || movie.name}</label>
                                                        {genres && genres.filter(elements =>
                                                            movie.genre_ids.includes(elements.id)
                                                        ).map((genre, index) =>
                                                            movie.genre_ids.length !== index + 1 ?
                                                                <label className='rlGenre' key={index}>{genre.name} ,&nbsp; </label> :
                                                                <label className='rlGenre' key={index}>{genre.name}</label>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                            : ''
                                    )
                                }
                                {hasMore && <Link
                                    to={`/movies/search/` + query}
                                    style={{ padding: '0' }}
                                    onClick={() => {
                                        inputRef.current.value = ''
                                        setQuery()
                                    }}
                                ><h1 className='moreResults' >MORE RESULTS</h1></Link>}
                            </div>
                        </div>
                        <Link to='/search'><span className='fa fa-search device-search'></span></Link>
                        {props.MyAccountPage ? '' :
                            subscriptions ? <Link to='/get-started'><button className='subscribe-btn'>UPGRADE</button></Link> :
                                <Link to='/get-started'><button className='subscribe-btn'>SUBSCRIBE</button></Link>
                        }
                        {
                            currentUser ?
                                !props.MyAccountPage && <div className="userInfo">
                                    <img className='user-profile' src={currentUser.photoURL ?
                                        currentUser.photoURL
                                        : defaultProfilePicture
                                    } alt=''></img>
                                    <div className='userInfo-dropDown'>
                                        <div className='dropdown-item'>
                                            <Link to='/watchlist'>Watchlist</Link>
                                        </div>
                                        <div className='dropdown-item'>
                                            <Link to='/my-account'>My Account</Link>
                                        </div>
                                        <div className='dropdown-item'>
                                            <button onClick={() => logout()} className='header-login-btn'>Log out</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <button onClick={() => setActive(true)} className='header-login-btn'>LOGIN</button>
                        }
                    </div>
                </div>
            </div >
            {
                <Login open={active} onClose={() => setActive(false)} />
            }
            {alert && <Alert />}
        </>
    )
}

export default Header
