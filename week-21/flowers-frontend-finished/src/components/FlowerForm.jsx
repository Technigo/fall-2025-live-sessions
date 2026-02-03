import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField as Input,
  InputLabel,
  Button,
  Box,
  Select,
} from "@mui/material";
import { API_BASE_URL } from "../constants";

const FlowerForm = ({ onFlowerAdded, loading }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const flowerName = event.target.flowerName.value;
    const flowerColor = event.target.flowerColor.value;
    const flowerSize = event.target.flowerSize.value;

    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch(`${API_BASE_URL}/flowers`, {
        method: "POST",
        body: JSON.stringify({
          name: flowerName,
          color: flowerColor,
          size: flowerSize,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add flower");
      }

      // Reset form
      event.target.reset();

      onFlowerAdded();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Add New Flower</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <InputLabel id="flower-name-label">Flower Name</InputLabel>
          <Input
            slotProps={{
              labelId: "flower-name-label",
            }}
            name="flowerName"
            placeholder="e.g., Rose, Tulip, Daisy"
            required
            fullWidth
          />
          <InputLabel id="flower-color-label">Flower Color</InputLabel>
          <Input
            slotProps={{
              labelId: "flower-color-label",
            }}
            name="flowerColor"
            placeholder="e.g., Red, Blue, Yellow"
            required
            fullWidth
          />
          <InputLabel id="flower-size-label">Flower Size</InputLabel>
          <Select
            labelId="flower-size-label"
            name="flowerSize"
            defaultValue="Medium"
            required
            fullWidth
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </Select>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || isSubmitting}
            sx={{ mt: 2 }}
          >
            Add Flower
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlowerForm;
