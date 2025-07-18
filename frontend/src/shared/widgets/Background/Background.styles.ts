import { Paper } from "@mui/material";
import styled from "styled-components";
import background from "./background.jpg";

export const BackgroundContainerStyled = styled.div`
  z-index: -1;
  background-image: url(${background});
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  transform-origin: center center;
`;

export const StyledPaper = styled(Paper)`
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  border-radius: 10px !important;
`;
