import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        personsService
            .getAll()
            .then(initPersons => {
                // console.log('axios response: ', response);
                setPersons(initPersons)
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

        const newPerson = { name: newName, number: newNumber }

        const personsWithSameName = persons.filter(person => newName === person.name)
        console.log('same name', personsWithSameName.length)
        
        if (personsWithSameName.length !== 0) {
            const result = window.confirm(`${newName} is aleardy added to phonebook, replace the old number with new one?`)
            if (result) {
                const id = personsWithSameName[0].id
                personsService
                    .update(id, newPerson)
                    .then(returnPerson => {
                        setPersons(persons.map(person => id === person.id ? returnPerson : person))
                    })
                    .catch(error => {
                        alert(`update error.`)
                    })
            }
        } else {
            personsService
                .create(newPerson)
                .then(returnPerson => {
                    setPersons(persons.concat(returnPerson))
                })
        }
    }

    const deleteName = (event) => {
        const result = window.confirm(`Delete ${event.target.value} ?`)
        console.log('delete id: ', event.target.id)

        if (result) {
            const id = event.target.id;
            personsService
                .deleteName(id)
                .then(returnData => {
                    console.log('after delete data', returnData)
                    console.log(persons.filter(person => id !== person.id.toString()))
                    setPersons(persons.filter(person => id !== person.id.toString()))
                })
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
            <Persons
                personsToShow={personsToShow}
                deleteName={deleteName}
            />
        </div>
    )
}

export default App