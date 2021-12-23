import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = "Brian"
  const age = 25;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+15}/>
      <Hello name={name} age={age}/>
    </div>
  )
}

export default App