import React, {useEffect, useState} from 'react'
import { filterPeople, getPeople } from '../getPeople'
//import {fetchPeople} from './searchResults'

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
        <ul>
            {searchRes.map((person, i) => <li key={i} onClick={()=>goToPerson(person.id)}>{person.name}</li>)}
        </ul>
        </>
    )
}
function goToPerson(id) {window.location = `/person/${id}`}

export default Search;
