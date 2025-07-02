import { useEffect, useState } from "react";
import type { ForecastData } from "./Forecast";

export function useForecasts(windFarmId: string) {
  const [data, setData] = useState<ForecastData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Эмуляция загрузки с бэка
    setTimeout(() => {
      setData([
        { timestamp: "2025-06-27T00:00:00Z", powerOutput: 10 },
        { timestamp: "2025-06-27T01:00:00Z", powerOutput: 12 },
        { timestamp: "2025-06-27T02:00:00Z", powerOutput: 8 },
      ]);
      setIsLoading(false);
    }, 2000);
  }, [windFarmId]);

  return { data, isLoading };
}
