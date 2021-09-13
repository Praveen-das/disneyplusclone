import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { BaseURL, movieGenresURL, searchURL, sortURL, tvShowsGenresURL } from "../assets/URLs/URLs"

const AuthContext = React.createContext()

export function useAuth() {
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
            setMovies('')
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

    function HandleSearch(query,page) {
        const [movies, setMovies] = useState([])
        const [hasMore, setHasMore] = useState(false)
        const [loading, setLoading] = useState(true)

        useEffect(()=>{
            setMovies([])
        },[query])

        useEffect(() => {
            if(!query) return
            setLoading(true)
            axios({
                method: 'GET',
                url: BaseURL + searchURL,
                params: { query: query, page:page }
            }).then(res => {
                setMovies([...new Set([...res.data.results,...res.data.results.map(elements=> elements.backdrop_path !== null)])])
                setHasMore(res.data.results.length > 0)
                setLoading(false)
            }).catch(err => console.log(err))
        }, [query,page])

        return { movies, hasMore, loading }
    }
    function isoCodes(){
        return [{id:'en',name:'English'},{id:'hi',name:'Hindi'},{id:'ml',name:'Malayalam'},{id:'ta',name:'Tamil'},{id:'te',name:'Telugu'},{id:'mr',name:'Marathi'},{id:'kn',name:'Kannada'},{id:'bn',name:'Bengali'},]
    }

    const value = {
        OTTList,
        Genres,
        SortMovies,
        HandleSearch,
        isoCodes
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}