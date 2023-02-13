import React from 'react'
import DisplayMessages from "./DisplayMessages"
import "./index.css"


const MessageApp = () => {
  return (
    <div className='app-container'>
        <div className='header-container'>
        <h2 className='me2'>Messages</h2>
        <marquee className='ma'>
                Click on View More to open model box with more data
            </marquee>
        </div>
        <DisplayMessages />
    </div>
  )
}

export default MessageApp