import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebaseApp'
import { GoogleAuthProvider, RecaptchaVerifier, signInWithPopup, signInWithPhoneNumber } from "@firebase/auth"
import { getFirestore, setDoc, updateDoc, arrayRemove, arrayUnion, query, doc, collection, onSnapshot } from 'firebase/firestore'

const FirebaseContext = React.createContext()
export function useFirebase() {
    return useContext(FirebaseContext)
}

export default function Firebase({ children }) {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()

    // Authentication

    function signInWithGoogle() {
        return signInWithPopup(auth, new GoogleAuthProvider())
    }

    async function signinWithPhonenumber(input, type) {
        const phonenumber = `+91${input}`
        if (type === 'phonenumber') {
            const appVerifier = new RecaptchaVerifier('login-btn', {
                'size': 'invisible'
            }, auth);
            signInWithPhoneNumber(auth, phonenumber, appVerifier).then((confirmationResult) => {
                window.confirmationResult = confirmationResult
            }).catch((err) => console.log(err))
            return
        }
        window.confirmationResult.confirm(input)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    //Watchlist//////////////////////////////////////////////
    const db = getFirestore()
    const [watchlist, setWatchlist] = useState([])
    const [subscriptions, setSubscriptions] = useState()

    //Set Initial state///////////////////////////////////////

    useEffect(() => {
        if (!currentUser) return setSubscriptions(null)

        let queryRef = query(collection(db, currentUser.uid))
        const subscription = onSnapshot(queryRef, (snapshot) => {
            if (!snapshot) return
            snapshot.forEach((data) => {
                if (data.data().subscriptions)
                    setSubscriptions(data.data().subscriptions)
                if (data.data().watchlist)
                    setWatchlist(data.data().watchlist.reverse())
            })
        })
        return subscription
    }, [db, currentUser])

    useEffect(() => {
        if (currentUser) return
        let localDB = localStorage.getItem('watchlist')
        setWatchlist(JSON.parse(localDB))
    }, [currentUser])

    //Handele database on watchlist update///////////////////////////////////////

    function addToWatchlist(movie) {
        if (!currentUser) {
            setWatchlist(pre => {
                if (pre){
                    localStorage.setItem('watchlist', JSON.stringify([movie, ...pre]))
                    return [movie, ...pre]}
                localStorage.setItem('watchlist', JSON.stringify([movie]))
                return [movie]
            })
            return
        }

        const watchlistDoc = doc(db, currentUser.uid, 'watchlist')
        if (watchlist.length === 0) {
            setDoc(watchlistDoc, { watchlist: [movie] })
                .catch(err => console.log(err))
            return
        }
        updateDoc(watchlistDoc, { watchlist: arrayUnion(movie) })
            .catch(err => console.log(err))
    }

    function removeFromWatchlist(movie) {
        if (!currentUser) {
            const newList = watchlist.filter(o=> o !== movie)
            setWatchlist(newList)
            localStorage.setItem('watchlist',JSON.stringify(newList))
            return
        }
        const watchlistDoc = doc(db, currentUser.uid, 'watchlist')
        updateDoc(watchlistDoc, { watchlist: arrayRemove(movie) })
            .catch(err => console.log(err))
    }

    const addSubscriptionToDatabase = (data) => {
        if (!currentUser) return
        const subscriptionDoc = doc(db, currentUser.uid, 'subscriptions')
        setDoc(subscriptionDoc, { subscriptions: data })
            .catch(err => console.log(err))
    }

    const value = {
        signInWithGoogle,
        signinWithPhonenumber,
        logout,
        currentUser,
        addToWatchlist,
        removeFromWatchlist,
        watchlist,
        subscriptions,
        addSubscriptionToDatabase,
    }

    return (
        <FirebaseContext.Provider value={value}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}
