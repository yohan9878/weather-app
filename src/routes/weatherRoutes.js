import { Router } from "express";
import {
  getWeatherData,
  sendHourlyWeatherReports,
} from "../controllers/weatherController.js";

const router = Router();

// Retrieves weather data for a given day for a specific user.
router.get("/weather-data/:id", getWeatherData);
// Sends hourly weather reports to users' emails every 3 hours
router.post("/weather-reports/send", sendHourlyWeatherReports);

export default router;
