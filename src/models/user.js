import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  weatherData: { type: Object, default: {} },
});

export default model("User", userSchema);
