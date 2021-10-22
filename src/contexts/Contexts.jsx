import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { BaseURL, movieGenresURL, searchURL, sortURL, tvShowsGenresURL } from "../assets/URLs/URLs"

const Contexts = React.createContext()
export function useHelper() {
    return useContext(Contexts)
}

export default function AuthProvider({ children }) {
    const isoCodes = [{ id: 'en', language: 'English' }, { id: 'hi', language: 'Hindi' }, { id: 'ml', language: 'Malayalam' }, { id: 'ta', language: 'Tamil' }, { id: 'te', language: 'Telugu' }, { id: 'mr', language: 'Marathi' }, { id: 'kn', language: 'Kannada' }, { id: 'bn', language: 'Bengali' },]
    const [loginWindow, setLoginWindow] = useState(false)
    const [alert, setAlert] = useState(false)

    if (alert) {
        console.log();
        setTimeout(() => {
            setAlert(false)
        }, 1000)
    }

    function OTTList(url, pageNumber) {
        const [movies, setMovies] = useState([])
        const [hasMore, setHasMore] = useState(false)
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            setLoading(true)
            axios({
                method: 'GET',
                url: BaseURL + url,
                params: { page: pageNumber }
            }).then((res) => {
                setMovies((previousSlide) => {
                    return [...new Set([...previousSlide, ...res.data.results])]
                })
                setHasMore(res.data.results.length > 0)
                setLoading(false)
            }).catch(err => console.log(err))
        }, [pageNumber, url])

        return ({ movies, hasMore, loading })
    }

    function Genres() {
        let [movieGenres, setMovieGenres] = useState()
        const [tvGenres, setTvGenres] = useState()
        const [genres, setGenres] = useState()

        useEffect(() => {
            axios.get(BaseURL + movieGenresURL).then(res => {
                if (res) {
                    setMovieGenres(res.data.genres)
                }
            }).catch((err) => console.log(err))
        }, [])

        useEffect(() => {
            axios.get(BaseURL + tvShowsGenresURL).then(res => {
                if (res && movieGenres) {
                    setTvGenres(res.data.genres)
                }
            }).catch((err) => console.log(err))
        }, [movieGenres])

        useEffect(() => {
            if (movieGenres && tvGenres) {
                const merged = movieGenres.concat(tvGenres)
                const genreMap = merged.map(genre => {
                    return [genre.id, genre]
                })
                const newMap = new Map(genreMap)
                setGenres([...newMap.values()])
            }
        }, [movieGenres, tvGenres])

        return genres
    }

    function SortMovies(query, pageNumber) {
        const [movies, setMovies] = useState([])
        const [hasMore, setHasMore] = useState(false)
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            setMovies([])
        }, [query])

        useEffect(() => {
            setLoading(true)
            axios({
                method: 'GET',
                url: BaseURL + sortURL,
                params: {
                    page: pageNumber,
                    with_original_language: query,
                    sort_by: 'popularity.desc'
                }
            }).then((res) => {
                setMovies((previousSlide) => {
                    return [...new Set([...previousSlide, ...res.data.results])]
                })
                setHasMore(res.data.results.length > 0)
                setLoading(false)
            }).catch(err => console.log(err))
        }, [query, pageNumber])

        return { movies, hasMore, loading }
    }

    function HandleSearch(query, pageNumber) {
        const [movies, setMovies] = useState([])
        const [hasMore, setHasMore] = useState(false)
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            if (!query) return
            setMovies([])
        }, [query])

        useEffect(() => {
            if (!query) return
            setLoading(true)
            axios({
                method: 'GET',
                url: BaseURL + searchURL,
                params: { query: query, page: pageNumber }
            }).then(res => {
                setMovies(previousMovie => {
                    return [...new Set([...previousMovie, ...res.data.results])]
                })
                setHasMore(res.data.results.length > 0)
                setLoading(false)
            }).catch(err => console.log(err))
        }, [query, pageNumber])

        return { movies, hasMore, loading }
    }

    const value = {
        OTTList,
        Genres,
        SortMovies,
        HandleSearch,
        isoCodes,
        setLoginWindow,
        loginWindow,
        alert,
        setAlert,
    }

    return (
        <Contexts.Provider value={value}>
            {children}
        </Contexts.Provider>
    )
}