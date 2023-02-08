import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GetFeedback from './getFeedback'
import SendFeedback from './sendFeedback'

function MgrDashboard(){
    let {id} = useParams()
    const {empIds, setEmpIds} = useState("")
    async function getEmpIds(){
        let url=`http://localhost:3001/${id}`
        const target= fetch(url)
        .then(res=>res.json())
        setEmpIds(target.employeeId)//get employee Ids from response
    }
    useEffect(()=>getEmpIds(),[])
    return(
        <>
        <h1>{id}</h1>
        {empIds?.map((emp)=>{ /*theoretically: make div for 
            each employee under the manager and get/send
            feedback comopnents for each*/
            <div style={styles.employee}>
                <GetFeedback id={id} type={"manager"} />
                <SendFeedback mgrId={id} empId={emp} />
            </div>
        })}
        </>
    )
}
const styles={
    employee:{
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        border: "1px solid darkblue"
    }
}

export default MgrDashboard