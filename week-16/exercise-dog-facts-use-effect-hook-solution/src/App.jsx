// Import required  hooks
import { useState, useEffect } from "react";
import { DogFact } from "./components/DogFact";

export const App = () => {
  const [facts, setFacts] = useState([]);
  const [visible, setVisible] = useState(true);

  // Hint: Initialize state for storing the dog fact
  // Hint: Define the API endpoint
  // Hint: Create a function to fetch the dog fact
  // Hint: Use the useEffect hook to fetch the dog fact when the component mounts

  useEffect(() => {
    const limit = 5;

    const fetchDogFact = async () => {
      try {
        const response = await fetch(
          `https://dogapi.dog/api/v2/facts?limit=${limit}`,
        );
        const json = await response.json();

        setFacts(json.data);
      } catch (error) {
        console.error("Error fetching dog fact:", error);
      }
    };

    fetchDogFact();
  }, []);

  return (
    <div className="App">
      <h1>Facts about dogs</h1>
      <button onClick={() => setVisible((prev) => !prev)}>Toggle Facts</button>

      {visible &&
        facts.map((fact, index) => <DogFact fact={fact} key={index} />)}
    </div>
  );
};
