import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

export const App = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await fetch(`${API_URL}/flowers`);
        if (!res.ok) {
          throw new Error("Something went wrong when fetching the flowers");
        }

        const jsonRes = await res.json();
        setFlowers(jsonRes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlowers();
  }, []);

  const handleClick = async () => {
    const res = await fetch(`${API_URL}/flowers?color=red`);
    const jsonRes = await res.json();

    setFlowers(jsonRes);
  };

  return (
    <div>
      <button onClick={handleClick}>Get only red flowers</button>

      {flowers.map((flower, index) => (
        <p key={index}>
          {flower.name} : {flower.color}
        </p>
      ))}
    </div>
  );
};
