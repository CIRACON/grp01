import React, {useState} from 'react'
import getPeople from '../getPeople'

function Search(){
    const [userInput, setUserInput] = useState("")
    const changeHandler = (event) =>{
        setUserInput(event.target.value)
        console.log(userInput)
    }
    return (
        //<form onSubmit={(e) => {e.preventDefault(); fetchPeople(userInput)}}>
        <form onSubmit={(e) => {e.preventDefault(); fetchPeople()}}>
        <label >Who are you looking for?</label>
        <input id="searchString" type={"text"} value={userInput} onChange={changeHandler}/>
        <input type="submit" value="Search" />
        </form>
    )
}

const fetchPeople = function() {
    // run a query for the people matching the search string
    getPeople()
    // then display them in the searchResults component
}

export default Search;