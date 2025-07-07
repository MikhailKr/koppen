import { Paper } from "@mui/material";
import styled from "styled-components";

export const PageContainerStyled = styled(Paper)`
  padding: 40px;
  width: 100%;
  max-width: 600px;
  height: 75vh; /* Высота на 80% от экрана */
  overflow-y: auto; /* Включить вертикальный скролл */
  border-radius: 10px !important;
  align-self: center;
  margin: auto;
`;
