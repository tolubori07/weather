import React, { useState } from "react";
import './header.css';

function Header({ get_weather }) {
    const [place, setPlace] = useState('');

    const handleSearch = () => {
        get_weather(place);
    }

    return (
        <header className="header h-96">
            <nav className="nav">
                <h1 className="text-5xl font-bold heading">Weatherio</h1>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search For places"
                    className="bg-zinc-800 w-2/3 rounded-3xl h-10 shadow-2xl shadow-stone-950 text-center text-3xl"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-800 text-white rounded-3xl px-5 mx-2 py-3 mb-10"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </nav>
        </header>
    );
}

export default Header;
