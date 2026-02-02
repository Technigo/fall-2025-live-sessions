import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import FlowerForm from "./components/FlowerForm";
import ColorFilter from "./components/ColorFilter";
import FlowerGrid from "./components/FlowerGrid";
import LoadingSpinner from "./components/LoadingSpinner";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import "./App.css";

function App() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colorFilter, setColorFilter] = useState("");
  const [user, setUser] = useState(null);

  const filteredFlowers = colorFilter
    ? flowers.filter((flower) => flower.color === colorFilter)
    : flowers;

  const availableColors = [...new Set(flowers.map((flower) => flower.color))];

  const fetchFlowers = async () => {
    setLoading(true);
    try {
      // TODO: get flowers from API and set in state
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
    // TODO: get user from localStorage and set user state
  }, []);

  const handleColorFilterChange = (event) => {
    setColorFilter(event.target.value);
  };

  const handleFlowerAdded = () => {
    fetchFlowers();
  };

  const handleFlowerUpdated = async (updatedFlower) => {
    if (!updatedFlower) {
      await fetchFlowers();
      return;
    }

    setFlowers((prevFlowers) =>
      prevFlowers.map((flower) =>
        flower._id === updatedFlower._id ? updatedFlower : flower,
      ),
    );
  };

  const handleLogout = () => {
    // TODO handle logout
  };

  const handleLogin = (userData) => {
    // TODO: handle login
  };

  if (loading && flowers.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className="auth-container">
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Welcome, {user.email}!</Typography>
            <Button className="logout-button" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <SignupForm handleLogin={handleLogin} />
            <LoginForm handleLogin={handleLogin} />
          </>
        )}
      </div>

      <FlowerForm onFlowerAdded={handleFlowerAdded} loading={loading} />

      <ColorFilter
        colorFilter={colorFilter}
        availableColors={availableColors}
        onColorChange={handleColorFilterChange}
      />

      <FlowerGrid
        flowers={filteredFlowers}
        colorFilter={colorFilter}
        onFlowerUpdate={handleFlowerUpdated}
      />
    </Container>
  );
}

export default App;
