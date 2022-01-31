import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import { NotificationError, NotificationConsole} from './components/Notification'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style ={footerStyle}>
      <br />
      <em> Note app</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState ('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [consoleMessage, setConsoleMessage] = useState(null)

  // [] means that the effect is only run along with the first render of the component.
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random < 0.5,
    }

    // POST: create new 
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')

        setConsoleMessage(
          `${newNote} added to the server`
        )
        setTimeout(() => {
          setConsoleMessage(null)
        }, 5000)
      })
      
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note,
      important: !note.important}

    // PUT = insert, replace if already exists
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ?
          note :
          returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note ${note.content} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })    
  }

    // works on a copy of notes, and this is the variable used to develop the <ul> pieces
    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <NotificationError message={errorMessage} />
      <NotificationConsole message={consoleMessage} />
      <div>
         {/* On click, switch between showing all and showing important */}
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) =>
          <Note 
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value = {newNote}
          onChange = {handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App