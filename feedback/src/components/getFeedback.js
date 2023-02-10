import React, { useState, useEffect } from 'react'

function GetFeedback({ id, type,viewerID }) {
    const [feedbackList, setFeedbackList] = useState([])
    useEffect(() =>
        async function getFeedback() {
            const url = `http://localhost:3001/${type}feedback/${id}`
            try {
                const target = await fetch(url)
                    .then(res => res.json())
                    .catch(err=>console.error("error getting feedback.",err))
                console.log(typeof (target))
                setFeedbackList(target)
            } catch (ex) {
                console.error("Error getting feedback.", ex.message);
            }
        }, [])
    console.log(feedbackList)
    console.log("id:",id)
    return (
        <>
            <ul>
                {feedbackList?.map((message, i) => <li key={i} style={message.sender===viewerID?styles.empMessage:styles.message}>{message.text}</li>)}
            </ul>
        </>
    )
}
const styles = {
    message: {
        border: 'solid 1px black',
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        width: "80%",
        listStyleType:"none",
        justifySelf:"left"
    },
    empMessage: {
        border: 'solid 1px black',
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        width: "80%",
        listStyleType:"none",
        backgroundColor:"lightblue",
        justifySelft:"right"
    },
    container:{
        display:"flex"
    }
}
export default GetFeedback