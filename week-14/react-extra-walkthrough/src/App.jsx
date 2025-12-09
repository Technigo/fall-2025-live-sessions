import { Heading } from "./components/Heading";
import { Image } from "./components/Image";

export const App = () => {
  return (
    <>
      <Image src="https://prod-images.tcm.com/Master-Profile-Images/JimCarrey.29569.jpg" />
      <Heading
        variant="h1"
        color="#ff0000"
        onClick={() => console.log("you clicked the Heading!")}
      >
        Welcome to my portfolio!
      </Heading>
      <Heading variant="h2">My name is Lisa</Heading>
      <Heading variant="h3">This is a heading of size 3</Heading>
      <Heading>This is a heading without a variant prop</Heading>
    </>
  );
};
