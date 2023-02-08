import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GetFeedback from './getFeedback'
import SendFeedback from './sendFeedback'

function EmpDashboard(){
    const {id} = useParams()
    const {mId, setMId} = useState("")
    async function getMId(){
        let url=`http://localhost:3001/${id}`
        const target= fetch(url)
        .then(res=>res.json())
        setMId(target.managerId)//get manager Id from response
    }
    useEffect(()=>getMId(),[])
    return(
        <>
        <h1>{id}</h1>
        <GetFeedback id={id} type={"employee"} />
        <SendFeedback empId={id} mgrId={mId}/>
        </>
    )
}
export default EmpDashboard