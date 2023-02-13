import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GetFeedback from './getFeedback'
import SendFeedback from './sendFeedback'

function EmpDashboard() {
    const { pid } = useParams()
    const [mId, setMId] = useState("")
    useEffect(() => async function getMId() {
        let url = `http://localhost:3001/employee/${pid}`
        const target = await fetch(url)
            .then(res => res.json())
        setMId(target.managerID)//get manager Id from response
    }, [])
    return (
        <div style={styles.container}>
            <h1>Welcome to Kusema, the anonymous feedback app!</h1>
            <div style={styles.employee}>
                <h2>Feedback for your manager</h2>
                <GetFeedback id={+pid} type={"employee"} viewerID={+pid} />
                <SendFeedback empId={pid} mgrId={mId} sender={pid} />
            </div>
        </div>
    )
}
const styles = {
    employee:{
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        border: "1px solid darkblue",
        width:"80%",
        borderRadius:'3px'
    },
    container:{
        margin:"10px",
        marginRight:"5%",
        marginLeft:"10%",
        padding:"5px"
    }
}
export default EmpDashboard