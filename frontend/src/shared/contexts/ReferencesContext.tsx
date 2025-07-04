import React, { createContext, useContext } from "react";
import {
  useGetPowerCurvesWindEnergyUnitsPowerCurvesGetQuery,
  useGetWindTurbinesWindEnergyUnitsWindTurbinesGetQuery,
  type PowerCurveDb,
  type WindTurbineDb,
} from "../api/api";

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
  const { data: turbines } =
    useGetWindTurbinesWindEnergyUnitsWindTurbinesGetQuery();

  const { data: powerCurves } =
    useGetPowerCurvesWindEnergyUnitsPowerCurvesGetQuery();

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
