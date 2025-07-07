import { useCallback } from "react";
import { useGetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetQuery } from "../../shared/api/api";

export function useWindFarmInfo(windFarmId: number) {
  const {
    isLoading,
    isError,
    refetch,
    data: windFarm,
  } = useGetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetQuery({ windFarmId });

  const updateFarmInfo = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return { windFarm, isLoading, isError, updateFarmInfo };
}
