import React from 'react'
import './genres.css'
import { Link } from 'react-router-dom'
import { imageURL } from '../../assets/URLs/URLs'

function Genres() {

    return (
        <>
            <div className="languages-container">
                <label className='languages-title' htmlFor="">Genres</label>
                <div className="languages-tray">
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/action' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/chjkfyo57JexWo1YeIZRMk8wA4m.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">ACTION</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/adventure' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/rLHW8UNef8JPYKpdqpeiEkM9nOA.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">ADVENTURE</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/animation' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/ai2FicMUxLCurVkjtYdSvVDWRmS.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">ANIMATION</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/comedy' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/mYooLfghVZnOAF7HoSyKWNkwDXD.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">COMEDY</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/fantasy' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/s7VNgGkbgX2ZB8ctDBJXDBq7yt7.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">FANTASY</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/horror' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/39at4jScjJ92cKYgGjtiH4pYLyu.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">HORROR</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/romance' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/7jjwdoIVPJp7gcDo9uE1sVZi2Rs.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">ROMANCE</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/sci-fi' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/yVSgw4UyXWg0Edl7KMehdhhgIwL.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">SCI FI</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/thriller' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/zcWI9AmtU30rha7M4FkbJrK473G.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">THRILLER</label>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/genres/war' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src={imageURL + 'w400/9cm05tasmuk8KH5ZCoEPVf8QDDZ.jpg'} alt="" />
                            <div className="carousel-desc">
                                <label htmlFor="">WAR</label>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Genres
