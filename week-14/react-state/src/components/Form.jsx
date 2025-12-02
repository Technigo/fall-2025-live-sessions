import { useState } from "react";

export const Form = () => {
  const [myValue, setValue] = useState("");
  const [radioValue, setRadioValue] = useState("0");

  const handleInputChange = (event) => {
    setValue(event.target.value);

    // const val = event.target.value;
    // console.log("val", val);
    // setValue(val);
  };

  const handleRadioChange = (event) => {
    const val = event.target.value;
    setRadioValue(val);
  };

  const resetValueState = () => {
    setValue("");
    setRadioValue("0");
  };

  return (
    <form>
      <input type="text" value={myValue} onChange={handleInputChange} />

      <input
        type="radio"
        value="0"
        checked={radioValue === "0"}
        onChange={handleRadioChange}
      />

      <input
        type="radio"
        value="1"
        checked={radioValue === "1"}
        onChange={handleRadioChange}
      />

      <p>current value: {myValue}</p>

      <button type="button" onClick={resetValueState}>
        Reset form
      </button>
    </form>
  );
};
