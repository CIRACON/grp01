import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GetFeedback from './getFeedback'
import SendFeedback from './sendFeedback'

function EmpDashboard(){
    let {id} = useParams()
    return(
        <>
        <h1>{id}</h1>
        <GetFeedback id={id}/>
        <SendFeedback />
        </>
    )
}
export default EmpDashboard