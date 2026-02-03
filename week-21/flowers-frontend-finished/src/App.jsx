import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import FlowerForm from "./components/FlowerForm";
import ColorFilter from "./components/ColorFilter";
import FlowerGrid from "./components/FlowerGrid";
import LoadingSpinner from "./components/LoadingSpinner";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { API_BASE_URL } from "./constants";

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
      const response = await fetch(`${API_BASE_URL}/flowers`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFlowers(data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
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
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleLogin = (userData) => {
    setUser(userData);

    // Normally one would also set an expiration date for the token
    // and store it in a secure cookie or in a more secure storage.
    // But for now we just store it in localStorage for simplicity.
    localStorage.setItem("user", JSON.stringify(userData));
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
