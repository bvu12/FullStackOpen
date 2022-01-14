import React from 'react'

const Notes = ({notes}) => {
  return (
    <ul>
    {notes.map(note =>
       <Note key={note.id} content={note.content}/>)}
  </ul>
  )
}

const Note = ({content}) => {
    return (
      <li>
          {content}
      </li>
    )
  }

export default Notes
