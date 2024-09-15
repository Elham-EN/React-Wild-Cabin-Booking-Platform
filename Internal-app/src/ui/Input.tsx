import styled from "styled-components";

type InputProps = {
  width?: string;
};

const Input = styled.input<InputProps>`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 0.8rem 1.2rem;
  width: ${(props) => props.width || "200px"};
  font-size: 18px;
`;

export default Input;
