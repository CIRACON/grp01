import React from 'react'
import { Route, Routes, BrowserRouter, } from 'react-router-dom'
import Login from './components/login'
import Dashboard from './components/dashboard';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Dashboard />}/>
        <Route path="/" element={<Login />}/>
      </Routes>
      </BrowserRouter>
    
    </React.Fragment>
  );
}

export default App;
