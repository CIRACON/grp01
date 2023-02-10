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
            <GetFeedback id={+pid} type={"employee"} viewerID={+pid} />
            <div style={styles.section}>
                <SendFeedback empId={pid} mgrId={mId} sender={pid} />
            </div>
        </div>
    )
}
const styles = {
    section: {
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        border: "1px solid black"
    },
    container: {
        margin: "10px",
        padding: "5px",
        //justifyContent: "center"
    }
}
export default EmpDashboard