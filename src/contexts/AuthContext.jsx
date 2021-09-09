import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { BaseURL, movieGenres, tvShowsGenres } from "../assets/URLs/URLs"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {

    function OTTList(pageNumber, url) {
        const [movies, setMovies] = useState([])
        const [hasMore, setHasMore] = useState(false)
        const [loading, setLoading] = useState(true)
        const [movieGenre, setMovieGenre] = useState()
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
            axios.get(BaseURL + movieGenres).then(res => {    
                if(res){
                    setMovieGenre(res.data.genres)
                } 
            }).catch((err) => console.log(err))
        }, [])
        
        useEffect(() => {
            axios.get(BaseURL + tvShowsGenres).then(res => {    
                if(res && movieGenre){
                    setGenres(res.data.genres.concat(movieGenre))
                } 
            }).catch((err) => console.log(err))
        }, [movieGenre])

        

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