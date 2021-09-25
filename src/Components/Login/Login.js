import React, { useEffect, useRef, useState } from 'react'
import './login.css'

function Login(props) {
    const [phoneNumber, setPhoneNumber] = useState()
    const phoneNumberRef = useRef()
    const loginRef = useRef()

    useEffect(() => {

        if (props && loginRef.current)
            loginRef.current.style.display = 'grid'

        window.onclick = (e) => {
            if (['login-container-overlay', 'fas fa-times'].includes(e.target.className))
                return loginRef.current.style.display = 'none'
            if (e.target.className === 'login-phoneNum')
                return phoneNumberRef.current.style.cssText = 'box-shadow: inset 0 -2px 0 #1f80e0; padding-bottom: 10px;'
            if (phoneNumber) return
            return phoneNumberRef.current.style.cssText = 'box-shadow: inset 0 -1px 0 #1f80e0; padding-bottom: 5px;'
            // if (['result', 'moreResults'].includes(e.target.className)) return

        }
    }, [props, loginRef, phoneNumber])

    function handleInput(e) {
        e.preventDefault()
        setPhoneNumber(e.target.value)
    }

    return (
        <>
            <div className="login-container-overlay" ref={loginRef}>
                <div className="login-container">
                    {/* <span className='login-close'></span> */}
                    <i className="fas fa-times"></i>
                    <label htmlFor="">Login to continue</label>
                    <button className="login-btn">Have a Facebook/Email account ?</button>
                    <span>or</span>
                    <input
                        ref={phoneNumberRef}
                        className="login-phoneNum"
                        onChange={(e) => handleInput(e)}
                        maxLength="100"
                        type="text"
                        id="phoneNo"
                        autoComplete="off"
                        required=""
                        name="phoneNo"
                        tabIndex=""
                        pattern="[0-9]*"
                        inputMode="numeric"
                        placeholder="Enter your mobile number"
                    />
                </div>
            </div>
        </>
    )
}

export default Login
