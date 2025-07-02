import { useState, useEffect } from "react";
import { useForecasts } from "../Forecasts/useForecasts";
import type { WindFarmFormData } from "./WindFarm";

export function useWindFarmInfo(windFarmId: string) {
  const [data, setData] = useState<WindFarmFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: forecasts, isLoading: isForecastsLoading } =
    useForecasts(windFarmId);

  useEffect(() => {
    setIsLoading(true);

    // Моковая загрузка данных о ферме
    setTimeout(() => {
      setData({
        id: windFarmId,
        name: "Mock Wind Farm",
        description: "Test wind farm for demo",
        latitude: 45.1234,
        longitude: -93.1234,
        turbines: [
          { model: "Vestas V90", number: "T-001" },
          { model: "Vestas V90", number: "T-002" },
        ],
        forecastName: "MockForecast",
        granularity: "hourly",
        horizon: "24h",
        updateFrequency: "1h",
      });
      setIsLoading(false);
    }, 1000);
  }, [windFarmId]);

  return { data, isLoading, forecasts, isForecastsLoading };
}
