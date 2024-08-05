import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "05003c47c64485a49e261f260395b46c"; // Replace with your actual API key

  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Add values");
    } else {
      const weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: weatherData });

      if (weatherData.cod !== "404") {
        const forecastData = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${form.city},${form.country}&appid=${APIKEY}`
        )
          .then((res) => res.json())
          .then((data) => data);

        setForecast({ data: forecastData });
      }
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City*"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country(optinal)"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {weather.data !== undefined && forecast.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} forecast={forecast.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
