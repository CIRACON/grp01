import React, {useEffect, useState} from 'react'

function SendFeedback(){
    const {message, setMessage}=useState("")
    const messageHandler=(event)=>{
        setMessage(event.target.value)
    }
    function sendFeedback(){
        
    }
    return(
        <>
        <h3>Enter Feedback</h3>
        <form onSubmit={sendFeedback} >
        <input type={"text"} value={message} onChange={messageHandler} />
        </form>
        </>
    )
}
export default SendFeedback