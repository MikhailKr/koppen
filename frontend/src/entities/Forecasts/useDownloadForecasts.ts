import { useCallback } from "react";
import { useLazyForecastForecastWindFarmIdGetQuery } from "../../shared/api/api";

export const useDownloadForecasts = () => {
  const [trigger, { isFetching, error }] =
    useLazyForecastForecastWindFarmIdGetQuery();

  const downloadForecast = useCallback(
    async (windFarmId: number, windFarmName: string) => {
      try {
        const result = await trigger({ windFarmId }).unwrap();

        if (!result?.power_output) {
          console.warn("No data");
          return;
        }

        const rows = [["timestamp", "power_output"]];
        for (const [timestamp, value] of Object.entries(result.power_output)) {
          //@ts-ignore
          rows.push([timestamp, value.toString()]);
        }

        const csvContent = rows.map((r) => r.join(",")).join("\n");
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `forecast_${windFarmName}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error("Error while trying to download forecast", e);
      }
    },
    [trigger],
  );

  return { downloadForecast, isFetching, error };
};
