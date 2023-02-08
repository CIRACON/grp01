import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function Dashboard(){
    let {id} = useParams()
    return(
        <h1>{id}</h1>
    )
}
export default Dashboard