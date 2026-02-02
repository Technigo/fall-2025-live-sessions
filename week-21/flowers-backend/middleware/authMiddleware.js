import { User } from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  try {
    // TODO check if user is authenticated
    // TODO if not, return 401
    // TODO if yes, continue to next middleware
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
