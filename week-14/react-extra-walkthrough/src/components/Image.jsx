import styled from "styled-components";

const StyledImage = styled.img`
  max-width: 100%;
`;

export const Image = (props) => {
  return <StyledImage src={props.src} />;
};
