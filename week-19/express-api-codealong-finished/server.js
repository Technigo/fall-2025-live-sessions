import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import flowerData from "./data/flowers.json" with { type: "json" };

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// TODO: add documentation of the API here with express-list-endpoints
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);

  // res.send("Hello Technigooo!");
  res.json({
    message: "Welcome to the Flower API",
    endpoints: endpoints,
  });
});

// TODO: add endpoint for getting all flowers
// TODO: add query params to be able to filter on color or symbol
app.get("/flowers", (req, res) => {
  const { color, symbol } = req.query;

  let filteredFlowers = flowerData;

  if (color) {
    filteredFlowers = filteredFlowers.filter((flower) => {
      return flower.color.toLowerCase() === color.toLowerCase();
    });
  }

  if (symbol) {
    filteredFlowers = filteredFlowers.filter((flower) => {
      return flower.symbolism.some((word) => {
        return word.toLowerCase() === symbol.toLowerCase();
      });
    });
  }

  res.json(filteredFlowers);
});

// http://localhost:8080/flowers?color=red&symbol=passion
// http://localhost:8080/flowers/2

// TODO: add endpoint for getting one flower
app.get("/flowers/:id", (req, res) => {
  const id = req.params.id;
  const flower = flowerData.find((flower) => Number(flower.id) === Number(id));

  if (!flower) {
    return res
      .status(404)
      .json({ error: `flower with id ${id} does not exist` });
  }

  res.json(flower);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
