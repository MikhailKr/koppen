import { useState } from "react";
import type { WindFarmFormData } from "./WindFarm";
import {
  useCreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostMutation,
  useCreateWindFarmWindEnergyUnitsWindFarmsPostMutation,
  type WindFarmCreate,
  type WindFarmForecastCreate,
} from "../../shared/api/api";

const mapFormDataToWindFarmContract = (
  windFarmData: WindFarmFormData,
): WindFarmCreate => ({
  name: windFarmData.name,
  description: windFarmData.description || ``,
  location: {
    longitude: windFarmData.longitude,
    latitude: windFarmData.latitude,
  },
});

// todo: Понять что делать с маппингом
const mapFormDataToForecastContract = (
  windfarmId: number,
  windFarmData: WindFarmFormData,
): WindFarmForecastCreate => ({
  time_resolution: "hour",
  repeat_daily: windFarmData.granularity === "daily",
  // daily_time?: string | null;
  repeat_hourly: windFarmData.granularity === "hourly",
  // hourly_minute?: number | null;
  wind_farm_id: windfarmId,
});

type CreateError = {
  error: boolean;
  message: string;
};

type useCreateFarmResult = {
  createWindFarm: (
    windFarmData: WindFarmFormData,
  ) => Promise<{ isSuccess: boolean }>;
  isLoading: boolean;
  error: CreateError | null;
};

export function useCreateFarm(): useCreateFarmResult {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<CreateError | null>(null);

  const [createWindFarmRequest] =
    useCreateWindFarmWindEnergyUnitsWindFarmsPostMutation();
  const [createForecastRequest] =
    useCreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostMutation();

  const createWindFarm = async (
    windFarmData: WindFarmFormData,
  ): Promise<{ isSuccess: boolean }> => {
    setIsLoading(true);
    try {
      const result = await createWindFarmRequest({
        windFarmCreate: mapFormDataToWindFarmContract(windFarmData),
      });

      if (result.error) {
        setError({
          error: true,
          message: "Error while trying to create wind farm",
        });
        return { isSuccess: false };
      }

      const farmId = result.data.id;

      const forecastResult = await createForecastRequest({
        windFarmForecastCreate: mapFormDataToForecastContract(
          farmId,
          windFarmData,
        ),
        windFarmId: farmId,
      });

      if (forecastResult.error) {
        setError({
          error: true,
          message: "Error while trying to create forecast",
        });
        return { isSuccess: false };
      }

      return { isSuccess: true };
    } catch {
      setError({ error: true, message: "Some error happend :(" });
      return { isSuccess: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { createWindFarm, isLoading, error };
}
