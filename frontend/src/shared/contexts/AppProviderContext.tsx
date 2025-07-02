import type { FC, ReactNode } from "react";
import { ReduxProvider } from "../store";
import { AuthProvider } from "./AuthContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => (
  <ReduxProvider>
    <AuthProvider>{children}</AuthProvider>
  </ReduxProvider>
);
