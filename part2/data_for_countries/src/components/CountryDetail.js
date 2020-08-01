import React from 'react'

import Weather from './Weather'

const CountryDetail = ({ country }) => {
    console.log('Detail component: ', country);
    if (0 !== Object.keys(country).length) {
        return (
            <div>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>language</h2>
                <ul>
                    {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
                </ul>
                <img src={country.flag} alt={`flag of ${country.name}`} style={{ width: '200px', border: '1px dotted gray' }} />
                <Weather cityName={country.capital} />
            </div>
        )
    } else {
        return (<></>)
    }
}

export default CountryDetail