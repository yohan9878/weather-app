import User from "../models/user.js";

// Controller to create a new user
async function createUser(req, res, next) {
  try {
    const { email, location } = req.body;
    const user = await User.create({ email, location });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

// Controller to update user location
async function updateUserLocation(req, res, next) {
  try {
    const { id } = req.params;
    console.log("🚀 ~ updateUserLocation ~ id:", id)
    const { location } = req.body;
    const user = await User.findByIdAndUpdate(id, { location }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export {
  createUser,
  updateUserLocation,
};
