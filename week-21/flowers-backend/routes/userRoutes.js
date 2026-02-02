import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

const router = express.Router();
// endpoint is /users

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO create a salt and hash the password with bcrypt
    // TODO check if user exists
    // TODO create user and save to db
    // TODO return success message
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create user",
      response: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO check if user exists
    // TODO compare password
    // TODO return success message
    // TODO handle invalid credentials
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      response: error,
    });
  }
});

// export the router to be used in server.js
export default router;
