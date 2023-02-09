import React, {useState, useEffect} from 'react'

function NewLogin(){
    const [password, setPassword] = useState("")
    const [empId, setEmpId]  = useState()
    const [mgrId, setMgrId]  = useState("")
    const pChangeHandler = (event) =>{setPassword(event.target.value)}
    const mgrIdHandler = (event) =>{setMgrId(event.target.value)}
    async function createUser(){
        const postUrl= 'http://localhost:3001/newemployee'
        const getUrl = 'http://localhost:3001/employees'
        let newEmp;
        try{
            let allEmps = await fetch(getUrl)
                .then(res=>res.json())
                console.log(allEmps.length)
                const maxID=Math.max(...allEmps.map(e=>e.id))
                console.log({maxID})
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
            //window.location = `/employee/${empId}`)
        } catch{
            console.log("Could not enter new employee.")
        }

    }
    return(
        <>
        <h1>Create user profile</h1>
        <form onSubmit={(e)=>{e.preventDefault();createUser()}}>
        <label>Password</label><br/>
        <input type={"text"} value={password} onChange={pChangeHandler}/>
        <br/>
        <label>Manager's ID</label><br/>
        <input type={"text"} value={mgrId} onChange={mgrIdHandler}/>
        <br/>
        <button type={"submit"}>Create user</button>
        </form>
        </>
    )
}

export default NewLogin