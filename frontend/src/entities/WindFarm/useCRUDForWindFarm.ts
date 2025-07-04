import { useCallback } from "react";
import {
  useUpdateWindFarmWindEnergyUnitsWindFarmsWindFarmIdPatchMutation,
  useDeleteWindFarmWindEnergyUnitsWindFarmsWindFarmIdDeleteMutation,
  type WindFarmUpdate,
} from "../../shared/api/api";

export const useCRUDForWindFarm = () => {
  const [updateWindFarm, { isLoading: isUpdating }] =
    useUpdateWindFarmWindEnergyUnitsWindFarmsWindFarmIdPatchMutation();

  const [removeWindFarm, { isLoading: isDeleting }] =
    useDeleteWindFarmWindEnergyUnitsWindFarmsWindFarmIdDeleteMutation();

  const editWindFarm = useCallback(
    async (windFarmId: number, data: WindFarmUpdate) => {
      await updateWindFarm({
        windFarmId: windFarmId,
        windFarmUpdate: data,
      }).unwrap();
    },
    [updateWindFarm],
  );

  const deleteWindFarm = useCallback(
    async (windFarmId: number) => {
      try {
        await removeWindFarm({ windFarmId }).unwrap();

        return { isSuccess: true };
      } catch {
        return { isSuccess: false };
      }
    },
    [removeWindFarm],
  );

  return {
    editWindFarm,
    deleteWindFarm,
    isLoading: isUpdating || isDeleting,
  };
};
