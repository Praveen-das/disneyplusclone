import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react'
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

    // //////////////////////////////////////Firestore///////////////////////////////////////
    // Set Initial state///////////////////////////////////////
    const db = getFirestore()

    const initialState = useMemo(() => [], [])
    useEffect(() => {
        if (!currentUser) return
        getDocs(collection(db, currentUser.uid)).then((doc) =>
            doc.forEach(doc => {
                const snapshot = doc.data()
                if (!snapshot) return
                snapshot.watchlist.forEach(elm=> initialState.push(elm))
                console.log(initialState);
            })
        )
    }, [db, currentUser,initialState])

    // Set State///////////////////////////////////////

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TO_WATCHLIST':
                return { watchlist: [action.payload, ...state.watchlist] }
            default:
                return state
        }
    }

    
    const [state, dispatch] = useReducer(reducer, { watchlist: initialState ? initialState : [] })
    
    // onClick Event///////////////////////////////////////

    useEffect(() => {
        if (!currentUser) return
        const watchlistDoc = doc(db, currentUser && currentUser.uid, 'watchlist')
        try {
            setDoc(watchlistDoc, (state)).then(() => console.log('movie added to watchlist'))
        } catch (error) {
            console.log(error);
        }
    }, [state,db])

    function addToWatchlist(movie) {
        dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie })
    }

    const value = {
        signInWithGoogle,
        signinWithPhonenumber,
        logout,
        currentUser,
        addToWatchlist,
        watchlist: state.watchlist
    }

    useEffect(()=>{
        console.log(currentUser);
    },[currentUser])

    return (
        <FirebaseContext.Provider value={value}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}
