import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'

function Planets(){
    const [planet, setPlanet] = useState({})
    async function getPlanet(id){
        let url=`https://swapi.dev/api/planets/${id}`
        try{
            const target = await fetch(url)
            .then(res =>res.json())
            setPlanet(target)
        }
        catch (ex) {
            console.error("Error reading person.", ex.message);
        }
        console.log(planet)
    }
    let {id}=useParams()
    useEffect(()=>{getPlanet(id)},[])
    return(
        <>
        <h1>{planet.name}</h1>
        </>
    )
}

function goToPerson(id) {window.location = `/person/${id}`}

export default Planets