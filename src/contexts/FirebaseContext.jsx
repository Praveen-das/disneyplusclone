import React, { useContext, useEffect, useState } from 'react'
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
    const db = getFirestore()
    const [watchlist, setWatchlist] = useState([])
    const [addedToWatchlist, setAddedToWatchlist] = useState([])


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

    // Firestore

    function Watchlist() {
        useEffect(() => {
            getDocs(collection(db, currentUser.uid)).then(res => {
                res.forEach(doc => {
                    const snapshot = doc.data().watchlist
                    if (snapshot) {
                        setWatchlist(snapshot)
                    }
                })
            })
        }, [])
        return watchlist
    }

    useEffect(() => {
        console.log(addedToWatchlist);
    }, [addedToWatchlist])

    async function AddToWatchlist(movie) {
        watchlist.push(movie)
        setDoc(doc(db, currentUser && currentUser.uid, 'watchlist'), {
            watchlist
        }).catch(err => console.log(err))
        return watchlist
    }

    async function RemoveFromWatchlist(movie) {
        console.log(watchlist.includes(movie));
        // setDoc(doc(db, currentUser && currentUser.uid, 'watchlist'), {
        //     watchlist
        // }).catch(err => console.log(err))
    }

    const value = {
        signInWithGoogle,
        signinWithPhonenumber,
        logout,
        currentUser,
        AddToWatchlist,
        RemoveFromWatchlist,
        addedToWatchlist,
        setAddedToWatchlist,
        Watchlist,
    }
    return (
        <FirebaseContext.Provider value={value}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}
