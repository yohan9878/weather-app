import axios from "axios";
import User from "../models/user.js";
import cron from "node-cron";
import { sendEmail } from "../services/emailService.js";


async function getWeatherDataFromOpenWeatherMap(location) {
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
}
async function getWeatherData(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const weatherData = await getWeatherDataFromOpenWeatherMap(user.location);
    user.weatherData = weatherData;
    await user.save();
    res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function sendHourlyWeatherReports() {
  try {
    const users = await User.find();

    for (const user of users) {
      const weatherData = await getWeatherDataFromOpenWeatherMap(user.location);

      const mailOptions = {
        to: user.email,
        subject: "Hourly Weather Report",
        text: `Weather Report for ${user.location}: ${JSON.stringify(
          weatherData
        )}`,
      };

      await sendEmail(mailOptions);
    }

    console.log("Hourly weather reports sent successfully");
  } catch (error) {
    console.error("Failed to send hourly weather reports", error);
  }
}

// Schedule the function to run every 3 hours
cron.schedule("0 */3 * * *", () => {
  sendHourlyWeatherReports();
});

export { getWeatherData, sendHourlyWeatherReports };
