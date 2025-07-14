import { useCallback } from "react";
import {
  useCreateForecastApiWindEnergyUnitsWindFarmsWindFarmIdForecastsPostMutation,
  type ForecastDb,
} from "../../shared/api/api";
import type { WindFarmForecast } from "./WindFarm";

// todo:
const mapForecast = (
  windFarmId: number,
  forecast: WindFarmForecast,
): ForecastDb => {
  return {
    ...forecast,
    granularity: "60 minutes",
    start_time: forecast.start_time!.toTimeString().slice(0, 5),
    wind_farm_id: windFarmId,
    recipients: [forecast.recipient],
  };
};

export const useCreateOrDeleteForecast = () => {
  const [createForecast, { isLoading: isCreating }] =
    useCreateForecastApiWindEnergyUnitsWindFarmsWindFarmIdForecastsPostMutation();

  const createForecastRequest = useCallback(
    async (windFarmId: number, data: WindFarmForecast) => {
      await createForecast({
        windFarmId,
        windFarmForecastCreate: mapForecast(windFarmId, data),
      }).unwrap();
    },
    [createForecast],
  );

  return {
    createForecastRequest,
    isLoading: isCreating,
  };
};
