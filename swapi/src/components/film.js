import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'

function Film(){
    const [film, setFilm] = useState()
    async function getFilm(id){
        let url=`http://localhost:4000/film/${id}`
        try{
            const target = await fetch(url)
            .then(res =>res.json())
            setFilm(target)
        }
        catch (ex) {
            console.error("Error reading film.", ex.message);
        }
        console.log(film)
    }
    let {id}=useParams()
    useEffect(()=>{getFilm(id)},[])
    if(!film) {return null}
    return(
        <>
        <h1>{film[0].fields.title}</h1>
        <h2>People</h2>
        <ul style={styles.listContainer}>
            {film[0].fields.characters?.map((resident,i)=><li style={styles.listItem} key={i} onClick={()=>goToPerson(resident)}>{resident}</li>)}
        </ul>
        <h2>Planets</h2>
        <ul style={styles.listContainer}>
        {film[0].fields.planets?.map((planet, i)=><li style={styles.listItem} key={i} onClick={()=>goToPlanet(planet)}>{planet}</li>)}
        </ul>
        </>
    )
}

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
    listContainer:{
        display:"flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding:"0"
    }
}

function goToPerson(id) {window.location = `/person/${id}`}
function goToPlanet(id) {window.location = `/planet/${id}`}

export default Film
