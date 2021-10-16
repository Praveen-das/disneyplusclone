import React, { useRef } from 'react'
import './alert.css'

function Alert() {
    const alertRef = useRef()

    return (
        <>
            <div className="alert-wrapper" ref={alertRef}>
                <div className="alert-container">
                    <i className="fas fa-check-circle"></i>
                    <label htmlFor="">Login Successful</label>
                </div>
            </div>
        </>
    )
}

export default Alert
