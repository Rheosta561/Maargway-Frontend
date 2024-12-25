import React from 'react'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './User';
import Recommendations from './Recommendations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:name' element={
          <User/>
        }/>
        <Route path ='/MaargWay/Recommendations/:userid' element ={<Recommendations/>} />
      </Routes>
    </Router>
  )
}

export default App