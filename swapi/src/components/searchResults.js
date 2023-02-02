import React from 'react'
import {getPeople, filterPeople} from '../getPeople'

// props should have a "people" field which is a list of person IDs?
const SearchResults = function(props) {
    return (
        <ul>

        </ul>
    )
}

const fetchPeople = function(nameFilter) {
    // run a query for the people matching the search string
    const people = getPeople()
    const filteredPeople = filterPeople(nameFilter, people)
    // then display them in the searchResults component
}

export { SearchResults, fetchPeople }
