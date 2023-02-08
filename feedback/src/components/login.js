import React, {useState, useEffect} from 'react'
//import Link from 'react-router-dom'

function Login(){
    const [empId, setEmpId]  = useState("")
    const [password, setPassword] = useState("")
    const [empType, setEmpType] = useState("")
    const eChangeHandler = (event) =>{
        setEmpId(event.target.value)
    }
    const pChangeHandler = (event) =>{
        setPassword(event.target.value)
    }
    const loginHandler = (type,id)=> {
        window.location = `/${type}/${id}`
    }
    const empChangeHandler = (event)=>{ setEmpType(event.target.value)}
    return(
        <>
        <h1>Login</h1>
        <label>Employee ID</label><br/>
        <input type={"text"} value={empId} onChange={eChangeHandler}/>
        <br/>
        <label>Employee type - employee or manager</label><br/>
        <input type={"text"} value={empType} onChange={empChangeHandler}/>
        <br/>
        <label>Password</label><br/>
        <input type={"text"} value={password} onChange={pChangeHandler}/>
        <br/>
        <input type={"button"} value={"login"} onClick={()=>loginHandler(empType, empId)}/>
        
        <h1>New User?</h1>
        <p onClick={()=>window.location = `/newUser`}>Create employee profile</p>

        </>
    )
}

export default Login