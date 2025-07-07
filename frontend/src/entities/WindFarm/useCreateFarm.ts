import { useState } from "react";
import type { WindFarmFormData } from "./WindFarm";
import {
  useCreateWindFarmWindEnergyUnitsWindFarmsPostMutation,
  type WindFarmCreate,
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
  forecasts: [windFarmData.forecast],
  wind_turbine_fleet: windFarmData.turbines.map((x) => ({
    wind_turbine_id: x.modelId,
    number_of_turbines: x.number,
  })),
});

type CreateError = {
  error: boolean;
  message: string;
};

type useCreateFarmResult = {
  createWindFarm: (
    // eslint-disable-next-line no-unused-vars
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
