import React from 'react'
import Notes from './components/Notes'


const App = ({notes}) => {
  return (
    <div>
      <h1>Notes</h1>
      <Notes notes={notes}/>
    </div>
  )
}

export default App