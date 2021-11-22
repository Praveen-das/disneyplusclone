import React, { useCallback, useContext, useEffect, useState } from 'react'
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
    }, [])

    //Watchlist//////////////////////////////////////////////
    const db = getFirestore()
    const [watchlist, setWatchlist] = useState([])

    //Set Initial state///////////////////////////////////////
    useEffect(() => {
        if (currentUser)
            getDocs(collection(db, currentUser.uid)).then((doc) => {
                if (!doc.empty)
                    return doc.forEach(doc => {
                        const snapshot = doc.data()
                        if (!snapshot) return
                        setWatchlist(snapshot.watchlist)
                    })
                return setWatchlist([])
            })
    }, [db, currentUser])

    //Handele database on watchlist update///////////////////////////////////////

    const addToDatabase = useCallback((movie) => {
        if (!currentUser) return
        const watchlistDoc = doc(db, currentUser.uid, 'watchlist')
        setDoc(watchlistDoc, { watchlist: movie })
            .then(() => console.log('Watchlist upadated')).catch(err => console.log(err))
    }, [currentUser, db])

    function addToWatchlist(movie) {
        if (!currentUser) return
        setWatchlist(pre => {
            addToDatabase([movie, ...pre])
            return [movie, ...pre]
        })
    }

    function removeFromWatchlist(movie) {
        if (!currentUser) return
        setWatchlist(watchlist.filter(o => o.id !== movie.id))
        addToDatabase(watchlist.filter(o => o.id !== movie.id))
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
