import React, {useState} from 'react'
import { fetchPeople } from './searchResults'

function Search(){
    const [userInput, setUserInput] = useState("")
    const changeHandler = (event) =>{
        setUserInput(event.target.value)
        console.log(userInput)
    }
    return (
        <form onSubmit={(e) => {e.preventDefault(); fetchPeople(userInput)}}>
            <label >Who are you looking for?</label>
            <input id="searchString" type={"text"} value={userInput} onChange={changeHandler}/>
            <input type="submit" value="Search" />
        </form>
    )
}

export default Search;
