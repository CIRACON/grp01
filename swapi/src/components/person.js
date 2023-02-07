import React, {useState, useEffect} from 'react'
import { useParams, SearchParams } from 'react-router-dom'


function Person({}){
    const [person, setPerson] = useState()
    async function getPerson(id){
        let url=`http://localhost:4000/person/${id}`
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
        <h1>{person[0].fields.name}</h1>
        <h2>Homeworld</h2>
        <p style={styles.home}onClick={()=>goToPlanet(person[0].fields.homeworld)}>{person[0].fields.homeworld}</p>
        <h2>Films</h2>
        <ul>
            {/* {person.films?.map((film,i)=><li style={styles.listItem} key={i} onClick={()=>goToFilm(getIdFromUrl("films",film))}>{getIdFromUrl("films",film)}</li>)} */}
        </ul>
        </>
    )
}

function goToPlanet(id) {window.location = `/planet/${id}`}
function goToFilm(id) {window.location = `/film/${id}`}

const styles={
    listItem:{
        display: "inline-block",
        textDecoration: "none",
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        backgroundColor: "lightblue",
        borderRadius: "5px",
        border: "1px solid darkblue"
    },
    home:{
        display: "inline-block",
        textDecoration: "none",
        fontSize: "1.1em",
        padding: "10px",
        margin: "10px",
        backgroundColor: "lightblue",
        borderRadius: "5px",
        border: "1px solid darkblue",
        marginLeft:"50px"
    }
}
export default Person