import express from "express";
import { Flower } from "../models/Flower.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();
// endpoint is /flowers

router.get("/", async (req, res) => {
  const { color, symbol } = req.query;

  const query = {};

  if (color) {
    query.color = color;
  }

  if (symbol) {
    query.symbolism = symbol;
  }

  try {
    const filteredFlowers = await Flower.find(query);

    if (filteredFlowers.length === 0) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No flowers found for that query. Try another one.",
      });
    }
    res.status(200).json({
      success: true,
      response: filteredFlowers,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch flowers",
    });
  }
});

// sort flowers based on name
router.get("/sort", async (req, res) => {
  const { name } = req.query;

  //localhost:8080/flowers/sort?name=asc
  //localhost:8080/flowers/sort?name=desc

  const sortCriteriaAsc = { name: "asc" };
  //const sortCriteriaDesc = {name: "desc"}

  try {
    const sortedFlowers = await Flower.find().sort(sortCriteriaAsc);

    if (sortedFlowers.length === 0) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No flowers found for that query. Try another one.",
      });
    }
    res.status(200).json({
      success: true,
      response: sortedFlowers,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch flowers",
    });
  }
});

// get one flower based on id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //localhost:8080/flowers/${id}

  try {
    const flower = await Flower.findById(id);

    if (!flower) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Flower not found",
      });
    }

    res.status(200).json({
      success: true,
      response: flower,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Flower couldn't be found",
    });
  }
});

// Create/Save a flower to the db
router.post("/", authenticateUser, async (req, res) => {
  const { name, color } = req.body;

  try {
    const newFlower = await new Flower({ name, color }).save();

    res.status(201).json({
      success: true,
      response: newFlower,
      message: "Flower created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      // Be careful when returning error messages to the client,
      // so that you don't expose sensitive information
      response: error,
      message: "Couldn't create flower",
    });
  }
});

// Update flower name
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const editFlower = await Flower.findByIdAndUpdate(
      id,
      { name: name },
      { new: true, runValidators: true },
    );

    if (!editFlower) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Flower not found",
      });
    }

    res.status(201).json({
      success: true,
      response: editFlower,
      message: "Flower updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      // Be careful when returning error messages to the client,
      // so that you don't expose sensitive information
      response: err,
      message: "Error editing flower",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlower = await Flower.findByIdAndDelete(id);

    if (!deletedFlower) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Flower not found",
      });
    }

    res.status(200).json({
      success: true,
      response: deletedFlower,
      message: "Flower deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Error deleting flower",
    });
  }
});

export default router;
