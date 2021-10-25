import React, { useContext, useEffect, useRef, useState } from 'react'
import { auth } from '../config/firebaseApp'
import { GoogleAuthProvider, RecaptchaVerifier, signInWithPopup, signInWithPhoneNumber } from "@firebase/auth"
import { getFirestore, setDoc, getDocs, doc, collection } from 'firebase/firestore'

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
        if (type === 'phonenumber') {
            const appVerifier = new RecaptchaVerifier('login-btn', {
                'size': 'invisible'
            }, auth);
            signInWithPhoneNumber(auth, '+1-202-555-0171', appVerifier).then((confirmationResult) => {
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
    }, [currentUser])

    //Watchlist//////////////////////////////////////////////
    const db = getFirestore()
    const [watchlist, setWatchlist] = useState()
    const componentDidMounted = useRef(0)

    //Set Initial state///////////////////////////////////////
    useEffect(() => {
        if (!currentUser) return
        getDocs(collection(db, currentUser.uid)).then((doc) => {
            if (!doc.empty)
                return doc.forEach(doc => {
                    const snapshot = doc.data()
                    if (!snapshot) return
                    setWatchlist(snapshot.watchlist)
                })
            return setWatchlist([])
        }
        )
    }, [db, currentUser])

    //Handele database on watchlist update///////////////////////////////////////
    useEffect(() => {
        if (!currentUser) return
        if (componentDidMounted.current < 3)
            return componentDidMounted.current++
        const watchlistDoc = doc(db, currentUser.uid, 'watchlist')
        setDoc(watchlistDoc, { watchlist: watchlist })
            .then(() => console.log('movie added to watchlist')).catch(err => console.log(err))
    }, [currentUser, watchlist, db, componentDidMounted])

    function addToWatchlist(movie) {
        if (!currentUser) return
        setWatchlist(pre => {
            return [movie, ...pre]
        })
    }

    function removeFromWatchlist(movie) {
        if (!currentUser) return
        setWatchlist(watchlist.filter(o => o.id !== movie.id))
    }

    const value = {
        signInWithGoogle,
        signinWithPhonenumber,
        logout,
        currentUser,
        addToWatchlist,
        removeFromWatchlist,
        watchlist
    }

    return (
        <FirebaseContext.Provider value={value}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}
