import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
const StyledHeaderMenu = styled.ul`
  display: felx;
  gap: "4px";
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu onClick={() => navigate("/account")}>
      <ButtonIcon>
        <HiOutlineUser />
      </ButtonIcon>
      <Logout />
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
