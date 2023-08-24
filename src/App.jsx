import React, { useState, useEffect } from "react";
import Header from "./header.jsx";
import WeatherInfo from "./Weatherinfo.jsx";
import './App.css';

function App() {
    const [searchLocation, setSearchLocation] = useState({});

    const get_weather = async (Location) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=c5b6cf05e8525851c86c0d72366bded7&units=metric`);
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            const data = await response.json();
            setSearchLocation(data);
            console.log(data)
        } catch (error) {
            console.error(error.message);
            // Handle the error, you can set an error message state here
        }
       
    };

    useEffect(() => {
        get_weather('London');
    }, []);

    return (
        <div className="App">
            <Header get_weather={get_weather} />
            <WeatherInfo searchLocation={searchLocation} />
        </div>
    );
}

export default App;
