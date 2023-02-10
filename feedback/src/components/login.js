import React, {useState} from 'react'

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
        <div style={styles.container}>
        <h1>Login</h1>
        <label style={styles.label}>Employee ID</label><br/>
        <input type={"text"} value={empId} onChange={eChangeHandler} style={styles.input}/>
        <br/>
        <label style={styles.label}>Employee type - employee or manager</label><br/>
        <input type={"text"} value={empType} onChange={empChangeHandler} style={styles.input}/>
        <br/>
        <label style={styles.label}>Password</label><br/>
        <input type={"text"} value={password} onChange={pChangeHandler} style={styles.input}/>
        <br/>
        <input type={"button"} style={styles.button} value={"Login"} onClick={()=>loginHandler(empType, empId)}/>
        
        <h3>New User?</h3>
        <button style={styles.button} onClick={()=>window.location = `/newUser`}>Create employee profile</button>

        </div>
    )
}
const styles={
    container:{
        margin:"5px",
        padding:"5px",
    },
    label:{
        padding:"5px",
        margin:"5px"
    },
    input:{
        width:"30%",
        padding:"5px",
        margin:"5px"
    },
    button:{
        fontWeight:"bold",
        marginLeft:"10px"
    }
}

export default Login