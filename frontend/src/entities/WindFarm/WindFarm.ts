export interface WindTurbine {
  modelName: string;
  modelId: number;
  number: number;
}

export type GranularityEnum = "60 minutes" | "30 minutes" | "15 minutes";
export type HorizonEnum = "3 hours" | "24 hours" | "48 hours" | "120 hours";
export type ForecastFrequencyEnum = "daily" | "hourly";

export type WindFarmForecast = {
  name: string;
  granularity?: GranularityEnum;
  horizon: HorizonEnum;
  recipient: string;
  start_time: Date;
  forecast_frequency: ForecastFrequencyEnum;
  enable?: boolean;
};

export interface WindFarmFormData {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  turbines: WindTurbine[];
  forecast: WindFarmForecast;
}
