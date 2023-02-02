import React, {useState} from 'react'

function Search(){
    const [userInput, setUserInput] = useState("")
    const changeHandler = (event) =>{
        setUserInput(event.target.value)
        console.log(userInput)
    }
    return (
        <>
        <label >Who are you looking for?</label>
        <input id="searchString" type={"text"} value={userInput} onChange={(changeHandler)}/>
        </>
    )
}

export default Search;