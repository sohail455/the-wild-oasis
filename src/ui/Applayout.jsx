import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
function Applayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />
      <StyledMain>
        <Container>
          <Outlet />
        </Container>
      </StyledMain>
    </StyledAppLayout>
  );
}

export default Applayout;
