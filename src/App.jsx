import React, { useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import RegisterNewUser from './components/registerNewUser'
import Home from './components/Home'
import Login from './components/Login'

const padd = {
  padding: 15
}
function App() {
  return ( //1 in components registerNewUser
    <Router>
      <div>
        <Link to={'/'} style={padd}>Home</Link>
        <Link to={'/register'} style={padd}>Register</Link>
        <Link to={'/login'} style={padd}>Login</Link>
      </div>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterNewUser />} />
        <Route path='/login' element={< Login />} />
      </Routes>
    </Router>
  )
}

export default App
