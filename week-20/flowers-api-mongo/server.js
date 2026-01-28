import express, { response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";

import flowerJson from "./data/flowers.json" with { type: "json" };

// TODO: Replace with MongoDB
// hacky in-memory database
let flowerData = flowerJson;
const mongoUrl = process.env.MONGO_URL; // mongodb://localhost:27017/technigo-flowers. Something like that
mongoose.connect(mongoUrl);

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// TODO: Create Mongoose schema
const flowerSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  scientificName: String,
  botanicalFamily: String,
  color: String,
  isSpotted: {
    type: Boolean,
    default: true,
  },
  scent: String,
  size: {
    type: String,
    enum: ["Small", "Medium", "Large"],
  },
  symbolism: [String],
  lastSpottedTimestamp: {
    type: Date,
    default: Date.now,
  },
});

const Flower = mongoose.model("Flower", flowerSchema);

// TODO: Add seeding of DB
if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Flower.deleteMany();

    flowerData.forEach((flower) => {
      new Flower(flower).save();
    });
  };

  seedDatabase();
}

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);

  res.json({
    message: "Welcome to the Flower API",
    endpoints: endpoints,
  });
});

// TODO: Add Flower.find with query
app.get("/flowers", async (req, res) => {
  const { color, symbol } = req.query;

  const query = {};

  if (color) {
    // TODO: Add capitalization function around color: capitalize(color)
    query.color = color;
  }

  if (symbol) {
    // TODO: Add capitalization function around symbo: capitalize(symbol)
    query.symbolism = symbol;
  }

  // In-code short messages for other developers:
  // NOTE:
  // HACK:
  // TODO:

  try {
    const filteredFlowers = await Flower.find(query);

    if (filteredFlowers.length === 0) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No flowers were found for that query",
      });
    }

    return res.status(200).json({
      success: true,
      response: filteredFlowers,
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      response: [],
      message: error,
    });
  }

  // let filteredFlowers = flowerData;
  // if (color) {
  //   filteredFlowers = filteredFlowers.filter((flower) => {
  //     return flower.color.toLowerCase() === color.toLowerCase();
  //   });
  // }
  // if (symbol) {
  //   filteredFlowers = filteredFlowers.filter((flower) => {
  //     return flower.symbolism.some((word) => {
  //       return word.toLowerCase() === symbol.toLowerCase();
  //     });
  //   });
  // }
  // res.json(filteredFlowers);
});

// TODO: Add Flower findById
app.get("/flowers/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id", id);

  try {
    const flower = await Flower.findById(id);

    if (!flower) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Flower not found",
      });
    }

    return res.status(200).json({
      success: true,
      response: flower,
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      response: null,
      message: error,
    });
  }

  // if (!flower) {
  //   return res
  //     .status(404)
  //     .json({ error: `flower with id ${id} does not exist` });
  // }
  // res.json(flower);
});

// TODO: Create new Flower and save()
app.post("/flowers", async (req, res) => {
  const body = req.body;

  try {
    const newFlower = {
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

    const createdFlower = await new Flower(newFlower).save();

    return res.status(201).json({
      success: true,
      response: createdFlower,
      message: "Flower created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      response: null,
      message: error,
    });
  }

  // flowerData.push(newFlower);
  // res.json(newFlower);
});

// TODO: Add deleteOne() by id (_id)
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
