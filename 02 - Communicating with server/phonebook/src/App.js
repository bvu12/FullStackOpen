import React, { useEffect, useState } from 'react'
import telephoneService from './services/telephone'


import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { NotificationConsole, NotificationError } from './components/Notification'


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
  const [errorMessage, setErrorMessage] = useState(null)
  const [consoleMessage, setConsoleMessage] = useState(null)


  // Get the contacts from the backend
  useEffect(() => {
    telephoneService
      .getAll()
      .then(initialPeople => { // Set-up the persons object with the contacts from the backend
        setPersons(initialPeople)
      })
    }, [])

    // Event handler when user attempts to add a new contact
  const addNameAndNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // Some information is missing
    if (newNumber === '' || newName === '') {
      window.alert('Missing information!')
    } // If the name is already in the phonebook, ask to replace information
    else if (isAlreadyInPhoneBook(persons, personObject)) {
      if (window.confirm(newName + " is already in the phone book, replace the old number?")) {
        // Go through the persons object and find the name that matches
        persons.map(person => {
          if (person.name === newName) {
            // PUT: update existing
            telephoneService
              .update(person.id, personObject)
              .then(response => {
                person.number = newNumber
                setPersons([... persons])
              })
              .catch(error => {
                setErrorMessage (
                  `Failed to update ${person.name} - already removed from server`
                )
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              })
          }
        })
      }

      // Net-new person
    } else {
      // POST: create new
      telephoneService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setConsoleMessage(
            `${newName} has been added to the phonebook`
          )
          setTimeout(()=>{
            setConsoleMessage(null)
          }, 5000)

        })
    }
  }

  // Basics setters when user enters in text-field
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  // Remove from back-end and front-end
  const deletePerson = (name) => {
    if (window.confirm("Delete "+ name + "?")) {
      // Loop through the persons object
      persons.map(person => {
        if (person.name === name) {
          // DELETE from backend
          telephoneService
            .deletePerson(person.id)
            .then(response => {
              // Remove from frontend
              setPersons(persons.filter(person => person.name != name))
            })
            .catch(error => {
              setErrorMessage (
                `Failed to delete ${name} - already removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
            
        }
      })
    }
  }

  const namesToShow = getNamesToShow(persons, filter)

  return (
    <div>
      <h1>Phonebook</h1>
      <NotificationConsole message={consoleMessage} />
      <NotificationError message={errorMessage} />
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