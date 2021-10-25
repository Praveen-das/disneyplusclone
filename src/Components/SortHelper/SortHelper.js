import React, { useCallback, useRef, useState } from 'react'
import { useParams } from 'react-router'
import {  sortURL } from '../../assets/URLs/URLs'
import { useHelper } from '../../contexts/Contexts'
import VerticalCard from '../Cards/VerticalCard'
import './sortHelper.css'

function SortHelper() {
    const { Genres, SortMovies, isoCodes, HandleSearch, OTTList } = useHelper()
    const lastElementRef = useRef()
    const [pageNumber, setPageNumber] = useState(1);
    const params = useParams()
    const genres = Genres()


    const { movies, loading, hasMore } =
        (params.language && SortMovies(params.language, pageNumber)) ||
        (params.q && HandleSearch(params.q, pageNumber)) ||
        (params.genres && OTTList(sortURL + `&with_genres=${genres && genres.filter(elem => elem.name === params.genres[0].toUpperCase() + params.genres.slice(1))[0].id}`, pageNumber))

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

        <>
            <div className="sh-tray-wrapper">
                <label className='title' htmlFor="">{
                    params.language ? isoCodes.filter((elements) => params.language.includes(elements.id))[0].language
                        : params.q ?
                            'Showing all results for ' + params.q
                            : 'Showing all results for ' + params.genres[0].toUpperCase() + params.genres.slice(1)
                }</label>
                <div className="sh-tray">
                    {
                        movies && movies.map((movie, index) => {
                            if (movie.poster_path) {
                                return <div key={index} className="sh-slide-wrapper active">
                                    {
                                        movies.length === index + 1 ?
                                            <div ref={lastElement} className='slide-loading'><i className="fas fa-circle-notch fa-spin" ></i></div> :
                                            <VerticalCard movie={movie} />
                                    }
                                </div>
                            }
                            return null
                        })
                    }
                    <span>{loading && 'loading....'}</span>
                </div>
            </div>
        </>
    )
}

export default SortHelper
