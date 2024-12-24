import React from 'react'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:name' element={
          <User/>
        }/>
      </Routes>
    </Router>
  )
}

export default App