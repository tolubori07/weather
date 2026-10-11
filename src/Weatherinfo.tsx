import { format } from "date-fns";
import { Compass, Droplets, Eye, Gauge, Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";

export interface WeatherData {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: { main: string; description: string }[];
    visibility: number;
    wind: { speed: number; gust?: number; deg: number };
}

interface WeatherInfoProps {
    searchLocation: WeatherData | null;
    isLoading: boolean;
    error: string;
}

const conditionIcons = {
    Clear: Sun,
    Clouds: Cloud,
    Drizzle: CloudDrizzle,
    Rain: CloudRain,
    Snow: CloudSnow,
} as const;

function WeatherInfo({ searchLocation, isLoading, error }: WeatherInfoProps) {
    if (!searchLocation) {
        return (
            <main className="dashboard-main">
                <section className="welcome-panel" aria-live="polite">
                    <span className="eyebrow">YOUR DAILY FORECAST</span>
                    <h1>{error ? "Let's try another place." : "A little more sunshine, wherever you are."}</h1>
                    <p>{error || (isLoading ? "Finding the latest conditions..." : "Search for a city to see its current weather.")}</p>
                </section>
            </main>
        );
    }

    const { main, sys, weather, wind } = searchLocation;
    const condition = weather[0];
    const WeatherIcon = conditionIcons[condition.main as keyof typeof conditionIcons] ?? Sun;
    const sunrise = format(new Date(sys.sunrise * 1000), "h:mm a");
    const sunset = format(new Date(sys.sunset * 1000), "h:mm a");
    const updatedAt = new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date());

    const details = [
        { label: "Feels like", value: `${Math.round(main.feels_like)}°`, note: "What it feels like outside", Icon: Thermometer },
        { label: "Humidity", value: `${main.humidity}%`, note: "Relative humidity", Icon: Droplets },
        { label: "Wind", value: `${Math.round(wind.speed)} m/s`, note: `Direction ${wind.deg}°`, Icon: Wind },
        { label: "Visibility", value: `${(searchLocation.visibility / 1000).toFixed(1)} km`, note: "Current visibility", Icon: Eye },
        { label: "Pressure", value: `${main.pressure} hPa`, note: "Atmospheric pressure", Icon: Gauge },
        { label: "Sunrise · Sunset", value: `${sunrise} · ${sunset}`, note: "Local time", Icon: Sunrise },
    ];

    return (
        <main className="dashboard-main">
            <div className="section-heading">
                <div>
                    <span className="eyebrow">LOCAL WEATHER</span>
                    <h1>Today in {searchLocation.name}</h1>
                </div>
                <p className="updated-label">Updated {updatedAt}</p>
            </div>

            <section className="current-weather" aria-label={`Current weather in ${searchLocation.name}`}>
                <div className="current-copy">
                    <div className="location-line">
                        <span className="location-dot" aria-hidden="true" />
                        <span>{searchLocation.name}, {sys.country}</span>
                    </div>
                    <div className="current-condition">
                        <div>
                            <p className="condition-description">{condition.description}</p>
                            <p className="temperature">{Math.round(main.temp)}<span>°</span></p>
                            <p className="temperature-range">H {Math.round(main.temp_max)}° <span>/</span> L {Math.round(main.temp_min)}°</p>
                        </div>
                        <div className="weather-symbol" aria-hidden="true">
                            <WeatherIcon strokeWidth={1.2} />
                        </div>
                    </div>
                </div>
                <div className="current-aside">
                    <span className="aside-label">RIGHT NOW</span>
                    <p className="aside-summary">{condition.description.charAt(0).toUpperCase() + condition.description.slice(1)} skies with a high of {Math.round(main.temp_max)}°.</p>
                    <div className="sun-times">
                        <div><Sunrise aria-hidden="true" /><span><small>Sunrise</small>{sunrise}</span></div>
                        <div><Sunset aria-hidden="true" /><span><small>Sunset</small>{sunset}</span></div>
                    </div>
                    <div className="wind-direction"><Compass aria-hidden="true" /><span>Wind direction</span><strong>{wind.deg}°</strong></div>
                </div>
            </section>

            <div className="details-heading">
                <h2>Weather details</h2>
                <span>MEASURED IN METRIC</span>
            </div>
            <section className="details-grid" aria-label="Weather details">
                {details.map(({ label, value, note, Icon }) => (
                    <article className="detail-item" key={label}>
                        <div className="detail-topline"><span>{label}</span><Icon size={18} aria-hidden="true" /></div>
                        <strong>{value}</strong>
                        <p>{note}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default WeatherInfo;
