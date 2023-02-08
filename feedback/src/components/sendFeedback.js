import React, {useEffect, useState} from 'react'

function SendFeedback({empId, mgrId}){
    const {message, setMessage}=useState("")
    const messageHandler=(event)=>{
        setMessage(event.target.value)
    }
    async function sendFeedback(){
        const feedback={
            "text":message,
            "employeeID":+empId,
            "managerID":+mgrId
        }
        let url="http://localhost:/"//server route for posting to managerfeedback collection
        try{
            const postMessage = await fetch(url,{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(feedback)
            })
            console.log()
        }catch{
            console.log("Could not post feedback.")
        }
    }
    return(
        <>
        <h3>Enter Feedback</h3>
        <form onSubmit={sendFeedback} >
        <input type={"text"} value={message} onChange={messageHandler} />
        <button type={"submit"}>Send</button>
        </form>
        </>
    )
}
export default SendFeedback