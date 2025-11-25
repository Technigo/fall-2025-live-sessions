import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
  display: flex;

  @media ${(props) => props.theme.breakpoints.mobile} {
    background-color: red;
  }
`;

export const List = (props) => {
  // Interface Props = {
  //   items: React.ReactNode
  // }

  return (
    <StyledUl className="list">
      {props.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </StyledUl>
  );
};
