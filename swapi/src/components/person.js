import React, {useState, useEffect} from 'react'
import { useParams, SearchParams } from 'react-router-dom'


function Person({}){
    const [person, setPerson] = useState()
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
    if(!person){return null}
    return(
        <>
        <h1>{person.name}</h1>
        <h2>Homeworld</h2>
        <p onClick={()=>goToPlanet(getIdFromUrl("planets",person.homeworld))}>{getIdFromUrl("planets",person.homeworld)}</p>
        <h2>Films</h2>
        <ul>
            {person.films?.map((film,i)=><li key={i} onClick={()=>goToFilm(getIdFromUrl("films",film))}>{getIdFromUrl("films",film)}</li>)}
        </ul>
        </>
    )
}
const getIdFromUrl = (entityName, url) => {
    const re = new RegExp(`.*${entityName}\/(\\d+).*`);
    const matches = url?.match(re)
    if (!matches) throw `Bad URL. Not a ${entityName} URL.`
    return matches[1]
  }
function goToPlanet(id) {window.location = `/planet/${id}`}
function goToFilm(id) {window.location = `/film/${id}`}
export default Person