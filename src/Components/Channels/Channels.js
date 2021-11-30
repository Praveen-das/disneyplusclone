import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { channelImageURLs, channelVideoURLs } from '../../assets/URLs/URLs'
import MovieList from '../MovieList/MovieList'
import './channels.css'
import disney from '../../assets/Mobile/disney.webp'
import pixar from '../../assets/Mobile/pixar.webp'
import marvel from '../../assets/Mobile/marvel.webp'
import starWars from '../../assets/Mobile/starWars.webp'
import natgeo from '../../assets/Mobile/natgeo.webp'

function Channels() {
    const params = useParams()
    const [videoPlaying, setVideoPlaying] = useState(true)

    useEffect(() => {
        let video = document.getElementById('video')
        let playPromise = video.play();
        video.src = channelVideoURLs.filter((element) => element.id === params.q)[0].url

        if (playPromise !== undefined) {
            playPromise.then().catch(err => console.log(err))
        }
    })
    return (
        <>
            <div className="cBanner">
                <div className="cbWrapper">
                    <video id="video" onEnded={() => setVideoPlaying(false)} className='cBanner-video' autoPlay={true} mute='true'></video>
                    {!videoPlaying && <img className='cBanner-image' src={channelImageURLs.filter((element) => element.id === params.q)[0].url} alt="" />}
                    <img className='cBanner-image-mobile' src={
                        (params.q === 'disney' && disney) ||
                        (params.q === 'pixar' && pixar) ||
                        (params.q === 'marvel' && marvel) ||
                        (params.q === 'star-wars' && starWars) ||
                        (params.q === 'nat-geo' && natgeo)
                    } alt="" />
                </div>
            </div>
            <MovieList q={params.q === 'nat-geo' ? 'national geographic' : params.q} title={
                (params.q === 'disney' && 'Originals') ||
                (params.q === 'pixar' && 'Originals') ||
                (params.q === 'marvel' && 'Marvel Cinematic Universe') ||
                (params.q === 'star-wars' && 'Movies') ||
                (params.q === 'nat-geo' && 'Originals')
            } />
        </>
    )
}

export default Channels
