import React from 'react'
import './footer.css'

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-left">
                    <div className='footer-links'>
                        <label className='footer-link' htmlFor="">About Disney+ Hotstar</label>
                        <label className='footer-link' htmlFor="">Terms Of Use</label>
                        <label className='footer-link' htmlFor="">Privacy Policy</label>
                        <label className='footer-link' htmlFor="">FAQ</label>
                        <label className='footer-link' htmlFor="">Feedback</label>
                        <label className='footer-link' htmlFor="">Careers</label>
                    </div>
                    <p>© 2021 STAR. All Rights Reserved. HBO, Home Box Office and all related channel and programming logos are service marks of, and all related programming visuals and elements are the property of, Home Box Office, Inc. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <div className='contactUs'>
                        <label htmlFor="">Connect with us</label>
                        <div>
                            <a className="fb" href="https://www.facebook.com/DisneyPlusHotstar">&nbsp;</a>
                            <a className="tw" href="https://twitter.com/DisneyPlusHS">&nbsp;</a>
                        </div>
                    </div>
                    <div className='application'>
                        <div className='application-title'>
                            <a className="playstore" href="https://play.google.com/store/apps/details?id=in.startv.hotstar" target="_blank" rel="noopener noreferrer">&nbsp;</a>
                        </div>
                        <div>
                            <a className="appstore" href="https://itunes.apple.com/in/app/hotstar/id934459219?mt=8" target="_blank" rel="noopener noreferrer">&nbsp;</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
