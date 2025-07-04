import { useCallback } from "react";
import {
  useCreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostMutation,
  type ForecastDb,
} from "../../shared/api/api";

// todo: удаление прогноза
export const useCreateOrDeleteForecast = () => {
  const [createForecast, { isLoading: isCreating }] =
    useCreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostMutation();

  const createForecastRequest = useCallback(
    async (data: ForecastDb) => {
      await createForecast({
        windFarmId: data.wind_farm_id,
        windFarmForecastCreate: data,
      }).unwrap();
    },
    [createForecast],
  );

  return {
    createForecastRequest,
    isLoading: isCreating,
  };
};
