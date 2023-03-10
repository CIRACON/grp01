import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import GetFeedback from './getFeedback'
import SendFeedback from './sendFeedback'

function MgrDashboard(){
    const {id} = useParams()
    const [empIds, setEmpIds] = useState([])
    useEffect(()=>async function getEmpIds(){
        const url=`http://localhost:3001/employeesof/${id}`
        const target= await fetch(url)
        .then(res=>res.json())
        setEmpIds(target.map(emp=>emp.id))//get employee Ids from response
    },[])
    console.log(empIds)
    return(
        <div style={styles.container}>
        <h1>Welcome to Kusema, the anonymous feedback app!</h1>
        {empIds.map((emp,i)=>
            <div style={styles.employee} key={i}>
                <h2>Anonymous Employee {i+1}</h2>
                <GetFeedback id={emp} type={"employee"} viewerID={+id}/>
                <SendFeedback mgrId={id} empId={emp} sender={id}/>
            </div>
        )}
        </div>
    )
}
const styles={
    employee:{
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        border: "1px solid darkblue",
        width:"80%",
        borderRadius:"3px"
    },
    container:{
        margin:"10px",
        marginRight:"5%",
        marginLeft:"10%",
        padding:"5px"
    }
}

export default MgrDashboard