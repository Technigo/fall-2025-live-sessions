import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// TODO: add documentation of the API here with express-list-endpoints
app.get("/", (req, res) => {
  res.send("Hello Technigooo!");
});

// TODO: add endpoint for getting all flowers
// TODO: add query params to be able to filter on color or symbol

// TODO: add endpoint for getting one flower

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
