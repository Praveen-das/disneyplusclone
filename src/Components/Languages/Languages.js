import React from 'react'
import './languages.css'
import { Link } from 'react-router-dom'

function Languages() {
    return (
        <>
            <div className="languages-container">
                <label className='languages-title' htmlFor="">Languages</label>
                <div className="languages-tray">
                    <div className="languages-carousel carousel-expand">
                        <Link to='/languages/hi' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5710/5710/5710-h" alt="" />
                            <div className="carousel-desc">
                                <div><div><img src="https://secure-media1.hotstar.com/r1/languages/PCTV-hindi.svg" alt="" /></div>
                                    <label htmlFor="">Hindi</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/languages/bn' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5708/5708/5708-h" alt="" />
                            <div className="carousel-desc">
                                <div><div><img src="https://secure-media1.hotstar.com/r1/languages/PCTV-bengali.svg" alt="" /></div>
                                    <label htmlFor="">Bengali</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/languages/te' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5714/5714/5714-h" alt="" />
                            <div className="carousel-desc">
                                <div><div><img src="https://secure-media1.hotstar.com/r1/languages/PCTV-telugu.svg" alt="" /></div>
                                    <label htmlFor="">Telugu</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/languages/ml' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5712/5712/5712-h" alt="" />
                            <div className="carousel-desc">
                                <div><div><img src="https://secure-media1.hotstar.com/r1/languages/PCTV-malayalam.svg" alt="" /></div>
                                    <label htmlFor="">Malayalam</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/languages/ta' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/9021/549021-h" alt="" />
                            <div className="carousel-desc">
                                <div><div><img src="https://secure-media1.hotstar.com/r1/languages/PCTV-tamil.svg" alt="" /></div>
                                    <label htmlFor="">Tamil</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/languages/mr' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/old_images/LANGUAGE/5715/5715/5715-h" alt="" />
                            <div className="carousel-desc">
                                <div><div><img src="https://secure-media1.hotstar.com/r1/languages/PCTV-marathi.svg" alt="" /></div>
                                    <label htmlFor="">Marathi</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/languages/en' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5709/5709/5709-h" alt="" />
                            <div className="carousel-desc">
                                <div><div><img src="https://secure-media1.hotstar.com/r1/languages/PCTV-english.svg" alt="" /></div>
                                    <label htmlFor="">English</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="languages-carousel carousel-expand">
                        <Link to='/languages/kn' style={{ margin: '0' }}>
                            <div className='overlay'></div>
                            <img className='languages-carousel-image' src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/sources/r1/cms/prod/old_images/LANGUAGE/5711/5711/5711-h" alt="" />
                            <div className="carousel-desc">
                                <div><div><img src="https://secure-media1.hotstar.com/r1/languages/PCTV-kannada.svg" alt="" /></div>
                                    <label htmlFor="">Kannada</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Languages
