import { pokemons } from "../pokemons.json";

// const props = {
//   className: "my-heading",
//   myProp: "React prop",
//   children: "React Boilerplate", // Special prop tha always exists when you have an opening and closing tag
// };

/// Whiteboard above, not apart of the application /////

import { MyHeading } from "./MyHeading";

export const App = () => {
  const myPropValue = "React prop";
  console.log("Pokemons", pokemons);

  return (
    <MyHeading className="my-heading" myProp={myPropValue}>
      {pokemons.map((pokemon, index) => {
        return <p key={index}>{pokemon.name}</p>;
      })}
    </MyHeading>
  );
};
