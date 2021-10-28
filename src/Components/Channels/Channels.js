import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { URLs } from '../../assets/URLs/URLs'
import MovieList from '../MovieList/MovieList'
import './channels.css'

function Channels() {
    const params = useParams()
    const [videoPlaying, setVideoPlaying] = useState(true)

    return (
        <>
            <div className="cBanner">
                <div className="cbWrapper">
                    <video onEnded={()=>setVideoPlaying(false)} className='cBanner-video' src={`/${params.q}Banner.mp4`} mute='true' autoPlay={true}></video>
                    {!videoPlaying && <img loading='lazy' className='cBanner-image' src={URLs.filter((element)=>element.id === params.q)[0].url} alt="" />}
                </div>
            </div>
            <MovieList q={params.q === 'nat-geo' ? 'national geographic' : params.q} title={
                (params.q === 'disney' && 'Originals') ||
                (params.q === 'pixar' && 'Originals') ||
                (params.q === 'marvel' && 'Marvel Cinematic Universe') ||
                (params.q === 'star-wars' && 'Movies') ||
                (params.q === 'nat-geo' && 'Originals')
            }/>
        </>
    )
}

export default Channels
