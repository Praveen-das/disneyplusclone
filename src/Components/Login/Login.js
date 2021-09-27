import React, { useEffect, useRef, useState } from 'react'
import './login.css'


function Login() {
    const phoneNumberRef = useRef()
    const [phoneNumber, setPhoneNumber] = useState()
    const loginRef = useRef()

    useEffect(() => {
        window.onclick = (e) => {

            // if (e.target.className === 'header-login-btn') return loginRef.current.style.display = 'grid'
            if (['login-container-overlay', 'fas fa-times'].includes(e.target.className))
                return loginRef.current.style.display = 'none'
            if (e.target.className === 'login-phoneNum')
                return phoneNumberRef.current.style.cssText = 'box-shadow: inset 0 -2px 0 #1f80e0; padding-bottom: 10px;'
            if (phoneNumber) return
            return phoneNumberRef.current.style.cssText = 'box-shadow: inset 0 -1px 0 #1f80e0; padding-bottom: 5px;'
        }
    }, [loginRef, phoneNumber])

    function handleInput(e) {
        e.preventDefault()
        setPhoneNumber(e.target.value)
    }

    return (
        <>
            <div className="login-container-overlay" ref={loginRef}>
                <div className="login-container">
                    <i className="fas fa-times"></i>
                    {
                        phoneNumber ?
                            <label className='login-container-label' htmlFor="">Continue using phone</label> :
                            <label className='login-container-label' htmlFor="">Login to continue</label>
                    }
                    {!phoneNumber && <button className="fb-login-btn">Have a Facebook/Email account ?</button>}
                    {!phoneNumber && <span>or</span>}
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
                    {/* <label className='login-warning' htmlFor="">Please enter a valid mobile number</label> */}
                    {phoneNumber && <button className="login-btn">CONTINUE</button>}
                    {phoneNumber && <p className='login-agree'>By proceeding you Agree to the Terms of use and Privacy policy</p>}
                </div>
            </div>
        </>
    )
}

export default Login
