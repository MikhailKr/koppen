import type { FC, ReactNode } from "react";
import { BackgroundContainerStyled, Logo } from "./Background.styles";

interface BackgroundProps {
  children: ReactNode;
}

export const Background: FC<BackgroundProps> = ({ children }) => {
  return (
    <BackgroundContainerStyled>
      <Logo />
      {children}
    </BackgroundContainerStyled>
  );
};
