import { useCallback } from "react";
import { useGetWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdGetQuery } from "../../shared/api/api";

export function useWindFarmInfo(windFarmId: number) {
  const {
    isLoading,
    isError,
    refetch,
    data: windFarm,
  } = useGetWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdGetQuery({
    windFarmId,
  });

  const updateFarmInfo = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return { windFarm, isLoading, isError, updateFarmInfo };
}
