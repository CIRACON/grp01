import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'

function Planets(){
    const [planet, setPlanet] = useState()
    async function getPlanet(id){
        let url=`http://localhost:4000/planet/${id}`
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
    if(!planet) {return null}
    return(
        <>
        <h1>{planet[0].fields.name}</h1>
        <h2>General info</h2>
        <p style={styles.listItem}>Climate: {planet[0].fields.climate}</p>
        <h2>People</h2>
        <ul style={styles.listContainer}>
            {/* {planet.residents?.map((resident,i)=><li key={i} style={styles.listItem} onClick={()=>goToPerson(getIdFromUrl("people",resident))}>{getIdFromUrl("people",resident)}</li>)} */}
        </ul>
        <h2>Films</h2>
        <ul>
        {/* {planet.films?.map((film, i)=><li key={i} style={styles.listItem} onClick={()=>goToFilm(getIdFromUrl("films",film))}>{getIdFromUrl("films",film)}</li>)} */}
        </ul>
        </>
    )
}

function goToPerson(id) {window.location = `/person/${id}`}
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
    listContainer:{
        display:"flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding:"0"
    }
}
export default Planets