export interface WindTurbine {
  modelName: string;
  modelId: number;
  number: number;
}

export type TimeResolutionEnum = "minute" | "hour" | "day";

export type WindFarmForecast = {
  time_resolution: TimeResolutionEnum;
  repeat_daily?: boolean;
  daily_time?: string | null;
  repeat_hourly?: boolean;
  hourly_minute?: number | null;
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
