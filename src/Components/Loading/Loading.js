import React from 'react'
import './loading.css'

function Loading({label}) {
    return (
        <>
            <div id="loading-container">
                <div id="loading">
                    <i className="fas fa-circle-notch fa-spin"></i>
                    <label htmlFor="">{label}</label>
                </div>
            </div>
        </>
    )
}

export default Loading
