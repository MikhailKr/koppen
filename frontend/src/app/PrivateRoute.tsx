import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../shared/contexts/AuthContext";
import { appRoutes } from "./appRoutes";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={appRoutes.login} replace />;
  }

  return children;
};

export default PrivateRoute;
