import React from "react";
import './info.css'
import { format } from "date-fns";
function WeatherInfo({ searchLocation }) {
    const weatherImages = {
        'Clear': 'public/clear.jpg',
        'Clouds': 'public/clouds.jpg',
        'Rain': 'public/rain.jpg',
        'Snow': 'public/snow.jpg',
        // Add more conditions as needed
    };

    const sunriseTimestamp = searchLocation.sys && searchLocation.sys.sunrise;
    const sunsetTimestamp = searchLocation.sys && searchLocation.sys.sunset;
    // Format the sunrise time for display
    const formattedSunriseTime = sunriseTimestamp
        ? format(new Date(sunriseTimestamp * 1000), "h:mm a")
        : "N/A";
        const formattedSunsetTime = sunsetTimestamp
        ? format(new Date(sunsetTimestamp * 1000), "h:mm a")
        : "N/A";
    return (
        <main>
            <div className="weather-info">
                {searchLocation.main && (
                    <>
                        <div className="temp  text-center">
                            <h2 >Weather in {searchLocation.name}, {searchLocation.sys.country}</h2>
                            <h1 className="text-8xl">{searchLocation.main.temp}°C</h1>
                            <h1>Max {searchLocation.main.temp_max}°C</h1>
                            <h1>Min {searchLocation.main.temp_min}°C</h1>
                            <h1>Feels Like {searchLocation.main.feels_like}°C</h1>
                            <p>Weather: {searchLocation.weather[0].description}</p>
                        </div>

                        <div className="data grid grid-cols-2 grid-rows-5 gap-4 text-2xl-md">
                            <div className="items rounded-lg">
                                <p>Humidity: {searchLocation.main.humidity}%</p>
                            </div>
                            <div className="items rounded-lg">
                                <p>pressure: {searchLocation.main.pressure} pa</p>
                            </div>
                            <div className="items rounded-lg">
                                <p className="ml-[5%]">Sunrise: {formattedSunriseTime}</p> 
                                <br />
                                <img src="./sunrise.png" alt="" className="sun h-[50%] w-[10%]" />
                            </div>
                            <div className="items rounded-lg">
                                <p className="ml-[5%]">Sunset: {formattedSunsetTime}</p> 
                                <br />
                                <img src="./sunrise.png" alt="" className="sun h-[50%] w-[10%]" />
                            </div>
                            <div className="items rounded-lg">
                                <p>Visibility: {searchLocation.visibility/1000}Km</p>
                            </div>
                            <div className="items rounded-lg">
                                <p>Wind Gust: {searchLocation.wind.gust}m/s</p>
                            </div>
                            <div className="items rounded-lg">
                                <p>Wind Speed: {searchLocation.wind.speed} mph</p>
                            </div>
                            <div className="items rounded-lg">
                                <img src="./compass-up-arrow.svg" alt="" className="arrow  rounded-xl " />
                                <p>Wind direction: {searchLocation.wind.deg}deg</p>
                            </div>
                        </div>

                    </>
                )}
            </div>
        </main>
    );
}

export default WeatherInfo;
