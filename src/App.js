import React from 'react';
import './App.css';
import {useState} from 'react';

const api = {
  key: "5515f92d0e396ee349e24e2914d9d0a4",
  base: "http://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const apiTemplate = `${api.base}weather?q=${query}&APPID=${api.key}`

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(apiTemplate)
        .then(response => response.json())
        .catch(error => alert(error))
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
          
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

    return `${day}, ${month} ${date}, ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 288.706) ? 'app-warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search Zip or City, Country" onChange={handleChange} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weatherbox">
              <div className="temp">
                {((Math.round(weather.main.temp) - 273.15) * (9 / 5) + 32).toFixed(0)}°F
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className='weather-icon'>
                <img src={(weather.weather[0].main === 'Thunderstorm') ? 'http://openweathermap.org/img/wn/11d@4x.png' 
              : (weather.weather[0].main === 'Drizzle') ? 'http://openweathermap.org/img/wn/09d@4x.png' 
              : (weather.weather[0].main === 'Rain') ? 'http://openweathermap.org/img/wn/10d@4x.png'
              : (weather.weather[0].main === 'Snow') ? 'http://openweathermap.org/img/wn/13d@4x.png'
              : (weather.weather[0].main === 'Clear') ? 'http://openweathermap.org/img/wn/01d@4x.png'
              : (weather.weather[0].main === 'Clouds') ? 'http://openweathermap.org/img/wn/02d@4x.png'
              : 'http://openweathermap.org/img/wn/50d@4x.png'
            }
            alt='icon' />
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
 
