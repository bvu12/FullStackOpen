import React from 'react'

const Total = ({course}) => {
  const totalExercises = course.parts.reduce((total, part) => {
    return total + (part.exercises);
  }, 0)
  return (
    <h3>Total number of exercises: {totalExercises}</h3>
  )
}

const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map((part, i) => <Part key={i} name={part.name} exercise={part.exercises} />)}
    </div>
  )

}

const Part = ({name, exercise}) => {
  return (
    <p>{name} {exercise}</p>
  )
}

const Courses = ({courses}) => {
  return (
    <>
      {courses.map((course, i) => 
        <div key={i}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>)}
    </>
  )
}

export default Courses