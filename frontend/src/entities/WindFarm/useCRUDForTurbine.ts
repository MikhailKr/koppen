import { useCallback } from "react";
import {
  useCreateWindFleetWindEnergyUnitsWindTurbineFleetsPostMutation,
  useDeleteWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteMutation,
  useUpdateWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchMutation,
  type WindTurbineFleetDb,
} from "../../shared/api/api";

export const useCRUDForTurbine = () => {
  const [createTurbine, { isLoading: isCreating }] =
    useCreateWindFleetWindEnergyUnitsWindTurbineFleetsPostMutation();

  const [updateTurbine, { isLoading: isUpdating }] =
    useUpdateWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchMutation();

  const [removeTurbine, { isLoading: isDeleting }] =
    useDeleteWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteMutation();

  const saveTurbine = useCallback(
    async (data: WindTurbineFleetDb) => {
      if (data.id) {
        await updateTurbine({
          windFleetId: data.id,
          windTurbineFleetUpdate: {
            wind_turbine_id: data.wind_turbine?.id,
            number_of_turbines: data.number_of_turbines,
          },
        }).unwrap();
      } else {
        await createTurbine({
          windTurbineFleetCreate: {
            number_of_turbines: data.number_of_turbines,
            wind_turbine_id: data.wind_turbine!.id,
          },
        }).unwrap();
      }
    },
    [createTurbine, updateTurbine],
  );

  const deleteTurbine = useCallback(async (turbineFleetId: number) => {
    await removeTurbine({
      windFleetId: turbineFleetId,
    }).unwrap();
  }, []);

  return {
    saveTurbine,
    deleteTurbine,
    isLoading: isCreating || isUpdating || isDeleting,
  };
};
