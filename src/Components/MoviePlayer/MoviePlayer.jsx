import React, { useState } from 'react'
import './moviePlayer.css'
import { useLocation } from 'react-router'
import YouTube from 'react-youtube';
import { API_KEY, BaseURL } from '../../assets/URLs/URLs';
import axios from 'axios';

function MoviePlayer() {
    const location = useLocation()
    const [movieKey, setMovieKey] = useState()
    const { movie, genres } = location.state

    try {
        axios.get(`${BaseURL}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
            setMovieKey(res.data.results[0].key)
        }).catch((err)=> console.log(err))
    } catch (error) {
        console.log(error);
    }

    const opts = {
        height: '480',
        width: '854',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
        modestbranding: 1,
        rel: 0
    };

    return (
        <div className='playerWrapper'>
            <YouTube videoId={movieKey} opts={opts} />
        </div >
    )
}

export default MoviePlayer
