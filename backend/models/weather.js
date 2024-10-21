// backend/models/Weather.js
import mongoose  from "mongoose";
const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: {
    current: Number,
    min: Number,
    max: Number,
    feels_like: Number
  },
  weather: String,
  timestamp: Date,
  dailySummary: {
    avgTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantWeather: String
  }
});

export default mongoose.model("weather", weatherSchema);
