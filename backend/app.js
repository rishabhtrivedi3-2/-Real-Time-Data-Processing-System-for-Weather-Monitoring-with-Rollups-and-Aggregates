// // weather-backend/app.js

// import express from "express"
// import axios from "axios"
// import cors from "cors"

// const app = express();
// const port = 5000; // Backend will run on port 5000

// // Enable CORS to allow requests from the frontend
// app.use(cors());
// app.get("/", async (req, res) => {
//   res.send("server")
// })
// // Example route to get weather data (you can modify it)
// app.get("/api/weather-summary", async (req, res) => {
//   try {
//     const apiKey = process.env.OPENWEATHERMAP_API_KEY;; // Get your API key from OpenWeather
//     const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
//     const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${delhi}&appid=${apiKey}`;



//     const weatherData = await Promise.all(
//       cities.map(async (city) => {
//         const response = await axios.get(apiUrl);
//         console.log(response.json());

//         return {
//           city: city,
//           temperature: response.data.main.temp,
//           main: response.data.weather[0].main,
//           feels_like: response.data.main.feels_like,
//         };
//       })
//     );

//     res.send(weatherData); // Send weather data to the client
//     console.log(weatherData);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch weather data" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Weather app backend is running on http://localhost:${port}`);
// });
