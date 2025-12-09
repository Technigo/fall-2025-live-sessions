import styled from "styled-components";

// interface ButtonProps {
//     variant: 'primary' | 'secondary' | 'tertiary';
// }

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors[props.$variant]?.bg};
  border-radius: 8px;
  padding: ${(props) =>
    `${props.theme.spacing.small} ${props.theme.spacing.medium}`};
  color: ${(props) => props.theme.colors[props.$variant]?.text};
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const Button = (props) => {
  return (
    <StyledButton $variant={props.variant} type="button">
      {props.children}
    </StyledButton>
  );
};
