import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Notes from './components/Notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState ('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  // [] means that the effect is only run along with the first render of the component.
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // works on a copy of notes, and this is the variable used to develop the <ul> pieces
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
         {/* On click, switch between showing all and showing important */}
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <Notes notes={notesToShow}/>
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