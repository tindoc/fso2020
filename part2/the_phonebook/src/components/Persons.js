import React from 'react'

const Persons = ({ personsToShow, deleteName }) => {
    console.log('[Persons comp] personsToShow', personsToShow)
    return (
        <div>
            {personsToShow.map(person =>
                <div key={person.id}>{person.name} {person.number}
                    <button onClick={deleteName} value={person.name} id={person.id}>delete</button>
                </div>)
            }
        </div>
    )
}

export default Persons