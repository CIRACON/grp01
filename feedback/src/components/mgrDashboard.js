import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GetFeedback from './getFeedback'
import SendFeedback from './sendFeedback'

function MgrDashboard(){
    let {id} = useParams()
    const {empIds, setEmpIds} = useState("")
    async function getEmpIds(){
        let url=`http://localhost:/${id}`
        const target= fetch(url)
        .then(res=>res.json())
        setEmpIds(target.managerId)//get manager Id from response
    }
    useEffect(()=>getEmpIds(),[])
    return(
        <h1>{id}</h1>
    )
}
export default MgrDashboard