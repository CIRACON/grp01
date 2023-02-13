import React, {useState, useEffect} from 'react'

function NewLogin(){
    const [password, setPassword] = useState("")
    const [empId, setEmpId]  = useState()
    const [mgrId, setMgrId]  = useState("")
    const pChangeHandler = (event) =>{setPassword(event.target.value)}
    const mgrIdHandler = (event) =>{setMgrId(event.target.value)}
    let newEmp;
    async function createUser(){
        const postUrl= 'http://localhost:3001/newemployee'
        const getUrl = 'http://localhost:3001/employees'
        
        try{
            let allEmps = await fetch(getUrl)
                .then(res=>res.json())
                console.log(allEmps.length)
                const maxID=Math.max(...allEmps.map(e=>e.id))
                setEmpId(maxID+1)
        
        newEmp={
            "id":maxID+1,
            "managerID":+mgrId
        }
        }catch{
            console.log("Could not get employees")
        }
        console.log(newEmp)
        try{
            await fetch(postUrl,{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(newEmp)
            })
            userRedirect()
            
        } catch{
            console.log("Could not enter new employee.")
        }
        
    }
    const userRedirect=()=>{
        console.log("redirect to", newEmp.id)
        window.location = `/employee/${newEmp.id}`}
    return(
        <div style={styles.container}>
        <h1>Create employee profile</h1>
        <form style={styles.form} onSubmit={(e)=>{e.preventDefault();createUser()}}>
        <label style={styles.label}>Password</label><br/>
        <input type={"password"} value={password} onChange={pChangeHandler} style={styles.input}/>
        <br/>
        <label style={styles.label}>Manager's ID</label><br/>
        <input type={"text"} style={styles.input} value={mgrId} onChange={mgrIdHandler}/>
        <br/>
        <button type={"submit"} style={styles.button}>Create user</button>
        </form>
        </div>
    )
}

const styles={
    container:{
        margin:"5px",
        marginLeft:"25%",
        padding:"5px",
    },
    label:{
        padding:"5px",
        margin:"5px"
    },
    input:{
        width:"90%",
        padding:"5px",
        margin:"5px"
    },
    button:{
        fontWeight:"bold",
        marginLeft:"10px"
    },
    form:{
        border:"solid 1px black",
        padding:"10px",
        width:"50%"
    }
}

export default NewLogin