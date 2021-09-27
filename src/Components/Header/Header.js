import React, { useEffect, useRef, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useHelper } from '../../contexts/Contexts'
import { imageURL } from '../../assets/URLs/URLs'

function Header() {
    const [query, setQuery] = useState()
    const [hasMore, setHasMore] = useState(false)
    const [loginWindow, setLoginWindow] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState()
    const [email, setEmail] = useState()
    const [haveAlternateMethod, setHaveAlternateMethod] = useState(false)

    const inputRef = useRef()
    const phoneNumberRef = useRef()
    const searchbox = useRef()
    const loginRef = useRef()

    const { HandleSearch, Genres, } = useHelper()

    const { movies } = HandleSearch(query)
    const genres = Genres()

    useEffect(() => {
        window.onclick = (e) => {
            if (searchbox.current && searchbox.current.contains(e.target))
                return inputRef.current.style.cssText = 'width:350px; border-bottom: 1px solid #1f80e0;'
            inputRef.current.style.cssText = 'width:230px; border-bottom: 1px solid var(--headerFC);'
            if (inputRef.current) {
                inputRef.current.value = ''
                setQuery()
                // inputRef.current.style.cssText = 'width:230px; border-bottom: 1px solid var(--headerFC);'
            }
            if (loginRef.current && loginRef.current === e.target) return setLoginWindow(false)
        }
    }, [loginRef, phoneNumber, searchbox])

    useEffect(() => {
        if (movies.length > 5 && movies.map((movie) => movie.backdrop_path))
            return setHasMore(true)
        return setHasMore(false)
    }, [movies])

    function handleInput(e, type) {
        if (type === 'phonenumber') {
            setPhoneNumber(e.target.value)
        }
        if (type === 'email') {
            setEmail(e.target.value)
        }
    }

    function handleStyle(e, active) {
        active ? e.target.style.cssText = 'box-shadow: inset 0 -2px 0 #1f80e0; padding-bottom: 10px;' :
            e.target.style.cssText = 'box-shadow: inset 0 -1px 0 #1f80e0; padding-bottom: 5px;'
    }

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
                        <button onClick={() => setLoginWindow(true)} className='header-login-btn'>LOGIN</button>
                    </div>
                </div>
            </div >
            {
                loginWindow && <div className="login-container-overlay" ref={loginRef}>
                    {
                        !haveAlternateMethod ?
                            <div className="login-container">
                                {phoneNumber && <i onClick={() => {
                                    setPhoneNumber(false)
                                    phoneNumberRef.current.value = ''
                                }} className="fas fa-arrow-left"></i>}
                                <i onClick={() => setLoginWindow(false)} className="fas fa-times"></i>
                                {
                                    phoneNumber ?
                                        <label className='login-container-label' htmlFor="">Continue using phone</label> :
                                        <label className='login-container-label' htmlFor="">Login to continue</label>
                                }
                                {!phoneNumber && <button className="fb-login-btn" onClick={() => setHaveAlternateMethod(true)}>Have a Facebook/Email account ?</button>}
                                {!phoneNumber && <span>or</span>}
                                <input ref={phoneNumberRef} className="login-phoneNum" onFocus={(e) => handleStyle(e, 'focus')} onBlur={(e) => handleStyle(e)} onChange={(e) => handleInput(e, 'phonenumber')} type="text" name="phoneNo" autoComplete='off' placeholder="Enter your mobile number" />
                                {/* <label className='login-warning' htmlFor="">Please enter a valid mobile number</label> */}
                                {phoneNumber && <button className="login-btn">CONTINUE</button>}
                                {phoneNumber && <p className='login-agree'>By proceeding you Agree to the Terms of use and Privacy policy</p>}
                            </div> :
                            <div className="login-container-alternate">
                                <i onClick={() => setHaveAlternateMethod(false)} className="fas fa-arrow-left"></i>
                                <i onClick={() => setLoginWindow(false)} className="fas fa-times"></i>
                                <label className='login-alternate-label' htmlFor="">Have an Email or Facebook account?</label>
                                <input ref={phoneNumberRef} className="login-email" onFocus={(e) => handleStyle(e, 'focus')} onBlur={(e) => handleStyle(e)} onChange={(e) => handleInput(e, 'email')} type="email" name="phoneNo" autoComplete='off' placeholder="Enter your Email" />
                                <button className="login-btn">CONTINUE <i className="fas fa-chevron-right"></i></button>
                                <span>OR</span>
                                <button className="login-btn-fb">
                                    <i className="fab fa-facebook-square"></i>
                                    LOGIN WITH FACEBOOK
                                </button>
                                {/* <label className='login-warning' htmlFor="">Please enter a valid mobile number</label> */}
                            </div>
                    }
                </div>
            }
        </>
    )
}

export default Header
