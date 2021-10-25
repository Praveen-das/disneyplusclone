import React from 'react'
import { useHistory } from 'react-router'
import './myAccount.css'
import { useFirebase } from '../../contexts/FirebaseContext'


function MyAccount() {
    const history = useHistory()
    const { currentUser,logout } = useFirebase()

    return (
        <>
            <div className="account-wrapper">
                <div className="user-details">
                    <img className='user-profile-pic' src={currentUser.photoURL ? currentUser.photoURL : 'https://www.hotstar.com/assets/c724e71754181298e3f835e46ade0517.svg'} alt="" />
                    <label className='user-username' htmlFor="">{currentUser.displayName}</label>
                    <label className='user-email' htmlFor="">{currentUser.phoneNumber ? currentUser.phoneNumber : currentUser.email}</label>
                </div>
                <div className="subscription">
                    <div>
                        <p>Get more with Disney+ Hotstar Premium</p>
                        <label htmlFor="">Only ₹1499/year</label>
                    </div>
                    <button>GET DISNEY+ HOTSTAR PREMIUM {'>'}</button>
                </div>
                <div className="user-logout">
                    <button onClick={() => logout().then(() => {
                        history.push('/')
                    })}>Log Out</button>
                </div>
            </div>
        </>
    )
}

export default MyAccount
