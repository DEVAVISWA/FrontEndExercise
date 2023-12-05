import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'

function Login() {
    //for login authorization
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    useEffect(()=>{
        const token= window.localStorage.getItem('token')
        const user= window.localStorage.getItem('user')
        if(token && user) {
            setUser(JSON.parse(user))
            setToken(token)
        }
    },[])

    const [loginForm, setLoginForm] = useState({
        userName: '',
        password: ''
    })
    // const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('Logging in User')

        const response = await fetch('http://127.0.0.1:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(loginForm)
        })
        const data = await response.json()
        if (response.status == 200) {
            console.log("User logged in successfully")
            console.log(data)
            setLoginForm({
                userName: '',
                password: ''
            })
            setToken(data.token)
            setUser(data)
            // navigate('/dashboard')
            window.localStorage.setItem('token', data.token)
            window.localStorage.setItem('user', JSON.stringify(data))
        } else {
            console.log("error logging in user")
            console.log(data)
        }
    }
    return (
        <div>
            <h3>Login Page</h3>
            <form onSubmit={handleLogin}>
                <div>
                    <input type="email"
                        placeholder='enter your email..'
                        required
                        value={loginForm.userName}
                        onChange={e => setLoginForm({ ...loginForm, userName: e.target.value })}
                    />
                </div>
                <div>
                    <input type="password"
                        placeholder='enter password..'
                        required
                        value={loginForm.password}
                        onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                </div>
                <button type='submit'>Login</button>
            </form >
            {
                user ? (<Dashboard
                    user={user} setUser={setUser}
                    token={token} setToken={setToken}
                />) :
                    (<p>
                        New user ? Please <a href="http://localhost:5173/register">Resgiter</a>
                    </p>)
            }
        </div>
    )
}

export default Login