import React, { createContext, useContext } from "react";
import {
  useGetPowerCurvesWindEnergyUnitsPowerCurvesGetQuery,
  useGetWindTurbinesWindEnergyUnitsWindTurbinesGetQuery,
  type PowerCurveDb,
  type WindTurbineDb,
} from "../api/api";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../app/appRoutes";

type ReferencesContextType = {
  turbines: WindTurbineDb[] | undefined;
  powerCurves: PowerCurveDb[] | undefined;
};

const ReferencesContext = createContext<ReferencesContextType | undefined>(
  undefined,
);

export const ReferencesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === appRoutes.login;

  const { data: turbines } =
    useGetWindTurbinesWindEnergyUnitsWindTurbinesGetQuery(undefined, {
      skip: isLoginPage,
    });

  const { data: powerCurves } =
    useGetPowerCurvesWindEnergyUnitsPowerCurvesGetQuery(undefined, {
      skip: isLoginPage,
    });

  const contextValue = {
    turbines,
    powerCurves,
  };

  return (
    <ReferencesContext.Provider value={contextValue}>
      {children}
    </ReferencesContext.Provider>
  );
};

export const useReferences = () => {
  const context = useContext(ReferencesContext);
  if (!context) {
    throw new Error("useReferences must be used within a ReferencesProvider");
  }
  return context;
};
