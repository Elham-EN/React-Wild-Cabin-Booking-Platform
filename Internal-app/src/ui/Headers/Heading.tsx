import styled from "styled-components";

type HeadingLevel = "h1" | "h2" | "h3";

interface HeaderProps {
  as?: HeadingLevel;
  color?: string;
}

const fontSize: { [K in HeadingLevel]: string } = {
  h1: "3rem",
  h2: "2rem",
  h3: "1.5rem",
};

const fontWeight: { [K in HeadingLevel]: number } = {
  h1: 600,
  h2: 600,
  h3: 500,
};

//using styled.h1.attrs() to set the 'as' prop and its default value.
const Heading = styled.h1.attrs<HeaderProps>(({ as = "h1" }) => ({
  as,
}))<HeaderProps>`
  font-size: ${(props) => fontSize[props.as as HeadingLevel]};
  font-weight: ${(props) => fontWeight[props.as as HeadingLevel]};
  color: ${(props) => props.color || "#333"};
  line-height: 1.2;
`;

export default Heading;
