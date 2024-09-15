import styled from "styled-components";

type InputProps = {
  width?: string;
};

const Textarea = styled.textarea<InputProps>`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: ${(props) => props.width || "100%"};
  height: 8rem;
`;

export default Textarea;
