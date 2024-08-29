import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

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

const H1 = styled.h1`
  font-size: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: var(--color-brand-50);
  background-color: var(--color-brand-500);
  border: 1px solid;
  border-color: black;
  padding: 10px;
  text-align: center;
  width: 600px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
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
