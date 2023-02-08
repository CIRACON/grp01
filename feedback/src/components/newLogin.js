import React, {useState, useEffect} from 'react'

function NewLogin(){
    const [password, setPassword] = useState("")
    const [empId, setEmpId]  = useState("")
    const [mgrId, setMgrId]  = useState("")
    const pChangeHandler = (event) =>{
        setPassword(event.target.value)
    }
    const mgrIdHandler = (event) =>{
        setMgrId(event.target.value)
    }
    async function createUser(){
        const postUrl= 'http://localhost:3001/newEmployee'
        const getUrl = 'http://localhost:3001/employees'
        try{
            let allEmps = await fetch(getUrl)
                .then(res=>res.json())
                .then(res=>res.length)
            setEmpId(allEmps+1)
        }catch{
            console.log("Could not get number of employees")
        }
        const newEmp={
            "id":empId,
            "managerId":mgrId
        }
        try{
            await fetch(postUrl,{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(newEmp)
            })
            .then(window.location = `/employee/${empId}`)
        } catch{
            console.log("Could not enter new employee")
        }

    }
    return(
        <>
        <h1>Create user profile</h1>
        <form onSubmit={createUser}>
        <label>Password</label><br/>
        <input type={"text"} value={password} onChange={pChangeHandler}/>
        <br/>
        <label>Manager's ID</label><br/>
        <input type={"text"} value={mgrId} onChange={mgrIdHandler}/>
        </form>
        </>
    )
}

export default NewLogin