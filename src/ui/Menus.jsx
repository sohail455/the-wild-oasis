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
  const [pos, setPos] = useState(null);
  const open = (id) => {
    console.log(id);
    setOpenName(id);
  };
  const close = () => {
    console.log("CLOSING!");
    setOpenName("");
  };

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
  console.log(openName);
  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    setPos({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    });

    openName === "" || openName !== id ? open(id) : close();
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
  if (id !== openName) {
    return null;
  }
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
    console.log("menu button: onclick");
    onClick?.();
  }
  return (
    <StyledButton
      onClick={() => {
        handleOnClick();
        close();
      }}
    >
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
