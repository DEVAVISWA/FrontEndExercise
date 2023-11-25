import React, { useState } from 'react'

function RegisterNewUser() {

  const [registerForm, setRegisterForm] = useState({ //2
    userName: '',
    name: '',
    password: ''
  })

  const handleRegister = async (event) => { //6
    event.preventDefault()
    console.log('registering new user')
    const registerBody = {
      userName: registerForm.userName,
      name: registerForm.name,
      password: registerForm.password
    }

    const response = await fetch('http://127.0.0.1:3000/api/users/', { //7
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerBody)
    })
    const data = await response.json()
    if (response.status == 200) {
      console.log('user created successfully')
      console.log(data)
      setRegisterForm({
        userName: '',
        name: '',
        password: ''
      })
    } else {
      console.log('error creating user')
    }
  }

  return (
    <div>
      <h3>Register User</h3>
      <div>
        {/* 5 */}
        <form onSubmit={handleRegister}>
          <div>
            <input
              type="email"
              placeholder='email...'
              value={registerForm.userName} //3
              onChange={e => setRegisterForm({ ...registerForm, userName: e.target.value })} //4
              required />
          </div>
          <div>
            <input
              type="text"
              placeholder='name...'
              value={registerForm.name}
              onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
              required />
          </div>
          <div>
            <input
              type="password"
              placeholder='password...'
              value={registerForm.password}
              onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
              required />
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterNewUser