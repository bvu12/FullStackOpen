import React, { useEffect, useState } from 'react'
import axios from 'axios'
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

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
  }

  useEffect(hook, [])

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
      window.alert(newName + 'is already in the phonebook!')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const namesToShow = getNamesToShow(persons, filter)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

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
      <Persons persons={namesToShow}/>
    </div>
  )
}

export default App