import React, {useState, useEffect} from 'react'

function Login(){
    const [empId, setEmpId]  = useState("")
    const [password, setPassword] = useState("")
    const eChangeHandler = (event) =>{
        setEmpId(event.target.value)
    }
    const pChangeHandler = (event) =>{
        setPassword(event.target.value)
    }
    const loginHandler = (id)=> {
        window.location = `/${id}`
    }
    return(
        <>
        <h1>Login</h1>
        <label>Employee ID</label>
        <input type={"text"} value={empId} onChange={eChangeHandler}/>
        <br/>
        <label>Password</label>
        <input type={"text"} value={password} onChange={pChangeHandler}/>
        <br/>
        <input type={"button"} value={"login"} onClick={()=>loginHandler(empId)}/>
        </>
    )
}

export default Login