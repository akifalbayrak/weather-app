import React, { useRef, useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

export const WeatherApp = () => {
    let api_key = "a666568a2424acf37a0bd1ab6eabcaf5";

    const [wicon, setWicon] = useState(cloud_icon);
    const [humidity, setHumidity] = useState();
    const [wind, setWind] = useState();
    const [temperature, setTemperature] = useState();
    const [location, setLocation] = useState();
    const [searchInput, setSearchInput] = useState("London");
    const [error, setError] = useState(false);

    const search = async () => {
        console.log(searchInput);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${api_key}`;

        let response = await fetch(url);
        if (!response.ok) {
            setError(true);
            return;
        } else {
            setError(false);
        }
        let data = await response.json();
        console.log(data);

        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setTemperature(data.main.temp.toFixed(1));
        setLocation(data.name);

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        } else if (
            data.weather[0].icon === "02d" ||
            data.weather[0].icon === "02n"
        ) {
            setWicon(cloud_icon);
        } else if (
            data.weather[0].icon === "03d" ||
            data.weather[0].icon === "03n"
        ) {
            setWicon(drizzle_icon);
        } else if (
            data.weather[0].icon === "04d" ||
            data.weather[0].icon === "04n"
        ) {
            setWicon(drizzle_icon);
        } else if (
            data.weather[0].icon === "09d" ||
            data.weather[0].icon === "09n"
        ) {
            setWicon(rain_icon);
        } else if (
            data.weather[0].icon === "19d" ||
            data.weather[0].icon === "10n"
        ) {
            setWicon(rain_icon);
        } else if (
            data.weather[0].icon === "13d" ||
            data.weather[0].icon === "13n"
        ) {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }
    };
    search();
    return (
        <div className="container">
            <div className="top-bar">
                <input
                    type="text"
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search"
                />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} />
            </div>
            <div className="weather-temp">{temperature} F</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{humidity} %</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} className="icon" />
                    <div className="data">
                        <div className="wind-rate">{wind} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
            {error && <p>City not found</p>}
        </div>
    );
};
