export interface WindTurbine {
  model: string;
  number: string;
}

export interface WindFarmFormData {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  turbines: WindTurbine[];
  forecastName: string;
  granularity: "hourly" | "daily";
  horizon: string;
  updateFrequency: string;
}
