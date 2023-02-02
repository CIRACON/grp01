import React, {useState, useEffect} from 'react'
import { useParams, SearchParams } from 'react-router-dom'


function Person({}){
    const [person, setPerson] = useState({})
    async function getPerson(id){
        let url=`https://swapi.dev/api/people/${id}`
        try{
            const target = await fetch(url)
            .then(res =>res.json())
            setPerson(target)
        }
        catch (ex) {
            console.error("Error reading person.", ex.message);
        }
        console.log(person)
    }
    //fetch person by id
    let {id}=useParams()
    useEffect(()=>{getPerson(id)},[])
    //display info
    return(
        <>
        <h1>{person.name}</h1>
        </>
    )
}

export default Person