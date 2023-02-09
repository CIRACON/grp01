import React, {useState, useEffect} from 'react'

function GetFeedback({id,type}){
    const {feedbackList, setFeedbackList} = useState([])
    useEffect(()=>{getFeedback()},[])
    async function getFeedback(){
        const url = `http://localhost:3001/${type}feedback/${id}`
        try {
            const target = fetch(url)
            .then(res=> res.json())
            setFeedbackList(target)
        }catch (ex) {
            console.error("Error getting feedback.", ex.message);
        }
    }
    return (
        <>
        <ul>
            {feedbackList?.map((message, i)=><li key={i} style={styles.message}>{message.text}</li>)}
        </ul>
        </>
    )
}
const styles = {
    message:{
        border:'solid 1px black',
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
    }
}
export default GetFeedback