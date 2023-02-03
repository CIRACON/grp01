import Search from "./components/search";
import Person from "./components/person";
import {SearchResults} from "./components/searchResults";
import './App.css';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Planets from "./components/planets";
import Film from "./components/film";
const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'swapi'
const db = client.db(dbName)
const filmCollection = db.collection("films")
const personCollection = db.collection("people")
const planetCollection = db.collection("planets")

function App() {
  return (
    <BrowserRouter>
        <h1>Star Wars Universe Lookup</h1>
        <Routes>
          <Route path="/person/:id" element={<Person />}/>
          <Route path="/planet/:id" element={<Planets />}/>
          <Route path="/film/:id" element={<Film />}/>
          <Route path="/" element={<Search />}/>
          
        </Routes>
        <p>copyright 2023</p>
    </BrowserRouter>
  );
}

export default App;
