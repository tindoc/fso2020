import React, { useState } from "react"

import CountryDetail from './CountryDetail'

const SearchResults = ({ countries, findName }) => {
    console.log('SearchResults Component countrues: ', countries)
    console.log('SearchResults Component findName: ', findName)

    const [ lastTimeFindName, setLastTimeFindName ] = useState({})
    const [ detailCountry, setDetailCountry ] = useState({})

    // if 'findName' change, clean the state of 'detailCountry'
    if (lastTimeFindName !== findName) {
        setDetailCountry({})
        setLastTimeFindName(findName)
    }

    if ("" === findName) {
        return (
            <></>
        )
    }

    const findCountries = countries.filter(
        country => -1 !== country.name.toLocaleLowerCase().indexOf(findName.toLocaleLowerCase())
    )
    console.log(findCountries)

    const handleDetailClick = (event) => {
        const showName = event.target.attributes['name'].value
        console.log(showName);
        setDetailCountry(
            countries.filter((country) => showName === country.name)[0]
        )
        console.log('detailCountry: ', detailCountry);
    }

    const size = findCountries.length
    if (size > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (size > 1) {
        return (
            <div>
                {findCountries.map(country =>
                    <div key={country.numericCode}>
                        {country.name}
                        <button name={country.name} onClick={handleDetailClick}>
                            show
                        </button>
                    </div>
                )}
                <CountryDetail country={detailCountry} />
            </div>
        )
    } else if (size === 1) {
        return (
            <CountryDetail country={findCountries[0]} />
        )
    } else {
        return (
            <div>No matches</div>
        )
    }
}

export default SearchResults