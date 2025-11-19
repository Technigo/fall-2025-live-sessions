// const props = {
//   className: "my-heading",
//   myProp: "React prop",
//   children: "React Boilerplate", // Special prop tha always exists when you have an opening and closing tag
// };

import pokemons from "../pokemons.json";
import { Pokemon } from "./components/Pokemon";
import { List } from "./components/List";
import { Typography } from './components/Typography';
import { Card } from "./components/Card";

export const App = () => {
  const listItems = pokemons.map((pokemon, index) => <Pokemon key={index} name={pokemon.name} type={pokemon.type} imgUrl={pokemon.image} />);

  return (
    <>
    <div className="cards">
      <Card 
        iconName="lemon"
        title="Lemon"
        description="This is a really tasty fruit."
        buttonText="Order now"
        variant="primary"
      />
      <Card 
        iconName="rocket"
        title="Rocket"
        description="Join us into the outer space!"
        buttonText="Book seat"
        variant="secondary"
      />
      <Card 
        iconName="dog"
        title="Doggy"
        description="Hello, do you want to be friends?"
        buttonText="Adopt me"
        variant="tertiary"
      />
    </div>

      <Typography className="app-heading" variant="h2" >Pokémon List</Typography>
      <List items={listItems} />
    </>
  )
};
