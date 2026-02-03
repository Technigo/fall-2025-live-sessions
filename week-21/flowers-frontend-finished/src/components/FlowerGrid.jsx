import { Typography, Grid, Box } from "@mui/material";
import FlowerCard from "./FlowerCard";

const FlowerGrid = ({ onFlowerUpdate, flowers, colorFilter }) => {
  if (flowers.length === 0) {
    return (
      <Typography>
        {colorFilter
          ? `No ${colorFilter.toLowerCase()} flowers found`
          : "No flowers in the garden yet"}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h5">
        {colorFilter ? `${colorFilter} Flowers` : "All Flowers"} (
        {flowers.length})
      </Typography>
      <Grid container spacing={2}>
        {flowers.map((flower, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3, xl: 3 }} key={index}>
            <FlowerCard flower={flower} onFlowerUpdate={onFlowerUpdate} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlowerGrid;
