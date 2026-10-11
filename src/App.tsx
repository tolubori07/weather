import { useEffect, useState } from "react";
import Header from "./header";
import WeatherInfo, { type WeatherData } from "./Weatherinfo";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
    const [searchLocation, setSearchLocation] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const get_weather = async (location: string) => {
        if (!location.trim()) return;

        setIsLoading(true);
        setError("");
        try {
            if (!apiKey) {
                throw new Error("Weather API key is not configured. Set VITE_OPENWEATHER_API_KEY in your .env file.");
            }

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error("We couldn't find that place. Check the spelling and try again.");
            }
            const data: WeatherData = await response.json();
            setSearchLocation(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Weather data is unavailable right now.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void get_weather("London");
    }, []);

    return (
        <div className="app-shell text-black **:text-black!">
            <Header get_weather={get_weather} isLoading={isLoading} />
            <WeatherInfo searchLocation={searchLocation} isLoading={isLoading} error={error} />
        </div>
    );
}

export default App;
