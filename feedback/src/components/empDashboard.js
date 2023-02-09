import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GetFeedback from './getFeedback'
import SendFeedback from './sendFeedback'

function EmpDashboard(){
    const {id} = useParams()
    const {mId, setMId} = useState("")
    useEffect(()=>async function getMId(){
        let url=`http://localhost:3001/employee/${id}`
        const target= fetch(url)
            .then(res=>res.json())
        console.log(typeof(target.managerId))
        setMId(target.managerId)//get manager Id from response
    },[])
    return(
        <>
        <h1>{id}</h1>
        <GetFeedback id={id} type={"employee"}/>
        <div style={styles.section}>
        <SendFeedback empId={id} mgrId={mId}/>
        </div>
        </>
    )
}
const styles={
    section:{
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        border: "1px solid darkblue"
    }
}
export default EmpDashboard