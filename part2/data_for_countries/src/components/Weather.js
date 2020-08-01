import React, { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

const weatherIconAbbreviation = {
    'Snow': 'sn',
    'Sleet': 'sl',
    'Hail': 'h',
    'Thunderstorm': 't',
    'Heavy Rain': 'hr',
    'Light Rain': 'lr',
    'Showers': 's',
    'Heavy Cloud': 'hc',
    'Light Cloud': 'lc',
    'Clear': 'c'
}

const Weather = ({ cityName }) => {
    console.log('Weather comp params cityName', cityName)

    const [weather, setWeather] = useState({
        'temperature': '',
        'weatherStatus': '',
        'weatherStatusIconURL': '',
        'windSpeed': ''
    })

    useEffect(() => {
        console.log('useEffect');
        axios
            .get(`/weatherProxy/api/location/search/?query=${cityName}`)
            // localServer for test
            // .get('http://localhost:3001/getWoeid')
            .then(response => {
                console.log('weoid get', response);
                if (response.status === 200 && response.data.length !== 0) {
                    const woeid = response.data[0]['woeid'];

                    axios
                        .get(`/weatherProxy/api/location/${woeid}/`)
                        // localServer for test
                        // .get('http://localhost:3001/weather')
                        .then(response => {
                            console.log('weather get', response);

                            if (response.status === 200 && response.data.length !== 0) {
                                const data = response.data.consolidated_weather[0];
                                const newObj = {
                                    'temperature': data.the_temp,
                                    'weatherStatus': data.weather_state_name,
                                    'weatherStatusIconURL': `https://www.metaweather.com/static/img/weather/${weatherIconAbbreviation[data.weather_state_name]}.svg`,
                                    'windSpeed': data.wind_speed
                                }
                                setWeather(newObj)
                            }
                        })
                }
            })
    }, [cityName])

    if (weather.weatherStatus !== '') {
        return (
            <div>
                <h2>Weather in {cityName}</h2>
                <p>temperature: {weather.temperature} Celcius</p>
                <img src={weather.weatherStatusIconURL} alt={`the icon show weather states of ${weather.weatherStatus}`} style={{ width: '80px', border: '1px dotted gray' }} />
                <p>windSpeed: {weather.windSpeed}</p>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Weather in {cityName}</h2>
                <p>Get weather failed.</p>
            </div>
        )
    }
}

export default Weather