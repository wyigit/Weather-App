import React, { useState } from 'react'
import axios from 'axios';
import '../components/WeatherApp.css';

const WeatherApp = () => {

    const [city, setCity] = useState('');
    const [weather,setWeather] = useState(null);
    const [error,setError] = useState('');

    const API_KEY ='ffe9dc719181aa2bb400d8e5867846a0';


    const getWeather = async () =>{
        if(!city) return;

        try{
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
            setError('');  
        }catch (err){
            setWeather(null);
            setError('City not found');
        }
    };

    const getWeatherIcon = (weatherCondition) =>{
        switch (weatherCondition) {
            case'Clear':
            return <img src={require('../assets/icons/weather_icon_1.png')} alt="sunny" className="weather-icon"/>;
            case'Clouds':
            return <img src={require('../assets/icons/weather_icon_2.png')} alt="Partly Cloudy" className="weather-icon"/>;
            case'Rain':
            return <img src={require('../assets/icons/weather_icon_5.png')} alt="Rainy" className="weather-icon"/>;
            case'Thunderstorm':
            return <img src={require('../assets/icons/weather_icon_6.png')} alt="Thunderstorm" className="weather-icon"/>;
            case'Snow':
            return <img src={require('../assets/icons/weather_icon_8.png')} alt="Snow" className="weather-icon"/>;
            default:
                return <img src={require('../assets/icons/weather_icon_3.png')} alt="Cloudy" className="weather-icon"/>;
            }
    }

  return (
    <div className="container">
        <div className="app-box">
            <input 
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input">

            </input>
            <button onClick={getWeather} className='search-button'>Search</button>
            {
                error && <p className="error">{error}</p>
            }
            {
                            weather &&(
                                <div className={`weather-info${weather.weather[0].main.toLowerCase()}`}>
                                <h2 className="city-name">{weather.name}</h2>
                                {getWeatherIcon(weather.weather[0].main)}
                                <div className="temperature-container">
                                    <span className="temperature">{weather.main.temp} °C </span>
                                    <span className="weather-description">{weather.weather[0].description}</span>
                                </div>
                                </div>

                            )  }

        </div>
      
    </div>
  )
}

export default WeatherApp
