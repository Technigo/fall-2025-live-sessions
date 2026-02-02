import "dotenv/config";
import cors from "cors";
import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import flowerRoutes from "./routes/flowerRoutes.js";

const port = process.env.PORT || 8080;
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/flowers-database";

console.log("Starting server... With Mongo URL:", mongoUrl);

mongoose.connect(mongoUrl);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    message: "Welcome to the Flower API",
    endpoints: endpoints,
  });
});

// These are the connections to the different routes with endpoints
app.use("/users", userRoutes);
app.use("/flowers", flowerRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
