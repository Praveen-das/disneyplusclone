import React, { useEffect, useRef, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useHelper } from '../../contexts/Contexts'
import { imageURL } from '../../assets/URLs/URLs'
import Login from '../Login/Login'

function Header() {
    const [query, setQuery] = useState()
    const [hasMore, setHasMore] = useState(false)
    const [popup, setPopup] = useState(false)
    const inputRef = useRef()
    const searchbox = useRef()
    const { HandleSearch, Genres } = useHelper()
    const { movies } = HandleSearch(query)
    const genres = Genres()
    const [phoneNumber, setPhoneNumber] = useState()
    const phoneNumberRef = useRef()
    const loginRef = useRef()

    useEffect(() => {
        window.onclick = (e) => {
            if (e.target.className === 'search')
                return inputRef.current.style.cssText = 'width:350px; border-bottom: 1px solid #1f80e0;'
            if (['result', 'moreResults'].includes(e.target.className)) return
            if (inputRef.current) {
                inputRef.current.value = ''
                setQuery()
                inputRef.current.style.cssText = 'width:230px; border-bottom: 1px solid var(--headerFC);'
            }
            if (e.target.className === 'header-login-btn') return loginRef.current.style.display = 'grid'
            if (['login-container-overlay', 'fas fa-times'].includes(e.target.className))
                return loginRef.current.style.display = 'none'
            if (e.target.className === 'login-phoneNum')
                return phoneNumberRef.current.style.cssText = 'box-shadow: inset 0 -2px 0 #1f80e0; padding-bottom: 10px;'
            if (phoneNumber) return
            return phoneNumberRef.current.style.cssText = 'box-shadow: inset 0 -1px 0 #1f80e0; padding-bottom: 5px;'
        }
    }, [loginRef, phoneNumber])

    function handleInput(e) {
        e.preventDefault()
        setPhoneNumber(e.target.value)
    }

    // useEffect(() => {

    //     if (popup)
    //         return loginRef.current.style.display = 'grid'
    //         return loginRef.current.style.display = 'none'

    //         // if (e.target.className === 'login-phoneNum')
    //         //     return phoneNumberRef.current.style.cssText = 'box-shadow: inset 0 -2px 0 #1f80e0; padding-bottom: 10px;'
    //         // if (phoneNumber) return
    //         // return phoneNumberRef.current.style.cssText = 'box-shadow: inset 0 -1px 0 #1f80e0; padding-bottom: 5px;'
    //         // if (['result', 'moreResults'].includes(e.target.className)) return

    // }, [popup, loginRef, phoneNumber])

    useEffect(() => {
        if (movies.length > 5 && movies.map((movie) => movie.backdrop_path))
            return setHasMore(true)
        return setHasMore(false)
    }, [movies])

    return (
        <>
            <div className='navbar-wrapper'>
                <div className="navbar">
                    <div className="left">
                        <div className='dropDown'>
                            <div className="hamburger">
                                <span className='line'></span>
                                <span className='line'></span>
                                <span className='line'></span>
                            </div>
                            <div className='dropDownContents h-dropDownContents'>
                                <Link to={'/languages'}><h1 className='movieLinks' >Languages</h1></Link>
                                <Link to={'/genres'}><h1 className='movieLinks' >Genres</h1></Link>
                            </div>
                        </div>
                        <Link to='/'><img className='disneyplus' src='/disney-hotstar-logo.svg' alt="logo" /></Link>
                        <div className='dropDown'>
                            <label htmlFor="">Movies</label>
                            <div className='dropDownContents'>
                                <Link to={'/movies/languages/hi'}><h1 className='movieLinks' >Hindi</h1></Link>
                                <Link to={'/movies/languages/bn'}><h1 className='movieLinks' >Bengali</h1></Link>
                                <Link to={'/movies/languages/te'}><h1 className='movieLinks' >Telugu</h1></Link>
                                <Link to={'/movies/languages/ml'}><h1 className='movieLinks' >Malayalam</h1></Link>
                                <Link to={'/movies/languages/ta'}><h1 className='movieLinks' >Tamil</h1></Link>
                                <Link to={'/movies/languages/mr'}><h1 className='movieLinks' >Marathi</h1></Link>
                                <Link to={'/movies/languages/en'}><h1 className='movieLinks' >English</h1></Link>
                                <Link to={'/movies/languages/kn'}><h1 className='movieLinks' >Kannada</h1></Link>
                            </div>
                        </div>
                        <Link to="/disneyplus">Disney+</Link>
                        <img className='kidsLogo' src='/kids-logo.svg' alt="kids" />
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
                                {hasMore && <Link to={`/movies/search/` + query}
                                    style={{ padding: '0' }}
                                ><h1 className='moreResults' >MORE RESULTS</h1></Link>}
                            </div>
                        </div>
                        <button className='subscribe-btn'>SUBSCRIBE</button>
                        <button className='header-login-btn' onClick={() => setPopup(true)}>LOGIN</button>
                    </div>
                </div>
            </div >
            <div className="login-container-overlay" ref={loginRef}>
                <div className="login-container">
                    {/* <span className='login-close'></span> */}
                    <i className="fas fa-times" onClick={() => setPopup(false)}></i>
                    <label htmlFor="">Login to continue</label>
                    <button className="login-btn">Have a Facebook/Email account ?</button>
                    <span>or</span>
                    <input
                        ref={phoneNumberRef}
                        className="login-phoneNum"
                        onChange={(e) => handleInput(e)}
                        maxLength="100"
                        type="text"
                        id="phoneNo"
                        autoComplete="off"
                        required=""
                        name="phoneNo"
                        tabIndex=""
                        pattern="[0-9]*"
                        inputMode="numeric"
                        placeholder="Enter your mobile number"
                    />
                </div>
            </div>
        </>
    )
}

export default Header
