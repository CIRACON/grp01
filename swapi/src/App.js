import Search from "./components/search";
import SearchResults from "./components/searchResults";
import './App.css';
import React from "react";

function App() {
  return (
    <React.Fragment>
        <h1>Star Wars Universe Lookup</h1>
      
        <Search />

        <SearchResults />
      
        <p>copyright 2023</p>
      
    </React.Fragment>
  );
}

export default App;
