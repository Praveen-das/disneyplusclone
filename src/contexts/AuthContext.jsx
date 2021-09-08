import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { BaseURL, genresURL } from "../assets/URLs/URLs"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {

    function OTTList(pageNumber, url) {
        const [movies, setMovies] = useState([])
        const [hasMore, setHasMore] = useState(false)
        const [loading, setLoading] = useState(true)
        const [genresId, setGenresId] = useState()
        const [genres, setGenres] = useState()

        useEffect(() => {
            setLoading(true)
            axios({
                method: 'GET',
                url: BaseURL + url,
                params: { page: pageNumber }
            }).then((res) => {
                setGenresId(res.data.results[1].genre_ids)
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
            axios.get(BaseURL + genresURL).then(res => {    
                if(res && genresId){
                    setGenres(res.data.genres.filter(element => genresId.includes(element.id)))
                } 
            }).catch((err) => console.log(err))
        }, [genresId])

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