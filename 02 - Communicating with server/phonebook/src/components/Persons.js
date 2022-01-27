import React from 'react'

const DeletePerson = ({name, onClick}) => {
  return (
    <button onClick={() => {
      onClick(name)
    }}>Delete number</button> 
  )
}

const Persons = ({persons, onClick}) => {
    return (
      <div>
        {persons.map(person =>
           <div key={person.name}>
            {person.name} {person.number}
            &nbsp;
            <DeletePerson name={person.name} onClick={onClick}/>
           </div>
           )}
      </div>
    )
  }

export default Persons