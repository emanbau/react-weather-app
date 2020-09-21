import React from 'react';
import './App.css';
import {useState} from 'react';

const api = {
  key: "5515f92d0e396ee349e24e2914d9d0a4",
  base: "api.openweathermap.org/data/2.5/"
}



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch('${api.base}weather?q=${query}&units=imperial&appid=${api.key}')
        .then(response => response.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const handleChange = e => setQuery(e.target.value);


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return '${day} ${date} ${month} ${year}'
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 60) ? 'app-warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search City" onChange={handleChange} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weatherbox">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
