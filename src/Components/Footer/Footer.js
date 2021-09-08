import React from 'react'
import './footer.css'

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-left">
                    <label htmlFor="">About Disney+ Hotstar</label>
                    <label htmlFor="">Terms Of Use</label>
                    <label htmlFor="">Privacy Policy</label>
                    <label htmlFor="">FAQ</label>
                    <label htmlFor="">Feedback</label>
                    <label htmlFor="">Careers</label>
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
                    <div className='apps'>
                        <label htmlFor="">Disney+ Hotstar App</label>
                        <div>
                            <a className="playstore" href="https://play.google.com/store/apps/details?id=in.startv.hotstar" target="_blank" rel="noopener noreferrer">&nbsp;</a>
                            <a className="appstore" href="https://itunes.apple.com/in/app/hotstar/id934459219?mt=8" target="_blank" rel="noopener noreferrer">&nbsp;</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
