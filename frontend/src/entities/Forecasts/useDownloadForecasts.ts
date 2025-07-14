import { useDownloadForecastCsvApiForecastHistoryHistoryRecordIdDownloadCsvGetMutation } from "../../shared/api/api";

export const useDownloadForecasts = () => {
  const [downloadCsv, { isLoading, error }] =
    useDownloadForecastCsvApiForecastHistoryHistoryRecordIdDownloadCsvGetMutation();

  const downloadForecast = async (
    forecastName: string,
    forecastDate: string,
    historyRecordId: number,
  ) => {
    try {
      const blob = await downloadCsv({ historyRecordId }).unwrap();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Альтернатива — парсить заголовок content-disposition (если вы его достаёте вручную)
      a.download = `${forecastName}_${forecastDate}.csv`;

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Error while trying to download forecast", e);
    }
  };

  return { downloadForecast, isLoading, error };
};
