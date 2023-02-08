import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GetFeedback from './getFeedback'

function Dashboard(){
    let {id} = useParams()
    return(
        <>
        <h1>{id}</h1>
        <GetFeedback id={id}/>
        </>
    )
}
export default Dashboard