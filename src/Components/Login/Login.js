import React, { useRef, useState } from 'react'
import { useHelper } from '../../contexts/Contexts'
import { useFirebase } from '../../contexts/FirebaseContext'
import './login.css'


function Login() {
    const [phoneNumber, setPhoneNumber] = useState()
    const [haveAlternateMethod, setHaveAlternateMethod] = useState(false)
    const [OTPWindow, setOTPWindow] = useState(false)
    const [OTP, setOTP] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const phoneNumberRef = useRef()

    const { setAlert, setLoginWindow } = useHelper()

    const {
        signInWithGoogle,
        signinWithPhonenumber
    } = useFirebase()

    function handleStyle(e, active) {
        active ? e.target.style.cssText = 'box-shadow: inset 0 -2px 0 #1f80e0; padding-bottom: 10px;' :
            e.target.style.cssText = 'box-shadow: inset 0 -1px 0 #1f80e0; padding-bottom: 5px;'
    }

    function handleInput(e, type) {
        if (type === 'phonenumber')
            setPhoneNumber(e.target.value)
        if (type === 'otp')
            setOTP(e.target.value)
    }

    async function handleLogin(type) {
        if (type === 'gmail') {
            setError('')
            setLoading(true)
            await signInWithGoogle().then(res => {
                setLoginWindow(false)
                setAlert(true)
                console.log(res);
            }).catch(err => setError(err))
        }
        if (type === 'phonenumber') {
            setError('')
            setLoading(true)
            phoneNumberRef.current.value = ''
            setOTPWindow(true)
            await signinWithPhonenumber(phoneNumber, 'phonenumber').catch(err => {
                setError(err)
                console.log(err)
            })
            setLoading(false)
        }
        if (OTP) {
            setError('')
            setLoading(true)
            signinWithPhonenumber(OTP, 'otp').then(() => {
                setOTP('')
                setOTPWindow(false)
                setLoginWindow(false)
                setAlert(true)
            }).catch(err => setError(err))
        }
    }


    return (
        <>
            {
                !haveAlternateMethod ?
                    <div className="login-container">
                        {phoneNumber && <i onClick={() => {
                            setPhoneNumber('')
                            phoneNumberRef.current.value = ''
                        }} className="fas fa-arrow-left"></i>}
                        <i onClick={() => setLoginWindow(false)} className="fas fa-times"></i>
                        {
                            OTPWindow ?
                                <label className='login-container-label' htmlFor="">Enter OTP sent to your phone number</label> :
                                phoneNumber ?
                                    <label className='login-container-label' htmlFor="">Continue using phone</label> :
                                    <label className='login-container-label' htmlFor="">Login to continue</label>
                        }
                        {phoneNumber ? '' : OTPWindow ? '' : <button className="fb-login-btn" onClick={() => setHaveAlternateMethod(true)}>Have a Facebook/Email account ?</button>}
                        {phoneNumber ? '' : OTPWindow ? '' : <span>or</span>}
                        {OTPWindow ? <input ref={phoneNumberRef} className="login-phoneNum" onFocus={(e) => handleStyle(e, 'focus')} onBlur={(e) => handleStyle(e)} onChange={(e) => handleInput(e, 'otp')} type="text" name="phoneNo" autoComplete='off' placeholder="Enter your mobile number" /> :
                            <input ref={phoneNumberRef} className="login-phoneNum" onFocus={(e) => handleStyle(e, 'focus')} onBlur={(e) => handleStyle(e)} onChange={(e) => handleInput(e, 'phonenumber')} type="text" name="phoneNo" autoComplete='off' placeholder="Enter your mobile number" />}
                        {error && <label className='login-warning' htmlFor="">Invalid phone number</label>}
                        {(phoneNumber || OTPWindow) && <button style={loading ? { pointerEvents: 'none' } : { pointerEvents: 'initial' }} onClick={() => OTPWindow ? handleLogin('otp') : handleLogin('phonenumber')} className="login-btn" id='login-btn'>CONTINUE</button>}
                        {phoneNumber && !OTPWindow && <p className='login-agree'>By proceeding you Agree to the Terms of use and Privacy policy</p>}
                    </div> :

                    <div className="login-container-alternate">
                        <i onClick={() => setHaveAlternateMethod(false)} className="fas fa-arrow-left"></i>
                        <i onClick={() => setLoginWindow(false)} className="fas fa-times"></i>
                        <label className='login-alternate-label' htmlFor="">Have a Gmail or Facebook account?</label>
                        <button className="login-btn" onClick={() => handleLogin('gmail')}>
                            <i className="fab fa-google"></i>
                            GOOGLE
                        </button>
                        <span>OR</span>
                        <button className="login-btn-fb">
                            <i className="fab fa-facebook-square"></i>
                            FACEBOOK
                        </button>
                    </div>
            }
        </>
    )
}

export default Login
