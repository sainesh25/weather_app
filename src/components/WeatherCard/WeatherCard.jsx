import Message from '../Message/Message';
import './WeatherCard.css';

import React from 'react';

const WeatherCard = ({ data , unit}) => {
    // Check if data is available
    if (!data || !data.main || !data.weather || data.weather.length === 0 || !data.sys) {
        return <Message>Please Enter a valid City name</Message>;
    }
    const { name, main, dt, weather, sys, clouds, wind } = data;
    console.log(unit , main);
    const temperature = unit === 'metric' ? `${Math.round(main.temp)} °C` : `${Math.round(main.temp)} °F`;
    const iconcode = data ? weather[0].icon : '#';

    const date = new Date;
    const currentDay = date.getDay();
    let day = '';
    switch (currentDay) {
        case 0:
            day = 'Sunday'
            break;
        case 1:
            day = 'Monday'
            break;
        case 2:
            day = 'Tuesday'
            break;
        case 3:
            day = 'Wednesday'
            break;
        case 4:
            day = 'Thursday'
            break;
        case 5:
            day = 'Friday'
            break;
        case 6:
            day = 'Saturday'
            break;
        default:
            day = 'Invalid Day'
            break;
    }

    const currentTimeForCity = new Date(dt * 1000); // Convert to milliseconds

    // Options for formatting the time
    const options = {
        hour: 'numeric',
        minute: 'numeric',
    };

    // Format the time
    const formattedTime = currentTimeForCity.toLocaleTimeString('en-US', options);

    return (
        <>
            <div className="weather-card-main">
                <div className="weather-card">
                    <h2 className='city-name'>{name}, {sys.country}</h2>
                    <div>
                        <p className='temp-txt'>{temperature}</p>
                        <p> {day} {formattedTime}</p>
                        <p className='extra-info-txt'>Wind {wind.speed} m/s</p>
                        <img className='weather-icon' src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="Weather icon" />      
                        <p className='weather-description'>{weather[0].main}</p>
                        <div className="weather-extra-info">
                            <p className='extra-info-txt'>Feels like: {Math.round(main.feels_like)} °C</p>
                            <p className='extra-info-txt'>Humidity: {Math.round(main.humidity)} %</p>
                        </div>

                        <div className="weather-extra-info">
                            <p className='extra-info-txt'>Pressure: {Math.round(main.pressure)} hPa</p>
                            <p className='extra-info-txt'>Cloudiness: {Math.round(clouds.all)} %</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(WeatherCard);

