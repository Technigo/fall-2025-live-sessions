import styled from "styled-components";
import { AppHeaderNav } from "./components/AppHeaderNav";

const Header = styled.header`
  width: 100%;
`;

export const AppHeader = () => {
  return (
    <Header>
      <AppHeaderNav />
    </Header>
  );
};
