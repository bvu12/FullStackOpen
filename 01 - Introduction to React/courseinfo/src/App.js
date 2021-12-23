import React from 'react'

const Total = (props) => {
  return (
    <p>Number of exercises: {props.exercises}</p>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} exercise={props.ex1} />
      <Part name={props.name2} exercise={props.ex2} />
      <Part name={props.name3} exercise={props.ex3} />
    </div>
  )

}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercise}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content name1={part1} name2={part2} name3={part3} ex1={exercises1} ex2={exercises2} ex3={exercises3} />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App