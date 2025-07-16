import { useGetForecastHistoryApiForecastHistoryWindFarmIdGetQuery } from "../../shared/api/api";

export const useForecastHistory = (windFarmId: number, _forecastId?: number) => {
  const {
    isLoading,
    isError,
    data: forecastHistory,
  } = useGetForecastHistoryApiForecastHistoryWindFarmIdGetQuery({
    windFarmId,
  });

  return { isLoading, isError, forecastHistory };
};
