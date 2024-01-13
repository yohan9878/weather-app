import { Router } from "express";
import {
  createUser,
  updateUserLocation,
} from "../controllers/userController.js";

const router = Router();

// Route to create a new user
router.post("/store", createUser);
// Route to update user location
router.put("/update-location/:id", updateUserLocation);

export default router;
