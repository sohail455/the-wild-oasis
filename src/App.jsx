import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: orange;
  padding: 20px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: var(--color-grey-0);
  padding: 0.8 1.2rem;
  box-shadow: var(--shadow-sm);
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <H1>soahil</H1>
        <Button onClick={() => alert("check in")}>check in</Button>
        <Button onClick={() => alert("check out")}>check out</Button>
        <Input placeholder="Number Of Guests" />
        <Input placeholder="Number Of Cabinets" />
      </StyledApp>
    </>
  );
}

export default App;
