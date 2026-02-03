import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { getSizeChipColor } from "../utils/flowerUtils";
import { API_BASE_URL } from "../constants";

const styles = {
  card: {
    width: 200,
    height: 200,
    mx: "auto",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  chipContainer: {
    display: "flex",
    gap: 1,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  colorChip: {
    fontWeight: "bold",
  },
  sizeChip: {
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.08)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.12)",
    },
  },
};

const FlowerCard = ({ flower, onFlowerUpdate }) => {
  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/flowers/${flower._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flower");
      }

      const resJson = await response.json();
      const resFlower = resJson.response;

      const newName = prompt("Edit the flower name:", resFlower.name);

      if (!newName) return;

      const updateResponse = await fetch(
        `${API_BASE_URL}/flowers/${flower._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        },
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update flower");
      }

      const updatedFlower = await updateResponse.json();
      onFlowerUpdate(updatedFlower.response);
    } catch (err) {
      console.error("Error editing flower:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/flowers/${flower._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete flower");
      }

      onFlowerUpdate();
    } catch (err) {
      console.error("Error deleting flower:", err);
    }
  };

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.content}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            lineBreak: "anywhere",
          }}
        >
          {flower.name}
          <button className="edit-button" onClick={handleEdit}>
            ✏️
          </button>
          <button className="delete-button" onClick={handleDelete}>
            🗑️
          </button>
        </Typography>

        <Box sx={styles.chipContainer}>
          <Chip
            label={flower.color}
            color="primary"
            variant="outlined"
            sx={styles.colorChip}
          />
          {flower.size && (
            <Chip
              label={flower.size}
              variant="filled"
              sx={{
                ...styles.sizeChip,
                color: getSizeChipColor(flower.size),
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlowerCard;
