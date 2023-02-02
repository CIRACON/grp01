import React, {useState} from 'react'
import { filterPeople, getPeople } from '../getPeople'
//import {fetchPeople} from './searchResults'

getPeople() // sets "persons" in getPeople.js
function Search(){
    const [userInput, setUserInput] = useState("")
    const changeHandler = (event) =>{
        setUserInput(event.target.value)
        console.log(userInput)
    }
    return (
        //<form onSubmit={(e) => {e.preventDefault(); fetchPeople(userInput)}}>
        <form onSubmit={(e) => {e.preventDefault(); filterPeople(userInput)}}>
            <label >Who are you looking for?</label>
            <input id="searchString" type={"text"} value={userInput} onChange={changeHandler}/>
            <input type="submit" value="Search" />
        </form>
    )
}

export default Search;
