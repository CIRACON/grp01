import React from 'react'
import { Route, Routes, BrowserRouter, } from 'react-router-dom'
import Login from './components/login'
import EmpDashboard from './components/empDashboard';
import MgrDashboard from './components/mgrDashboard';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/employee/:id" element={<EmpDashboard />}/>
        <Route path="/manager/:id" element={<MgrDashboard />}/>
        <Route path="/" element={<Login />}/>
      </Routes>
      </BrowserRouter>
    
    </React.Fragment>
  );
}

export default App;
