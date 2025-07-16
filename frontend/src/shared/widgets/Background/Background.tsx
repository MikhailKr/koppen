import type { FC, ReactNode } from "react";
import { BackgroundContainerStyled } from "./Background.styles";

interface BackgroundProps {
  children: ReactNode;
}

export const Background: FC<BackgroundProps> = ({ children }) => {
  return <BackgroundContainerStyled>{children}</BackgroundContainerStyled>;
};
