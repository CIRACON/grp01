import React from 'react'
import { Route, BrowserRouter, } from 'react-router-dom'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/">
          {/* login page here */}
        </Route>
      </BrowserRouter>
      <div className="App">
        <h1>Login page</h1>
      </div>
    </React.Fragment>
  );
}

export default App;
