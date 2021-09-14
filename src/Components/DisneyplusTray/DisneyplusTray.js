import React, { useEffect, useRef } from 'react'
import './disneyplusTray.css'

function DisneyplusTray() {
    const disneyRef = useRef()
    const pixarRef = useRef()
    const marvelRef = useRef()
    const swRef = useRef()
    const ngRef = useRef()
    const targets = [disneyRef, pixarRef, marvelRef, swRef, ngRef]

    useEffect(() => {
        targets.map((target) =>
            target.current.onmouseenter = () => {
                target.current.play()
            }
        )
    })

    return (
        <>
            <div className="tray-wrapper">
                <div className="tray-carousel">
                    <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6347/746347-h" alt="" />
                    <video ref={disneyRef} className='tray-carousel-video' src='disneyplus.mp4' loop muted></video>
                </div>
                <div className="tray-carousel">
                    <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6348/746348-h" alt="" />
                    <video ref={pixarRef} className='tray-carousel-video' src='pixar.mp4' loop muted></video>
                </div>
                <div className="tray-carousel">
                    <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6349/746349-h" alt="" />
                    <video ref={marvelRef} className='tray-carousel-video' src='marvel.mp4' loop muted></video>
                </div>
                <div className="tray-carousel">
                    <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6357/746357-h" alt="" />
                    <video ref={swRef} className='tray-carousel-video' src='sw.mp4' loop muted></video>
                </div>
                <div className="tray-carousel">
                    <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6355/746355-h" alt="" />
                    <video ref={ngRef} className='tray-carousel-video' src='ng .mp4' loop muted></video>
                </div>
            </div>
        </>
    )
}

export default DisneyplusTray
