import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
                <div className="tray-carousel ">
                    <Link to='/channels/disney' style={{ margin: '0' }}>
                        <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6347/746347-h" alt="" />
                        <video ref={disneyRef} className='tray-carousel-video' src='https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2Fdisneyplus.mp4?alt=media&token=eff2df7b-f35e-4ff5-89b3-18372e3fc85b' loop muted></video>
                    </Link>
                </div>
                <div className="tray-carousel">
                    <Link to='/channels/pixar' style={{ margin: '0' }}>
                        <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6348/746348-h" alt="" />
                        <video ref={pixarRef} className='tray-carousel-video' src='https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2Fpixar.mp4?alt=media&token=3852cb57-c7fa-4bee-a091-e3f1132db472' loop muted></video>
                    </Link>
                </div>
                <div className="tray-carousel">
                    <Link to='/channels/marvel' style={{ margin: '0' }}>
                        <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6349/746349-h" alt="" />
                        <video ref={marvelRef} className='tray-carousel-video' src='https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2Fmarvel.mp4?alt=media&token=87ff37ea-6240-442d-b25d-ff277717fa81' loop muted></video>
                    </Link>
                </div>
                <div className="tray-carousel">
                    <Link to='/channels/star-wars' style={{ margin: '0' }}>
                        <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6357/746357-h" alt="" />
                        <video ref={swRef} className='tray-carousel-video' src='https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2Fsw.mp4?alt=media&token=fbd6fe25-366a-47fd-8efb-57890328ab3c' loop muted></video>
                    </Link>
                </div>
                <div className="tray-carousel">
                    <Link to='/channels/nat-geo' style={{ margin: '0' }}>
                        <img className='tray-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/6355/746355-h" alt="" />
                        <video ref={ngRef} className='tray-carousel-video' src='https://firebasestorage.googleapis.com/v0/b/disneyplusclone-a78e3.appspot.com/o/Assets%2Fng.mp4?alt=media&token=ca4b3269-a78a-4a04-9b62-56585017a277' loop muted></video>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default DisneyplusTray
