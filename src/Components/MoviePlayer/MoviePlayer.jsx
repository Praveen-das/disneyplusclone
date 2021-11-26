import React, { useEffect, useState } from 'react'
import './moviePlayer.css'
import { useLocation } from 'react-router'
import YouTube from 'react-youtube';
import { API_KEY, BaseURL } from '../../assets/URLs/URLs';
import axios from 'axios';

function MoviePlayer() {
    const location = useLocation()
    const [movieKey, setMovieKey] = useState()
    const { movie } = location.state

    useEffect(() => {
        axios.get(`${BaseURL}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
            setMovieKey(res.data.results[0].key)
        }).catch((err) => console.log(err))
    }, [movie])

    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
        modestbranding: 1,
        rel: 0
    };

    return (
        <div className='player'>
            <YouTube className='youtube' videoId={movieKey} opts={opts} />
        </div >
    )
}

export default MoviePlayer
