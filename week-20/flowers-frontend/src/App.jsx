import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

// const exampleFlower = {
//   name: "TechnigoFlower",
//   scientificName: "Technis Kunnigus",
//   botanicalFamily: "AIFamily",
//   color: "Pink",
//   isSpotted: false,
//   scent: "Slightly technical",
//   size: "Large",
//   symbolism: ["Tech", "Knowledge", "New Beginnings"],
// };

export const App = () => {
  const [flowers, setFlowers] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("Medium");

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await fetch(`${API_URL}/flowers`);
        if (!res.ok) {
          throw new Error("Something went wrong when fetching the flowers");
        }

        const jsonRes = await res.json();

        if (!jsonRes.success) {
          console.error("an error occured", jsonRes.message);
          return;
        }

        setFlowers(jsonRes.response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlowers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${API_URL}/flowers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          color: color,
          size: size,
        }),
      });

      console.log("res", res);
      if (!res.ok) {
        console.error("something went wrong");
        return;
      }
      const resJson = await res.json();

      if (!resJson.success) {
        console.error(resJson.message);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setColor("");
      setName("");
      setSize("");
    }
  };

  const handleClick = async () => {
    const res = await fetch(`${API_URL}/flowers?color=Red`);
    const jsonRes = await res.json();

    setFlowers(jsonRes);
  };

  const handleFlowerName = (event) => {
    const value = event.target.value;

    setName(value);
  };

  const handleFlowerColor = (event) => {
    const value = event.target.value;

    setColor(value);
  };

  const handleFlowerSize = (event) => {
    const value = event.target.value;

    setSize(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          placeholder="Enter flower name"
          onChange={handleFlowerName}
        />
        <input
          value={color}
          type="text"
          placeholder="Enter flower color"
          onChange={handleFlowerColor}
        />
        <select value={size} onChange={handleFlowerSize}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <button onClick={handleClick}>Get only red flowers</button>

      {flowers.map((flower, index) => (
        <p key={index}>
          {flower.name} : {flower.color}
        </p>
      ))}
    </div>
  );
};
