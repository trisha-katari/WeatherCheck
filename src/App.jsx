import React, { useState } from 'react';
import './App.css';

const App = () => {
    const api = {
        key: "c5e64b34a076ddbcca60f477e21970a3",
        url: "https://api.openweathermap.org/data/2.5/weather"
    };

    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const searchWeather = () => {
        if (!search) {
            setError("Please enter a city name");
            return;
        }
        
        setLoading(true); 
        setError(""); 
        fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
            .then(res => res.json())
            .then(data => {
                if (data.cod === 200) {
                    setWeather(data);
                } else {
                    setError("City not found");
                }
                setLoading(false); 
            })
            .catch(err => {
                console.log(err);
                setError("An error occurred. Please try again.");
                setLoading(false);
            });
    };

    const KeyPress = (e) => {
        if (e.key === 'Enter') {
            searchWeather();
        }
    };

    return (
        <div>
            <section>
                <input 
                    type="text" 
                    onChange={(e) => setSearch(e.target.value)} 
                    onKeyPress={KeyPress}  
                />
                <button onClick={searchWeather}>Search</button>
            </section>
            {loading ? ( 
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p> 
            ) : weather.main ? (
                <>  
                    <h3>{weather.name}</h3> 
                    <p>Temperature: {weather.main.temp} C</p> 
                    <p>Weather: {weather.weather[0].description}</p>
                </>
            ) : false}
        </div>
    );
};

export default App;
