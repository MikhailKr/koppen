import type { FC, ReactNode } from "react";
import { ReduxProvider } from "../store";
import { AuthProvider } from "./AuthContext";
import { combineProviders } from "../lib/combineComponents";
import { ReferencesProvider } from "./ReferencesContext";

interface AppProviderProps {
  children: ReactNode;
}

const ContextProviders = combineProviders(AuthProvider, ReferencesProvider);

export const AppProvider: FC<AppProviderProps> = ({ children }) => (
  <ReduxProvider>
    <ContextProviders>{children}</ContextProviders>
  </ReduxProvider>
);
