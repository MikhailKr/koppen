import { useGetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetQuery } from "../../shared/api/api";

export function useWindFarmInfo(windFarmId: number) {
  const {
    isLoading,
    isError,
    data: windFarm,
  } = useGetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetQuery({ windFarmId });

  return { windFarm, isLoading, isError };
}
