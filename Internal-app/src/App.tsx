import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button/Button";
import Input from "./ui/Input";
import Heading from "./ui/Headers/Heading";

const StyledApp = styled.main`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 20px;
`;

const HorizontalFlex = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 16px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading color="blue" as="h2">
          The Wild Oasis
        </Heading>
        <Heading color="red" as="h3">
          The Wild Oasis
        </Heading>
        <HorizontalFlex>
          <Button $color="green" onClick={() => alert("You have checked in")}>
            Check In
          </Button>
          <Button $color="red" onClick={() => alert("You have checked Out")}>
            Check Out
          </Button>
          <Button onClick={() => alert("You have checked Out")}>Cancel</Button>
        </HorizontalFlex>
        <Input type="number" placeholder="Number of guest" />
      </StyledApp>
    </>
  );
}

export default App;
