import React, { useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import RegisterNewUser from './components/registerNewUser'
import Home from './components/Home'
import Login from './components/Login'
// import Dashboard from './components/Dashboard'

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
        {/* <Link to={'/dashboard'} style={padd}>Dashboard</Link> */}
      </div>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterNewUser />} />
        <Route path='/login' element={< Login />} />
        {/* <Route path='/dashboard' element={<Dashboard />}/> */}
      </Routes>
    </Router>
  )
}

export default App
