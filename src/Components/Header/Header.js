import React, { useEffect, useRef, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useHelper } from '../../contexts/AuthContext'
import { imageURL } from '../../assets/URLs/URLs'

function Header() {
    const [query, setQuery] = useState()
    const [hasMore, setHasMore] = useState(false)
    const [active, setActive] = useState(false)
    const inputRef = useRef()
    const searchbox = useRef()
    const { HandleSearch, Genres } = useHelper()
    const { movies } = HandleSearch(query)
    const genres = Genres()

    useEffect(() => {

        window.onclick = (e) => {
            if (e.target.className === 'search') {
                setActive(true)
            } else {
                if (['result','moreResults'].includes(e.target.className)) return
                if(inputRef.current)
                inputRef.current.value = ''
                setQuery()
                setActive(false)
            }
        }

    }, [])

    useEffect(() => {
        if (movies.length > 5 && movies.map((movie) => movie.backdrop_path)) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }

        if (active) {
            inputRef.current.style.cssText = 'width:350px; border-bottom: 1px solid #1f80e0;'

        } else {
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
                        <div className="searchResults" style={active && query ? { display: 'block' } : { display: 'none' }}>
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
                            {hasMore && <Link to={`/movies/search/`+ query}
                                style={{padding:'0'}}
                                ><h1 className='moreResults' >MORE RESULTS</h1></Link>}
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
