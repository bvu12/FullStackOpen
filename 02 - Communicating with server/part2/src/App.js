import React, {useState} from 'react'
import Notes from './components/Notes'


const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState ('')
  const [showAll, setShowAll] = useState(true)

  
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