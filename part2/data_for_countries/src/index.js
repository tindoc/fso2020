import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import SearchResults from './components/SearchResults'

const App = () => {
    console.log('env variable', process.env.REACT_APP_TEST_VARIABLE)

    const [findName, setFindName] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('/countryProxy/rest/v2/all')
            // localServer for test
            // .get('http://localhost:3001/all')
            .then(response => {
                console.log('axios response: ', response)
                setCountries(response.data)
            })
    }, [])

    const handleInputChange = (event) => {
        const name = event.target.value
        // console.log('input name: ', name)
        setFindName(name)
    }

    return (
        <div>
            find countries <input onChange={handleInputChange} />
            <SearchResults countries={countries} findName={findName} />
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);