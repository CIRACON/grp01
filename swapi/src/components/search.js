import React, {useEffect, useState} from 'react'
import { filterPeople, getPeople } from '../getPeople'


function Search(){
    const [userInput, setUserInput] = useState("")
    const [searchRes, setSearchRes] = useState([])
    const changeHandler = (event) =>{
        setUserInput(event.target.value)
        console.log(userInput)
    }
    useEffect(()=>{getPeople()},[])// sets "persons" in getPeople.js
    useEffect(()=>{setSearchRes(filterPeople(userInput))},[userInput])
    return (
        //<form onSubmit={(e) => {e.preventDefault(); fetchPeople(userInput)}}>
        <>
        <form onSubmit={(e) => {e.preventDefault()}}>
            <label >Who are you looking for?</label>
            <input id="searchString" type={"text"} value={userInput} onChange={changeHandler}/>
            <input type="submit" value="Search" />
        </form>
        <ul style={styles.listContainer}>
            {searchRes.map((person, i) => <li key={i} style={styles.listItem} onClick={()=>goToPerson(person.id)}>{person.name}</li>)}
        </ul>
        </>
    )
}
function goToPerson(id) {window.location = `/person/${id}`}

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
export default Search;
