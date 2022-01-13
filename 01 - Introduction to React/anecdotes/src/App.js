import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Votes = ({points}) => {
  return (
    <div>
      has {points} points
    </div>
  )
}

function indexOfMax(arr) {
  var max = arr[0];
  var maxIndex = 0;

  // Arr is actually an object, we iterate over it with the index as its key ('vote')
  for (const vote in arr) {
    if (arr[vote] > max) {
      maxIndex = vote;
      max = arr[vote];
    }
  }

  return maxIndex;
}

const MostVoted = ({anecdotes, votes}) => {
  const copy = {...votes}
  const max = indexOfMax(copy)
  return (
    <div>
      {anecdotes[max]}
      <Votes points={copy[max]}/>
    </div>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  // selected.select the is index of the current anecdote
  // selected.votes is an array with the votes associated with each anecdote
  const [selected, setSelected] = useState({
    select: 0, votes: new Uint8Array(anecdotes.length)
  })

  // Return a random anecdote in the array
  const nextAnecdote = () => {
    setSelected({...selected,
      select: getRandomInt(anecdotes.length)})
  }

  // Increment the vote associated with the current anecdote by 1
  const voteAnecdote = () => {
    const copy = {...selected.votes}
    copy[selected.select] += 1

    setSelected({...selected,
      votes: copy})
  }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      {anecdotes[selected.select]}
      <Votes points={selected.votes[selected.select]}/>
      <div>
        <Button handleClick={voteAnecdote} text="vote"/>
        <Button handleClick={nextAnecdote} text="next anecdote"/>
      </div>
      <h1> Anecdote with most votes </h1>
      <MostVoted anecdotes ={anecdotes} votes = {selected.votes} />
    </div>
  )
}

export default App