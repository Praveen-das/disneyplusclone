import React, { useCallback, useEffect, useRef, useState } from 'react'
import './searchbox.css'
import { useHelper } from '../../contexts/Contexts'
import MovieCard from '../Cards/MovieCard'
import { useHistory } from 'react-router'

function Searchbox({open,onClose}) {
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const { HandleSearch } = useHelper()
    const { loading, hasMore, movies } = HandleSearch(query, pageNumber)
    const lastElementRef = useRef()
    const inputRef = useRef()
    const history = useHistory()

    useEffect(() => {
        setPageNumber(1)
    }, [query])

    const lastElement = useCallback(node => {
        if (loading) return
        if (lastElementRef.current) lastElementRef.current.disconnect()
        lastElementRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(previous => previous + 1)
            }
        })
        if (node) lastElementRef.current.observe(node)
    }, [lastElementRef, loading, hasMore])

    return (
            <div id='searchbox-wrapper'>
                <div id='searchbox'>
                    <i onClick={()=>{
                        history.push('/')
                    }} className="fas fa-arrow-left searchbox-backBtn"></i>
                    <input ref={inputRef} onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Start searching...' />
                    <i onClick={() => {
                        setQuery('')
                        inputRef.current.value = ''
                    }} className="fas fa-times"></i>
                </div>
                <div id='search-results'>
                    {
                        movies && movies.map((movie, index) => {
                            if (movie.poster_path && query)
                                return <div key={index} className="sh-slide-wrapper">
                                    {
                                        movies.length === index + 1 && hasMore ?
                                            <div ref={lastElement} className='slide-loading'><i className="fas fa-circle-notch fa-spin" ></i></div> :
                                            <MovieCard movie={movie} />
                                    }
                                </div>
                            return null
                        })
                    }
                    {!query && <div className="placeholder-wrapper"><label className='searchResult-placeholder' htmlFor="">Search for shows, movies, sports and TV channels</label></div>}
                </div>
            </div>
    )
}

export default Searchbox
