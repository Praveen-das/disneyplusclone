import axios from "axios"
import React, { useContext, useEffect, useRef, useState } from "react"
import { BaseURL, movieGenresURL, searchURL, sortURL, tvShowsGenresURL } from "../assets/URLs/URLs"

const AuthContext = React.createContext()

export function useHelper() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {

    function OTTList(pageNumber, url) {
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

        return { movies, hasMore, loading }
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

    function SortMovies(language, pageNumber) {
        const [movies, setMovies] = useState([])
        const [hasMore, setHasMore] = useState(false)
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            setMovies([])
        }, [language])

        useEffect(() => {
            setLoading(true)
            axios({
                method: 'GET',
                url: BaseURL + sortURL,
                params: {
                    page: pageNumber,
                    with_original_language: language,
                    sort_by: 'popularity.desc'
                }
            }).then((res) => {
                setMovies((previousSlide) => {
                    return [...new Set([...previousSlide, ...res.data.results])]
                })
                setHasMore(res.data.results.length > 0)
                setLoading(false)
            }).catch(err => console.log(err))
        }, [language, pageNumber])

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
    function isoCodes() {
        return [{ id: 'en', language: 'English' }, { id: 'hi', language: 'Hindi' }, { id: 'ml', language: 'Malayalam' }, { id: 'ta', language: 'Tamil' }, { id: 'te', language: 'Telugu' }, { id: 'mr', language: 'Marathi' }, { id: 'kn', language: 'Kannada' }, { id: 'bn', language: 'Bengali' },]
    }

    function useOnScreen(node) {
        const lastElementRef = useRef()
        const [isIntersecting, setIntersecting] = useState(false)

        useEffect(() => {
            if(lastElementRef.current)lastElementRef.current.disconnect()
            lastElementRef.current = new IntersectionObserver(entries=>{
                if(entries[0].isIntersecting){
                    setIntersecting(true)
                    console.log(entries[0].isIntersecting);
                }else{
                    setIntersecting(false)
                    console.log(entries[0].isIntersecting);
                }
            })

            if(node)lastElementRef.current.observe(node)

        }, [node])

        return isIntersecting
    }

    const value = {
        OTTList,
        Genres,
        SortMovies,
        HandleSearch,
        isoCodes,
        useOnScreen

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}