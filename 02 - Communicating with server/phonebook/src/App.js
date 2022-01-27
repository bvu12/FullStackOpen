import React, { useEffect, useState } from 'react'
import telephoneService from './services/telephone'


import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


// Return true if the provided name is already in the phonebook
function isAlreadyInPhoneBook(persons, newPerson) {
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name === newPerson.name) {
      return true;
    }
  }
  return false;
}

// Filter persons based on nameKey
function getNamesToShow(persons, nameKey) {
  let filteredPersons = [];
  // Need to figure out why '' isn't in all strings
  if (nameKey==='') {
    filteredPersons = persons
  } else {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase().includes(nameKey.toLowerCase())) {
        filteredPersons = filteredPersons.concat(persons[i])
      }
    }
  }
  return filteredPersons;
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')


  useEffect(() => {
    telephoneService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
    }, [])

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (newNumber === '' || newName === '') {
      window.alert('Missing information!')
    }
    else if (isAlreadyInPhoneBook(persons, personObject)) {
      if (window.confirm(newName + " is already in the phone book, replace the old number?")) {
        persons.map(person => {
          if (person.name === newName) {
            // PUT: update existing
            telephoneService
              .update(person.id, personObject)
              .then(response => {
                person.number = newNumber
                setPersons([... persons])
              })
          }
        })
      }

    } else {
      // POST: create new
      telephoneService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (name) => {
    if (window.confirm("Delete "+ name + "?")) {
      persons.map(person => {
        if (person.name === name) {
          // DELETE
          telephoneService
            .deletePerson(person.id)
            .then(response => {
              setPersons(persons.filter(person => person.name != name))
            })
        }
      })
    }
  }

  const namesToShow = getNamesToShow(persons, filter)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange = {handleFilterChange}/>

      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addNameAndNumber}
        nameValue = {newName}
        nameOnChange = {handleNameChange}
        numberValue = {newNumber}
        numberOnChange = {handleNumberChange}/>
        
      <h2>Numbers</h2>
      <Persons persons={namesToShow} onClick={deletePerson}/>
    </div>
  )
}

export default App