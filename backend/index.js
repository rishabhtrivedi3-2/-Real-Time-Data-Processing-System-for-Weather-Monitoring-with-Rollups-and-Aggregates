import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config(); // Make sure to use dotenv to load environment variables

const app = express();

// Replace with your OpenWeatherMap API key
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
console.log(OPENWEATHERMAP_API_KEY);

const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];


app.use(express());
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your React app's origin


// app.get("/", async (req, res) => {


//         const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q= &appid=eb90490440b3de74ade3785de3a316d9");
//         res.send(response.data);
//         // console.log(response.data)

// });
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
const cityd = [];

app.get("/", async (req, res) => {
    try {

        const cityWeatherPromises = cities.map(async (city) => {


            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb90490440b3de74ade3785de3a316d9`);

            return {
                city: city,
                temperature: kelvinToCelsius(response.data.main.temp),
                feels_like: kelvinToCelsius(response.data.main.feels_like),
                main: response.data.weather[0].main,
                description: response.data.weather[0].description,
            };
            // console.log(response.data);
        
    });
const cityWeatherData = await Promise.all(cityWeatherPromises);

res.send(cityWeatherData);
        } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
}
    
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});