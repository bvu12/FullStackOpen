import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState ('')
  const [showAll, setShowAll] = useState(true)


  // [] means that the effect is only run along with the first render of the component.
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
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
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
      
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // works on a copy of notes, and this is the variable used to develop the <ul> pieces
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)



  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note,
      important: !note.important}

    // PUT = insert, replace if already exists
    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ?
          note:
          response.data))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}

export default App