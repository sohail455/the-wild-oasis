import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const menuContext = createContext();

function Menus({ children }) {
  const [openName, setOpenName] = useState("");
  const [pos, setPos] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <menuContext.Provider value={{ openName, close, open, pos, setPos }}>
      {children}
    </menuContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { close, open, openName, setPos } = useContext(menuContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    console.log(rect);
    setPos({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    });
    if (openName === id) close();
    else open(id);
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiDotsVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openName, pos, close } = useContext(menuContext);
  const ref = useOutsideClick(close);
  if (id !== openName) return;
  return createPortal(
    <StyledList position={pos} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, onClick, icon }) {
  const { close } = useContext(menuContext);
  function handleOnClick() {
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handleOnClick}>
      <span>{icon}</span>
      {children}
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
