<div className="login-container-overlay" ref={loginRef}>
    <div className="login-container">
        <i onClick={() => setLoginWindow(false)} className="fas fa-times"></i>
        {
            phoneNumber ?
                <label className='login-container-label' htmlFor="">Continue using phone</label> :
                haveAlternateMethod ? <label className='login-container-label' htmlFor="">Have an Email or Facebook account ?</label> :
                    <label className='login-container-label' htmlFor="">Login to continue</label>
        }
        {!phoneNumber && <button className="fb-login-btn" onClick={() => setHaveAlternateMethod(true)}>Have a Facebook/Email account ?</button>}
        {!phoneNumber && <span>or</span>}
        <input ref={phoneNumberRef} className="login-phoneNum" onFocus={(e) => handleStyle(e, 'focus')} onBlur={(e) => handleStyle(e)} onChange={(e) => handleInput(e)} type="text" name="phoneNo" placeholder="Enter your mobile number" />
        {/* <label className='login-warning' htmlFor="">Please enter a valid mobile number</label> */}
        {phoneNumber && <button className="login-btn">CONTINUE</button>}
        {phoneNumber && <p className='login-agree'>By proceeding you Agree to the Terms of use and Privacy policy</p>}
    </div>
</div>