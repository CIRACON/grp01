import React, {useState, useEffect} from 'react'

function GetFeedback({id}){
    const {feedbackList, setFeedbackList} = useState([])
    useEffect(()=>{getFeedback()},[])
    async function getFeedback(){
        const url = `http://localhost:/${id}`
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
            {feedbackList?.map((message, i)=><li key={i}>{message.text}</li>)}
        </ul>
        </>
    )
}

export default GetFeedback