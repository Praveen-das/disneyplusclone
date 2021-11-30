import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./getStarted.css";
import { useFirebase } from "../../contexts/FirebaseContext";
import { raw_images } from "./raw_images";
import disneyplusLogo from '../../assets/Logos/disney-hotstar-logo.svg'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

function GetStarted() {
  const { currentUser, logout, addSubscriptionToDatabase } = useFirebase();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState({ super: { color: '#fedf7b' }, premium: { color: 'white' } })
  const [subscription, setSubscription] = useState({ plan: 'super', id: 'plan_INRHb5k8cdluTv' })
  const superBtnRef = useRef()
  const premiumBtnRef = useRef()
  const tbodyRef = useRef([])
  const headerRef = useRef()
  const history = useHistory()

  const buttonStyle = {
    style: `border: 1px solid #1f80e0; background: #1f80e066;`,
    none: `border: 1px solid #465983; background: none`
  }

  const tabelStyle = {
    style: `background: #1e2a48; border-bottom: none; opacity:1;`,
    none: `background: none; border-bottom: 1px solid rgba(255, 255, 255, 0.048); opacity:0.5;`
  }

  function handlePlan(plan) {
    const superColumn = Array.from(tbodyRef.current.children).map(child => child.children[1])
    const premiumColumn = Array.from(tbodyRef.current.children).map(child => child.children[2])
    if (plan === 'premium') {
      setSubscription({ plan: plan, id: 'plan_INR8DJjbEJcOm5' })
      premiumColumn.forEach(child => child.style = tabelStyle.style)
      superColumn.forEach(child => child.style = tabelStyle.none)
      setColor({ super: { color: 'white' }, premium: { color: '#fedf7b' } })
      premiumBtnRef.current.style.cssText = buttonStyle.style
      superBtnRef.current.style.cssText = buttonStyle.none
    } else {
      setSubscription({ plan: 'super', id: 'plan_INRHb5k8cdluTv' })
      superColumn.forEach(child => child.style = tabelStyle.style)
      premiumColumn.forEach(child => child.style = tabelStyle.none)
      setColor({ super: { color: '#fedf7b' }, premium: { color: 'white' } })
      superBtnRef.current.style.cssText = buttonStyle.style
      premiumBtnRef.current.style.cssText = buttonStyle.none
    }
  }

  async function displayRazorupe() {
    if (!currentUser)
      return history.push('/sign-in')
    setLoading(true)
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      console.log('Razorupe not loaded');
      return setLoading(false)
    }
    if(!subscription) return
    const response = await fetch(`https://disneyplusclone-server.herokuapp.com/subscriptions/${subscription.id}`, { method: 'POST' }).then(res => res.json())
    setLoading(false)

    var options = {
      "key": "rzp_test_qCeMC5VrMj9CvS",
      "subscription_id": response.id,
      "name": "Disney+ Hotastar.",
      "handler": (res) => {
        handleAuthentication(res)
        history.push('/')
      },
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  async function handleAuthentication(data) {
    const res = await fetch('https://disneyplusclone-server.herokuapp.com/verification',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
    if (res.isAuthenticated) {
      if(!currentUser) return
      window.location.assign(`https://api.razorpay.com/v1/t/subscriptions/${data.razorpay_subscription_id}`)
      addSubscriptionToDatabase({
        plan: subscription.plan,
        subscription_id: data.razorpay_subscription_id,
        payment_id: data.razorpay_payment_id
      })
    }
  }

  useEffect(() => {
    window.onscroll = () => {
      if (!headerRef.current) return
      if (window.scrollY > 0)
        return headerRef.current.style.background = '#131a28'
      headerRef.current.style.background = 'none'
    }
  })

  return (
    <>
      <header ref={headerRef}>
        <Link to="/">
          <img
            className="disneyplus"
            src={disneyplusLogo}
            alt="logo"
          />
        </Link>
        {currentUser ? <div className="select">
          <button
            className="select-option"
            onClick={() => (active ? setActive(false) : setActive(true))}
            htmlFor=""
          >
            {" "}
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.phoneNumber}
            {!active ? (
              <i className="fas fa-chevron-down"></i>
            ) : (
              <i className="fas fa-chevron-up"></i>
            )}
          </button>
          {active && (
            <div className="options">
              <Link className="option" to="/watchlist">
                Watchlist
              </Link>
              <Link className="option" to="/my-account">
                My Account
              </Link>
              <button onClick={() => {
                logout()
              }} className="option-logout" >
                Logout
              </button>
            </div>
          )}
        </div>
          :
          <button onClick={() => {
            history.push('/sign-in')
          }} className='device-login-btn'>Log in</button>
        }
      </header>
      <div className="img-row" id="img-row">
        {raw_images.map((raw_image, index) => {
          return <img key={index} src={raw_image} alt="" />
        })}
      </div>
      <div className="gs-container-overlay"></div>
      <div className="subscription-container">
        <label className='main-label' htmlFor="">Subscribe to watch all content on Disney+ Hotstar</label>
        <div className="subscription-details">
          <div className="subscriptions">
            <table>
              <tbody ref={tbodyRef}>
                <tr>
                  <th></th>
                  <th className='plan-super' style={color.super}>Super</th>
                  <th className='plan-premium' style={color.premium}>Premium</th>
                </tr>
                <tr>
                  <td><div>All content<p>Movies, live sports, TV, Specials</p></div></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td><div>Watch on TV or Laptop</div></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td><div>Ads free movies and shows (except sports)</div></td>
                  <td><img style={{ width: 20 }} src="https://secure-media.hotstar.com/static/subscription/paywall_service/comparator/cross/smp/web-1x.png" alt='' /></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td><div>Number of devices that can be logged in</div></td>
                  <td>2</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td><div>Max video quality</div></td>
                  <td>Full HD (1080p)</td>
                  <td>4K (2160p)</td>
                </tr>
                <tr>
                  <td><div>Max audio quality</div></td>
                  <td>Dolby 5.1</td>
                  <td>Dolby 5.1</td>
                </tr>
              </tbody>
            </table>
            <div className="select-plan">
              <button className='super-button' onClick={() => handlePlan('super')} ref={superBtnRef}>
                {subscription.plan === 'super' && <i className="fas fa-check-circle"></i>}
                <div><label style={color.super} className='label' htmlFor="">Super</label></div>
                <div><label className='price'>&#8377;899</label><label className='validity' htmlFor="">/Year</label></div>
              </button>
              <button className='premium-button' onClick={() => handlePlan('premium')} ref={premiumBtnRef}>
                {subscription.plan === 'premium' && <i className="fas fa-check-circle"></i>}
                <div><label style={color.premium} className='label' htmlFor="">Premium</label></div>
                <div><label className='price'>&#8377;1499</label><label className='validity' htmlFor="">/Year</label></div>
              </button>
            </div>
            <button disabled={loading} onClick={displayRazorupe} className='confirm-plan'>CONTINUE WITH {subscription.plan}</button>

            {currentUser ? <small>Logged in with <small className='current-user'>{currentUser.displayName ? currentUser.displayName : currentUser.phoneNumber}</small></small>

              :
              <small>Already subscribed ? <label onClick={() => {
                history.push('/sign-in')
              }} className='change-current-user'>LOG IN</label></small>
            }
            {currentUser && <p className='change-current-user'>USE ANOTHER ACCOUNT</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
