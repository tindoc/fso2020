import React, { useState } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

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