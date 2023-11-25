import React, { useState } from 'react'

function Login() {
    const [loginForm, setLoginForm] = useState({
        userName: '',
        password: ''
    })    
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
        } else {
            console.log("error logging in user")
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
            </form>
        </div>
    )
}

export default Login