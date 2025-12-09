// DogFact Component
export const DogFact = (props) => {
  const { fact } = props;
  const factText = fact ? fact.attributes.body : "No facts here";
  // Hint: Extract the 'body' from 'attributes' of the 'fact' prop

  // Hint: Render the 'cleanFact' if available, otherwise show a loading message

  return <div>🐶 {factText}</div>;
};

// Hint: To use this component, import it in your main App component and pass the 'fact' prop to it.
// Example: <DogFact fact={yourFactData} />
