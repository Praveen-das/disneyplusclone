import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { BaseURL, movieGenresURL, tvShowsGenresURL } from "../assets/URLs/URLs"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {

    function OTTList(pageNumber, url) {
        const [movies, setMovies] = useState([])
        const [hasMore, setHasMore] = useState(false)
        const [loading, setLoading] = useState(true)
        let [movieGenres, setMovieGenres] = useState()
        const [tvGenres, setTvGenres] = useState()
        const [genres, setGenres] = useState()

        useEffect(() => {
            setLoading(true)
            axios({
                method: 'GET',
                url: BaseURL + url,
                params: { page: pageNumber }
            }).then((res) => {
                setMovies((previousSlide) => {
                    return [
                        ...previousSlide,
                        ...res.data.results.map((movie) => movie)
                    ]
                })
                setHasMore(res.data.results.length > 0)
                setLoading(false)
            }).catch(err => console.log(err))
        }, [pageNumber, url])

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

        return { movies, hasMore, loading, genres }
    }

    const value = {
        OTTList
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}