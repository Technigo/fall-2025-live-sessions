import express from "express";
import cors from "cors";
import "dotenv/config";
import listEndpoints from "express-list-endpoints";

import flowerJson from "./data/flowers.json" with { type: "json" };

// hacky in-memory database
let flowerData = flowerJson;

// how to import large files:
// import { readFileSync } from 'fs'
// const jsonFile = readFileSync('./data/flowers.json', 'utf8')
// const flowerData = JSON.parse(jsonFile)

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// TODO: add documentation of the API here with express-list-endpoints
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  console.log("mongo", process.env.MONGO_URL);

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

app.post("/flowers", (req, res) => {
  const body = req.body;

  // 1. validation on the body that we will add to the DB.
  // 2. if the validation does not go through, then respond with an error.
  // 3. create a unique ID, not just take the length of the db entries.

  const newFlower = {
    id: flowerData.length + 1,
    name: body.name,
    scientificName: body.scientificName,
    botanicalFamily: body.botanicalFamily,
    color: body.color,
    isSpotted: body.isSpotted,
    scent: body.scent,
    size: body.size,
    symbolism: body.symbolism,
    lastSpottedTimestamp: body.lastSpottedTimestamp,
  };

  flowerData.push(newFlower);

  res.json(newFlower);
});

app.delete("/flowers/:id", (req, res) => {
  const id = req.params.id;
  const flower = flowerData.find((flower) => Number(flower.id) === Number(id));

  if (!flower) {
    return res
      .status(404)
      .json({ error: `flower with id ${id} does not exist` });
  }

  const newFlowers = flowerData.filter(
    (flower) => Number(flower.id) !== Number(id),
  );

  flowerData = newFlowers;

  res.json(flower);
});

// Create a PUT method
app.put("/flowers/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const index = flowerData.findIndex(
    (flower) => Number(flower.id) === Number(id),
  );

  // let lalaArray = ['a', 'b', 'c'] // Length 3
  // // 'a' is on index 0
  // // 'b' is on index 1
  // // 'c' is on index 2
  // lalaArray[0] = 'something else'
  // console.log(lalaArray) // ['something else', 'b', 'c'] // Length 3

  flowerData[index] = {
    id: id,
    name: body.name,
    scientificName: body.scientificName,
    botanicalFamily: body.botanicalFamily,
    color: body.color,
    isSpotted: body.isSpotted,
    scent: body.scent,
    size: body.size,
    symbolism: body.symbolism,
    lastSpottedTimestamp: body.lastSpottedTimestamp,
  };

  res.json(flowerData[index]);
});

function giveCorrectField(field, body, oldValue) {
  return body[field] !== undefined ? body[field] : oldValue[field];
}

app.patch("/flowers/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  flowerData = flowerData.map((flower) => {
    if (Number(flower.id) !== Number(id)) {
      return flower;
    }

    const newFlower = {
      ...flower,
      id: id,
      name: giveCorrectField("name", body, flower),
      scientificName: giveCorrectField("scientificName", body, flower),
      botanicalFamily: giveCorrectField("botanicalFamily", body, flower),
      color: giveCorrectField("color", body, flower),
      isSpotted: giveCorrectField("isSpotted", body, flower),
      scent: giveCorrectField("scent,", body, flower),
      size: giveCorrectField("size", body, flower),
      symbolism: giveCorrectField("symbolism", body, flower),
      lastSpottedTimestamp: giveCorrectField(
        "lastSpottedTimestamp",
        body,
        flower,
      ),
    };

    return newFlower;
  });

  const updatedFlower = flowerData.find(
    (flower) => Number(flower.id) !== Number(id),
  );

  res.json(updatedFlower);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
