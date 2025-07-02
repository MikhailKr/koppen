import { useState, useEffect } from "react";
import type { WindFarmFormData } from "./WindFarm";

export const useEditWindFarm = (
  id: string,
): { data: WindFarmFormData | null; isLoading: boolean } => {
  const [data, setData] = useState<WindFarmFormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMock = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData({
        id: `123`,
        name: "North Ridge Wind Farm",
        description:
          "Test site in northern region for pilot forecasting model.",
        latitude: 45.4215,
        longitude: -75.6998,
        turbines: [
          { model: "Vestas V150", number: "5" },
          { model: "GE 3.8-137", number: "3" },
        ],
        forecastName: "North Ridge Forecast",
        granularity: "hourly",
        horizon: "7 days",
        updateFrequency: "Daily",
      });
      setIsLoading(false);
    };

    fetchMock();
  }, [id]);

  return { data, isLoading };
};
