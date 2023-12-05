import axios from 'axios'
import React, { useState } from 'react'

function Dashboard({ user, setUser, token, setToken }) {
  const handleLogout = () => {
    setUser(null)
    setToken(null)

    window.localStorage.clear()
  }
  const [newNote, setNewNote] = useState('')
  const addNote = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const newNoteObject= {
      content: newNote
    }
    console.log('Adding note')
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/notes/', newNoteObject, config)
      console.log('note added successfully')
      console.log(response.data)
      setNewNote('')
    } catch (error) {
      console.log('error adding note', error)
    }
  }
  return (
    <div>
      <hr />
      <h4>Dashboard</h4>
      <p>Welcome {user.userName}</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      <form onSubmit={addNote}>
        <input type="text"
          placeholder='enter your note...'
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          required
        /> &nbsp;
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Dashboard