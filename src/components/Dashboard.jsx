import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Dashboard({ user, setUser, token, setToken }) {
  const handleLogout = () => {
    setUser(null)
    setToken(null)

    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
  }
  const [newNote, setNewNote] = useState('')
  //1 to view the created notes by the particular user
  const [notes, setNotes] = useState([])
  //4 define fetchNotes() fn
  const fetchNotes = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    console.log('Fetching notes..')
    try {
      const response= await axios.get('http://127.0.0.1:3000/api/notes', config)
      console.log('Notes fetched successfully')
      console.log(response.data)
      setNotes(response.data)
    } catch (e) {
      console.log('Error fetchng notes', e)
    }
  }
  //3 fetch notes using use effect
  useEffect(() => {
    fetchNotes()
  }, [])
  const addNote = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const newNoteObject = {
      content: newNote
    }
    console.log('Adding note')
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/notes/', newNoteObject, config)
      console.log('note added successfully')
      console.log(response.data)
      setNewNote('')
      fetchNotes() ;
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
      {/*2  to view the notes posted by the particular user */}
      <ul>
        {
          notes.map(note => <li key={note._id}> {note.content} </li>)
        }
      </ul>
    </div>
  )
}

export default Dashboard