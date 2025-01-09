import { useEffect, useState, useCallback } from "react";
import './App.css'
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import SearchButton from "./components/SearchButton/SearchButton";
import AppHeading from "./components/AppHeading/AppHeading";
import ToggleUnit from "./components/ToggleUnit/ToggleUnit";

function App() {
    const [city, updateCity] = useState('');
    const [weatherData, updateWeatherData] = useState([]);
    const [tempUnit, updateTempUnit] = useState({
        buttonText: 'Convert To Fahrenheit',
        urlUnit: 'metric'
    });


    const handleChange = useCallback((e) => {
        updateCity(e.target.value); 
    }, [city])

    // const unitChange = (e) => {
        // if(tempUnit.urlUnit == "metric"){
        //     updateTempUnit({
        //         urlUnit: 'imperial',
        //         buttonText: 'Convert To Fahrenheit'
        //     });
        // }else{
        //     updateTempUnit({
        //         urlUnit: 'metric',
        //         buttonText: 'Convert To Celsius'
        //     });
        // }
    // }
    const toggleUnit = async () => {
        // Toggle between Celsius and Fahrenheit
        
        // Refetch weather data with the new unit
        const newUnit = tempUnit.urlUnit === 'metric' ? 'imperial' : 'metric';
        const newButtonText = tempUnit.urlUnit === 'metric' ? 'Convert To Fahrenheit' : 'Convert To Celsius';
        
        console.log(newUnit);
        
        // Update the state with the new unit and button text
        // updateTempUnit({
        //     urlUnit: newUnit,
        //     buttonText: newButtonText
        // });

            updateTempUnit(prevState=>{
                return {
                urlUnit: newUnit,
                buttonText: newButtonText
                }
            })
        };
        
        
        useEffect( function(){


            (async function(){
            await searchCity();
        })()

        
    }, [tempUnit.urlUnit])

    
    

    useEffect(() => {
        const fetchInitialWeather = async (latitude, longitude) => {
            const APIKey = process.env.REACT_APP_API_KEY;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${tempUnit.urlUnit}&appid=${APIKey}`);
            const data = await response.json();
            updateWeatherData([data]);
        };

        fetchInitialWeather();

        // user's current location after getting permission
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchInitialWeather(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        };
        getCurrentLocation();
    }, []); // Run only on mount


    const searchCity =async () => {
        console.log(tempUnit.urlUnit);
        try{

            const APIKey = process.env.REACT_APP_API_KEY;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempUnit.urlUnit}&appid=${APIKey}`);
            const data = await response.json();
            // updateWeatherData(data);
            updateWeatherData([data]);
            console.log(data);
            // updateCity('');
        }
        catch(err){
            console.log(err);
        }
        
    }

    
    // console.log(city);
    return (
        <div className="App" style={{minHeight: '100vh'}}>
            <AppHeading>Weather Application</AppHeading>
            <SearchBar onchangeEvent={handleChange} val={city.trimStart()} placeholder='Search for a city'/>
            <SearchButton  onclickEvent={searchCity}>Search</SearchButton> 
            <ToggleUnit toggleFunc={toggleUnit}>{tempUnit.buttonText}</ToggleUnit>
            <div className="weather-info">
                {weatherData.map((data, index) => {

                   return (
                    <WeatherCard key={index} data={data} unit={tempUnit.urlUnit}/>
                    )
                })}
            </div>
        </div>
    );
}

export default App;

