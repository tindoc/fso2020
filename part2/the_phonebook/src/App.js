import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                // console.log('axios response: ', response);
                setPersons(response.data)
            })
    }, [])

    const handleNameChange = (event) => {
        const value = event.target.value
        // console.log("state newName: ", value)
        setNewName(value)
    }

    const handleNumberChange = (event) => {
        const value = event.target.value
        // console.log("state newNumber: ", value)
        setNewNumber(value)
    }

    const handleFilterChange = (event) => {
        const value = event.target.value
        // console.log('state filterName: ', value)
        setFilterName(value)
    }

    const addName = (event) => {
        event.preventDefault()

        if (-1 !== persons.map(person => person.name).indexOf(newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newPersons = persons.concat(
                { name: newName, number: newNumber }
            )
            // console.log("state persons: ", newPersons)
            setPersons(newPersons)
        }
    }

    const personsToShow = '' === filterName
        ? persons
        : persons.filter(person => -1 !== person.name.toLocaleLowerCase().indexOf(filterName.toLocaleLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm 
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addName={addName}
            />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App