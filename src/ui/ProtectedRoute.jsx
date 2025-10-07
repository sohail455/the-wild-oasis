import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-100);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1)Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //2)if there is no user, navigate to th login
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/login");
    },
    [isLoading, isAuthenticated, navigate]
  );

  //3) load till the user come
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4)if there is a user, application access given
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
