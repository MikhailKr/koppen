import type { WindFarm } from "./WindFarm";
import { useGetWindFarmsApiWindEnergyUnitsWindFarmsGetQuery } from "../../shared/api/api";

const mapWindFarmListData = (data: any): WindFarm[] => {
  return data as WindFarm[];
};

export const useWindFarmsList = (): {
  windFarms: WindFarm[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { isLoading, windFarms, isError } =
    useGetWindFarmsApiWindEnergyUnitsWindFarmsGetQuery(undefined, {
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data, isLoading, isError }) => ({
        windFarms: mapWindFarmListData(data),
        isLoading,
        isError,
      }),
    });

  return { windFarms, isLoading, isError };
};
