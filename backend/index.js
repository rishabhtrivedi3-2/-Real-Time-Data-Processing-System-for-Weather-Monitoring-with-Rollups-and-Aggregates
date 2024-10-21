import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from 'dotenv';
// import weather from "./models/weather.js";
dotenv.config(); // Make sure to use dotenv to load environment variables

const app = express();

console.log(process.env.ALERT_INTERVAL);

const cities = [
    { name: "Delhi", id: "1273294" },
    { name: "Mumbai", id: "1275339" },
    { name: "Chennai", id: "1264527" },
    { name: "Bangalore", id: "1277333" },
    { name: "Kolkata", id: "1275004" },
    { name: "Hyderabad", id: "1269843" }
];

app.use(express());
app.use(cors({ origin: 'http://localhost:3000' }));
async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=eb90490440b3de74ade3785de3a316d9`;
    const response = await axios.get(url);
    const data = response.data;

    const tempCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

    return {
        city: city.name,
        temperature: {
            current: tempCelsius(data.main.temp),
            min: tempCelsius(data.main.temp_min),
            max: tempCelsius(data.main.temp_max),
            feels_like: tempCelsius(data.main.feels_like)
        },
        weather: data.weather[0].main,
        timestamp: new Date(data.dt * 1000)
    };
}

function calculateDailySummary(data) {
    const avgTemp = (data.reduce((acc, entry) => acc + parseFloat(entry.temperature.current), 0) / data.length).toFixed(2);
    const maxTemp = Math.max(...data.map(entry => parseFloat(entry.temperature.max)));
    const minTemp = Math.min(...data.map(entry => parseFloat(entry.temperature.min)));
    const dominantWeather = data.reduce((acc, entry) => {
        acc[entry.weather] = (acc[entry.weather] || 0) + 1;
        return acc;
    }, {});

    return {
        avgTemp,
        maxTemp,
        minTemp,
        dominantWeather: Object.keys(dominantWeather).reduce((a, b) => dominantWeather[a] > dominantWeather[b] ? a : b)
    };
}

app.get("/", async (req, res) => {
    try {
        const weatherData = await Promise.all(cities.map(city => fetchWeatherData(city)));

        const dailySummary = calculateDailySummary(weatherData);

        await Promise.all(weatherData.map(async (data) => {
            // const newWeather = new weather({ ...data, dailySummary });
            // await newWeather.save();
        }));

        res.json({ weatherData, dailySummary });
    } catch (error) {
        console.error("Error fetching weather data", error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});