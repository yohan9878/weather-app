import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes

import userRoutes from "./src/routes/userRoutes.js";
import weatherRoutes from "./src/routes/weatherRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/weather", weatherRoutes);

// Error handler
//app.use(require('./src/utils/errorHandler'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
