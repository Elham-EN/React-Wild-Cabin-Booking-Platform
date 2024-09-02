import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button/Button";
import Input from "./ui/Input";
import Heading from "./ui/Headers/Heading";
import Row from "./ui/Layouts/Row";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row>
            <Heading color="blue" as="h1">
              The Wild Oasis
            </Heading>
            <div>
              <Heading color="red" as="h2">
                Check in and out
              </Heading>

              <Button
                size="large"
                variation="primary"
                onClick={() => alert("You have checked in")}
              >
                Check In
              </Button>
              <Button
                size="large"
                variation="secondary"
                onClick={() => alert("You have checked Out")}
              >
                Check Out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading color="red" as="h2">
              Form
            </Heading>
            <form>
              <Input type="number" placeholder="Number of guest" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
