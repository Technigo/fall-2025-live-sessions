import { useState } from "react";
import { Form } from "./components/Form";
import "./App.css";

// const myArray = ['1', '2', '3', '4']
// const [a, b, c, d] = myArray

function App() {
  const [count, setCount] = useState(0);

  const handleOnClickInCorrect = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    console.log("count", count);
  };

  const handleOnClickCorrect = () => {
    setCount((prevState) => {
      console.log("previous State", prevState);
      return prevState + 1;
    });

    setCount((prevState) => prevState + 1);
    setCount((prevState) => prevState + 1);

    console.log("correct count", count);
  };

  return (
    <>
      <div>
        <h2>Form example:</h2>
        <Form />

        {/* <div style={{ marginTop: 80 }}>
          <h2>Count example:</h2>
          <p>{count}</p>
          <button type="button" onClick={handleOnClickInCorrect}>
            Click me to maybe add 3!
          </button>

          <button type="button" onClick={handleOnClickCorrect}>
            Click me the correct way to add 3!
          </button>
        </div>*/}
      </div>
    </>
  );
}

export default App;
