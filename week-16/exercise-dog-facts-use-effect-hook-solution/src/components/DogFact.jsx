import { useEffect } from "react";

// DogFact Component
export const DogFact = (props) => {
  const { fact } = props;
  const cleanFact = fact ? fact.attributes.body : "No facts here";
  // Hint: Extract the 'body' from 'attributes' of the 'fact' prop
  //
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Interval executed");
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Hint: Render the 'cleanFact' if available, otherwise show a loading message

  return <div>🐶 {cleanFact}</div>;
};

// Hint: To use this component, import it in your main App component and pass the 'fact' prop to it.
// Example: <DogFact fact={yourFactData} />
