import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./getStarted.css";
import { useFirebase } from "../../contexts/FirebaseContext";

function GetStarted() {
  const { currentUser } = useFirebase();
  const [active, setActive] = useState(false);
  const [color,setColor] = useState({super:{color:'#fedf7b'},premium:{color:'white'}})
  const [subscription, setSubscription] = useState({ plan: 'super', price: '899' })
  const superBtnRef = useRef()
  const premiumBtnRef = useRef()
  const tbodyRef = useRef([])

  const buttonStyle = {
    style: `border: 1px solid #1f80e0; background: #1f80e066;`,
    none: `border: 1px solid #465983; background: none`
  }

  const tabelStyle = {
    style:`background: #1e2a48; border-bottom: none; opacity:1;`,
    none:`background: none; border-bottom: 1px solid rgba(255, 255, 255, 0.048); opacity:0.5;`
  }
  
  function handlePlan(plan) {
    const superColumn = Array.from(tbodyRef.current.children).map(child=> child.children[1])
    const premiumColumn = Array.from(tbodyRef.current.children).map(child=> child.children[2])
    if (plan === 'premium') {
      setSubscription({ plan: plan, price: '899' })
      premiumColumn.forEach(child=>child.style = tabelStyle.style)
      superColumn.forEach(child=>child.style = tabelStyle.none)
      setColor({super:{color:'white'},premium:{color:'#fedf7b'}})
      premiumBtnRef.current.style.cssText = buttonStyle.style
      superBtnRef.current.style.cssText = buttonStyle.none
    } else {
      setSubscription({ plan: plan, price: '1499' })
      superColumn.forEach(child=>child.style = tabelStyle.style)
      premiumColumn.forEach(child=>child.style = tabelStyle.none)
      setColor({super:{color:'#fedf7b'},premium:{color:'white'}})
      superBtnRef.current.style.cssText = buttonStyle.style
      premiumBtnRef.current.style.cssText = buttonStyle.none
    }
  }

  return (
    <>
      <header>
        <Link to="/">
          <img
            className="disneyplus"
            src="/disney-hotstar-logo.svg"
            alt="logo"
          />
        </Link>
        <div className="select">
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
              <Link className="option" option to="/#">
                Watchlist
              </Link>
              <Link className="option" option to="/my-account">
                My Account
              </Link>
              <button className="option-logout" option>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="gs-container" id="gs-container">
        <div className="img-row" id="img-row">
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2591/352591-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4267/704267-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/8195/858195-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2155/912155-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/9649/959649-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5180/875180-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5834/575834-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2606/352606-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/3589/763589-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5199/875199-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/6699/1026699-v-cb786ee970de"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5085/875085-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/9591/779591-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4820/1004820-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4719/994719-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/3145/813145-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/1213/871213-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/3421/753421-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/7787/967787-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/7539/617539-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2591/352591-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4267/704267-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/8195/858195-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2155/912155-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/9649/959649-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5180/875180-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5834/575834-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2606/352606-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/3589/763589-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5199/875199-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/6699/1026699-v-cb786ee970de"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5085/875085-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/9591/779591-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4820/1004820-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4719/994719-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/3145/813145-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/1213/871213-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/3421/753421-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/7787/967787-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/7539/617539-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2591/352591-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4267/704267-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/8195/858195-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2155/912155-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/9649/959649-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5180/875180-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5834/575834-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/2606/352606-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/3589/763589-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5199/875199-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/6699/1026699-v-cb786ee970de"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/5085/875085-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/9591/779591-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4820/1004820-v"
            alt="trayimg"
          />
          <img
            className="tray-img"
            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_1_5x/sources/r1/cms/prod/4719/994719-v"
            alt="trayimg"
          />

        </div>
      </div>
      <div className="gs-container-overlay"></div>
      <div className="subscription-container">
        <label htmlFor="">Subscribe to watch all content on Disney+ Hotstar</label>
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
                  <td>All content<p>Movies, live sports, TV, Specials</p></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Watch on TV or Laptop</td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Ads free movies and shows (except sports)</td>
                  <td><img style={{ width: 20 }} src="https://secure-media.hotstar.com/static/subscription/paywall_service/comparator/cross/smp/web-1x.png" alt='' /></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Number of devices that can be logged in</td>
                  <td>2</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Max video quality</td>
                  <td>Full HD (1080p)</td>
                  <td>4K (2160p)</td>
                </tr>
                <tr>
                  <td>Max audio quality</td>
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
            <button className='confirm-plan'>CONTINUE WITH {subscription.plan}</button>
            <small>Logged in with </small><small className='current-user'> {currentUser.displayName ? currentUser.displayName : currentUser.phoneNumber}</small>
            <p className='change-current-user'>USE ANOTHER ACCOUNT</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
