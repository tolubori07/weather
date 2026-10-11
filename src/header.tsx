import { useState, type FormEvent } from "react";
import { ArrowRight, CloudSun, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface HeaderProps {
  get_weather: (location: string) => Promise<void>;
  isLoading: boolean;
}

function Header({ get_weather, isLoading }: HeaderProps) {
  const [place, setPlace] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void get_weather(place);
  };

  return (
    <header className="topbar">
      <nav className="topbar-inner" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Weatherio home">
          <span className="brand-mark"><CloudSun aria-hidden="true" /></span>
          <span>weatherio</span>
        </a>
        <form className="search-form" onSubmit={handleSearch} role="search">
          <Search className="search-icon" size={18} aria-hidden="true" />
          <Input
            type="search"
            name="place"
            aria-label="Search for a city"
            placeholder="Search a city..."
            className="search-input"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
          />
          <Button type="submit" className="search-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0_0_0_0]" disabled={isLoading || !place.trim()}>
            <span>{isLoading ? "Searching" : "Search"}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </form>
      </nav>
    </header>
  );
}

export default Header;
