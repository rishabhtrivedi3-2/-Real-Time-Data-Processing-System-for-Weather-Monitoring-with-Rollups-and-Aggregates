import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchWeatherData = async (data) => {

            const response = await axios.get("http://localhost:5000"); // Replace "delhi" with your desired city
            setWeatherData(response.data);
            generateChartData(weatherData);
        }

        fetchWeatherData();
    }, []);
    console.log(weatherData)
    if (!weatherData) {
        return <p>Loading weather data...</p>;
    }
    const generateChartData = (data) => {

        // const cities = data.map(item => item.city);
        // const avgTemps = data.map(item => item.average_temp);
        // const maxTemps = data.map(item => item.max_temp);
        // const minTemps = data.map(item => item.min_temp);

        // setChartData({
        //   labels: cities,
        //   datasets: [
        //     {
        //       label: "Average Temperature (°C)",
        //       data: avgTemps,
        //       backgroundColor: "rgba(75, 192, 192, 0.2)",
        //       borderColor: "rgba(75, 192, 192, 1)",
        //       borderWidth: 1,
        //     },
        //     {
        //       label: "Max Temperature (°C)",
        //       data: maxTemps,
        //       backgroundColor: "rgba(255, 99, 132, 0.2)",
        //       borderColor: "rgba(255, 99, 132, 1)",
        //       borderWidth: 1,
        //     },
        //     {
        //       label: "Min Temperature (°C)",
        //       data: minTemps,
        //       backgroundColor: "rgba(54, 162, 235, 0.2)",
        //       borderColor: "rgba(54, 162, 235, 1)",
        //       borderWidth: 1,
        //     },
        //   ],
        // });
    };
    return (
        <>

            <h1>fsljn2</h1>
        </>
    );
};

export default WeatherDashboard;