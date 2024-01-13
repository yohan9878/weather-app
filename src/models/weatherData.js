import { Schema, model } from "mongoose";

const weatherDataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  temperature: Number,
  humidity: Number,
});

export default model("WeatherData", weatherDataSchema);
