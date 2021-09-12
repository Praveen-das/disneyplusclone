import React, { useEffect, useRef, useState } from 'react'
import './header.css'
import { Kids, Logo } from '../../assets/URLs/imgURLs'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { imageURL } from '../../assets/URLs/URLs'

function Header() {
    const [query, setQuery] = useState()
    const [hasMore, setHasMore] = useState(false)
    const [active, setActive] = useState(false)
    const inputRef = useRef()
    const { HandleSearch, Genres } = useAuth()
    const { movies, Loading } = HandleSearch(query)
    const genres = Genres()

    useEffect(() => {
        if (movies.length > 5 && movies.map((movie) => movie.backdrop_path)) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }

        if(active){
            inputRef.current.style.cssText = 'width:350px; border-bottom: 1px solid #1f80e0;'
            
        }else{
            inputRef.current.style.cssText = 'width:230px; border-bottom: 1px solid var(--headerFC);'
        }

    }, [movies, active])

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
                        <label htmlFor="">Movies</label>
                        <div className='dropDownContents'>
                            <Link to='/movies/languages/hi'><h1>Hindi</h1></Link>
                            <Link to='/movies/languages/bn'><h1>Bengali</h1></Link>
                            <Link to='/movies/languages/te'><h1>Telugu</h1></Link>
                            <Link to='/movies/languages/ml'><h1>Malayalam</h1></Link>
                            <Link to='/movies/languages/ta'><h1>Tamil</h1></Link>
                            <Link to='/movies/languages/mr'><h1>Marathi</h1></Link>
                            <Link to='/movies/languages/en'><h1>English</h1></Link>
                            <Link to='/movies/languages/kn'><h1>Kannada</h1></Link>
                        </div>
                    </div>
                    <label href="/#">Premium</label>
                    <label href="/#">Disney+</label>
                    <img className='kidsLogo' src={Kids} alt="kids" />
                </div>
                <div className="right">
                    <div className="searchbox">
                        <input onChange={(e) => setQuery(e.target.value)} onFocus={() => setActive(true)} onBlur={() => setActive(false)} className='search' placeholder='Search' type="text" ref={inputRef}></input>
                        <span className='fa fa-search'></span>
                        <div className="searchResults" style={active && query ? { display: 'block' } : { display: 'none' }}>
                            {
                                movies && movies.map((movie, index) =>
                                    index + 1 <= 5 ?
                                        movie.backdrop_path &&
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
                                        : ''
                                )
                            }
                            {hasMore && <label className='moreResults' htmlFor="">MORE RESULTS</label>}
                        </div>
                    </div>
                    <button>SUBSCRIBE</button>
                    <a href="/#">LOGIN</a>
                </div>
            </div>
        </div >
    )
}

export default Header
