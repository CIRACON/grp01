import React, {useEffect, useState} from 'react'

function SendFeedback({empId, mgrId,sender}){
    const [message, setMessage]=useState("")
    const messageHandler=(event)=>{
        setMessage(event.target.value)
    }
    async function sendFeedback(){
        const feedback={
            "text":message,
            "employeeID":+empId,
            "managerID":+mgrId,
            "sender":+sender
        }
        let url="http://localhost:3001/feedback"
        try{
            const postMessage = await fetch(url,{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(feedback)
            })
            console.log()
        }catch (ex){
            console.log("Could not post feedback.",ex)
        }
    }
    return(
        <>
        <h3>Enter Feedback</h3>
        <form onSubmit={sendFeedback} >
        <input type={"text"} value={message} onChange={messageHandler} style={styles.input}/>
        <button type={"submit"}>Send</button>
        </form>
        </>
    )
}

const styles={
    input:{
        width:"80%",
        border:"none",
        borderBottom:"solid 1px black",
        outline:'none',
        margin:'5px'
    }
}

export default SendFeedback