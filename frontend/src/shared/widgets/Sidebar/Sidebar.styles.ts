import styled from "styled-components";
import logo from "./logo.png";

export const Logo = styled.div`
  background-image: url(${logo});
  background-size: 75px 50px;
  height: 50px;
  width: 75px;
  top: 94px;
  left: 32px;
`;

export const MyWindFarmsButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 12px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }

  &:focus {
    outline: none;
  }
`;

export const WindFarmsIcon = styled.img`
  width: 56px;
  height: 56px;
`;
