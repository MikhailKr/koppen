import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWindFarmsApiWindEnergyUnitsWindFarmsGet: build.query<
      GetWindFarmsApiWindEnergyUnitsWindFarmsGetApiResponse,
      GetWindFarmsApiWindEnergyUnitsWindFarmsGetApiArg
    >({
      query: () => ({ url: `/api/wind-energy-units/wind_farms` }),
    }),
    createWindFarmApiWindEnergyUnitsWindFarmsPost: build.mutation<
      CreateWindFarmApiWindEnergyUnitsWindFarmsPostApiResponse,
      CreateWindFarmApiWindEnergyUnitsWindFarmsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/wind_farms`,
        method: "POST",
        body: queryArg.windFarmCreate,
      }),
    }),
    createLocationApiWindEnergyUnitsLocationPost: build.mutation<
      CreateLocationApiWindEnergyUnitsLocationPostApiResponse,
      CreateLocationApiWindEnergyUnitsLocationPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/location`,
        method: "POST",
        body: queryArg.locationCreate,
      }),
    }),
    updateWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdPatch: build.mutation<
      UpdateWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdPatchApiResponse,
      UpdateWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/wind_farms/${queryArg.windFarmId}`,
        method: "PATCH",
        body: queryArg.windFarmUpdate,
      }),
    }),
    getWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdGet: build.query<
      GetWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdGetApiResponse,
      GetWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/wind_farms/${queryArg.windFarmId}`,
      }),
    }),
    deleteWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdDelete: build.mutation<
      DeleteWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdDeleteApiResponse,
      DeleteWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/wind_farms/${queryArg.windFarmId}`,
        method: "DELETE",
      }),
    }),
    createForecastApiWindEnergyUnitsWindFarmsWindFarmIdForecastsPost:
      build.mutation<
        CreateForecastApiWindEnergyUnitsWindFarmsWindFarmIdForecastsPostApiResponse,
        CreateForecastApiWindEnergyUnitsWindFarmsWindFarmIdForecastsPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/wind-energy-units/wind_farms/${queryArg.windFarmId}/forecasts`,
          method: "POST",
          body: queryArg.windFarmForecastCreate,
        }),
      }),
    getWindFarmForecastsApiWindEnergyUnitsWindFarmsWindFarmIdForecastsGet:
      build.query<
        GetWindFarmForecastsApiWindEnergyUnitsWindFarmsWindFarmIdForecastsGetApiResponse,
        GetWindFarmForecastsApiWindEnergyUnitsWindFarmsWindFarmIdForecastsGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/wind-energy-units/wind_farms/${queryArg.windFarmId}/forecasts`,
        }),
      }),
    getPowerCurvesApiWindEnergyUnitsPowerCurvesGet: build.query<
      GetPowerCurvesApiWindEnergyUnitsPowerCurvesGetApiResponse,
      GetPowerCurvesApiWindEnergyUnitsPowerCurvesGetApiArg
    >({
      query: () => ({ url: `/api/wind-energy-units/power_curves` }),
    }),
    createPowerCurveApiWindEnergyUnitsPowerCurvesPost: build.mutation<
      CreatePowerCurveApiWindEnergyUnitsPowerCurvesPostApiResponse,
      CreatePowerCurveApiWindEnergyUnitsPowerCurvesPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/power_curves`,
        method: "POST",
        body: queryArg.powerCurveCreate,
      }),
    }),
    getPowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdGet: build.query<
      GetPowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdGetApiResponse,
      GetPowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/power_curves/${queryArg.powerCurveId}`,
      }),
    }),
    updatePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdPatch:
      build.mutation<
        UpdatePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdPatchApiResponse,
        UpdatePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/wind-energy-units/power_curves/${queryArg.powerCurveId}`,
          method: "PATCH",
          body: queryArg.powerCurveUpdate,
        }),
      }),
    deletePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdDelete:
      build.mutation<
        DeletePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdDeleteApiResponse,
        DeletePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/api/wind-energy-units/power_curves/${queryArg.powerCurveId}`,
          method: "DELETE",
        }),
      }),
    getWindTurbinesApiWindEnergyUnitsWindTurbinesGet: build.query<
      GetWindTurbinesApiWindEnergyUnitsWindTurbinesGetApiResponse,
      GetWindTurbinesApiWindEnergyUnitsWindTurbinesGetApiArg
    >({
      query: () => ({ url: `/api/wind-energy-units/wind_turbines` }),
    }),
    createWindTurbineApiWindEnergyUnitsWindTurbinesPost: build.mutation<
      CreateWindTurbineApiWindEnergyUnitsWindTurbinesPostApiResponse,
      CreateWindTurbineApiWindEnergyUnitsWindTurbinesPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/wind_turbines`,
        method: "POST",
        body: queryArg.windTurbineCreate,
      }),
    }),
    getWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdGet: build.query<
      GetWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdGetApiResponse,
      GetWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/wind_turbines/${queryArg.windTurbineId}`,
      }),
    }),
    updateWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdPatch:
      build.mutation<
        UpdateWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdPatchApiResponse,
        UpdateWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/wind-energy-units/wind_turbines/${queryArg.windTurbineId}`,
          method: "PATCH",
          body: queryArg.windTurbineUpdate,
        }),
      }),
    deleteWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdDelete:
      build.mutation<
        DeleteWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdDeleteApiResponse,
        DeleteWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/api/wind-energy-units/wind_turbines/${queryArg.windTurbineId}`,
          method: "DELETE",
        }),
      }),
    getWindFleetsApiWindEnergyUnitsWindTurbineFleetsGet: build.query<
      GetWindFleetsApiWindEnergyUnitsWindTurbineFleetsGetApiResponse,
      GetWindFleetsApiWindEnergyUnitsWindTurbineFleetsGetApiArg
    >({
      query: () => ({ url: `/api/wind-energy-units/wind_turbine_fleets` }),
    }),
    createWindFleetApiWindEnergyUnitsWindTurbineFleetsPost: build.mutation<
      CreateWindFleetApiWindEnergyUnitsWindTurbineFleetsPostApiResponse,
      CreateWindFleetApiWindEnergyUnitsWindTurbineFleetsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/wind_turbine_fleets`,
        method: "POST",
        body: queryArg.windTurbineFleetCreate,
      }),
    }),
    getWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdGet: build.query<
      GetWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdGetApiResponse,
      GetWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/wind-energy-units/wind_turbine_fleets/${queryArg.windFleetId}`,
      }),
    }),
    updateWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdPatch:
      build.mutation<
        UpdateWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchApiResponse,
        UpdateWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/wind-energy-units/wind_turbine_fleets/${queryArg.windFleetId}`,
          method: "PATCH",
          body: queryArg.windTurbineFleetUpdate,
        }),
      }),
    deleteWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdDelete:
      build.mutation<
        DeleteWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteApiResponse,
        DeleteWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/api/wind-energy-units/wind_turbine_fleets/${queryArg.windFleetId}`,
          method: "DELETE",
        }),
      }),
    loginApiAuthTokenPost: build.mutation<
      LoginApiAuthTokenPostApiResponse,
      LoginApiAuthTokenPostApiArg
    >({
      // NOTE: DONT OVERRIDE LOGIN METHOD. It use application/x-www-form-urlencoded.
      query: (queryArg) => {
        const body = new URLSearchParams();
        body.set("username", queryArg.bodyLoginApiAuthTokenPost.username);
        body.set("password", queryArg.bodyLoginApiAuthTokenPost.password);

        return {
          url: "/api/auth/token",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        };
      },
    }),
    downloadForecastCsvApiForecastHistoryHistoryRecordIdDownloadCsvGet:
      build.query<
        DownloadForecastCsvApiForecastHistoryHistoryRecordIdDownloadCsvGetApiResponse,
        DownloadForecastCsvApiForecastHistoryHistoryRecordIdDownloadCsvGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/forecast/history/${queryArg.historyRecordId}/download-csv`,
        }),
      }),
    getForecastHistoryApiForecastHistoryWindFarmIdGet: build.query<
      GetForecastHistoryApiForecastHistoryWindFarmIdGetApiResponse,
      GetForecastHistoryApiForecastHistoryWindFarmIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/forecast/history/${queryArg.windFarmId}`,
      }),
    }),
    forecastApiForecastWindFarmIdGet: build.query<
      ForecastApiForecastWindFarmIdGetApiResponse,
      ForecastApiForecastWindFarmIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/api/forecast/${queryArg.windFarmId}` }),
    }),
    serveSpaFullPathGet: build.query<
      ServeSpaFullPathGetApiResponse,
      ServeSpaFullPathGetApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.fullPath}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetWindFarmsApiWindEnergyUnitsWindFarmsGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetWindFarmsApiWindEnergyUnitsWindFarmsGetApiArg = void;
export type CreateWindFarmApiWindEnergyUnitsWindFarmsPostApiResponse =
  /** status 201 Successful Response */ WindFarmDb;
export type CreateWindFarmApiWindEnergyUnitsWindFarmsPostApiArg = {
  windFarmCreate: WindFarmCreate;
};
export type CreateLocationApiWindEnergyUnitsLocationPostApiResponse =
  /** status 201 Successful Response */ LocationDb;
export type CreateLocationApiWindEnergyUnitsLocationPostApiArg = {
  locationCreate: LocationCreate;
};
export type UpdateWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdPatchApiResponse =
  /** status 200 Successful Response */ WindFarmDb;
export type UpdateWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdPatchApiArg = {
  windFarmId: number;
  windFarmUpdate: WindFarmUpdate;
};
export type GetWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdGetApiResponse =
  /** status 200 Successful Response */ WindFarmDb;
export type GetWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdGetApiArg = {
  windFarmId: number;
};
export type DeleteWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdDeleteApiResponse =
  unknown;
export type DeleteWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdDeleteApiArg = {
  windFarmId: number;
};
export type CreateForecastApiWindEnergyUnitsWindFarmsWindFarmIdForecastsPostApiResponse =
  /** status 200 Successful Response */ any;
export type CreateForecastApiWindEnergyUnitsWindFarmsWindFarmIdForecastsPostApiArg =
  {
    windFarmId: number;
    windFarmForecastCreate: WindFarmForecastCreate;
  };
export type GetWindFarmForecastsApiWindEnergyUnitsWindFarmsWindFarmIdForecastsGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetWindFarmForecastsApiWindEnergyUnitsWindFarmsWindFarmIdForecastsGetApiArg =
  {
    windFarmId: number;
  };
export type GetPowerCurvesApiWindEnergyUnitsPowerCurvesGetApiResponse =
  /** status 200 Successful Response */ PowerCurveDb[];
export type GetPowerCurvesApiWindEnergyUnitsPowerCurvesGetApiArg = void;
export type CreatePowerCurveApiWindEnergyUnitsPowerCurvesPostApiResponse =
  /** status 201 Successful Response */ PowerCurveDb;
export type CreatePowerCurveApiWindEnergyUnitsPowerCurvesPostApiArg = {
  powerCurveCreate: PowerCurveCreate;
};
export type GetPowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdGetApiResponse =
  /** status 200 Successful Response */ PowerCurveDb;
export type GetPowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdGetApiArg = {
  powerCurveId: number;
};
export type UpdatePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdPatchApiResponse =
  /** status 200 Successful Response */ PowerCurveDb;
export type UpdatePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdPatchApiArg =
  {
    powerCurveId: number;
    powerCurveUpdate: PowerCurveUpdate;
  };
export type DeletePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdDeleteApiResponse =
  unknown;
export type DeletePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdDeleteApiArg =
  {
    powerCurveId: number;
  };
export type GetWindTurbinesApiWindEnergyUnitsWindTurbinesGetApiResponse =
  /** status 200 Successful Response */ WindTurbineDb[];
export type GetWindTurbinesApiWindEnergyUnitsWindTurbinesGetApiArg = void;
export type CreateWindTurbineApiWindEnergyUnitsWindTurbinesPostApiResponse =
  /** status 201 Successful Response */ WindTurbineDb;
export type CreateWindTurbineApiWindEnergyUnitsWindTurbinesPostApiArg = {
  windTurbineCreate: WindTurbineCreate;
};
export type GetWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdGetApiResponse =
  /** status 200 Successful Response */ WindTurbineDb;
export type GetWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdGetApiArg =
  {
    windTurbineId: number;
  };
export type UpdateWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdPatchApiResponse =
  /** status 200 Successful Response */ WindTurbineDb;
export type UpdateWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdPatchApiArg =
  {
    windTurbineId: number;
    windTurbineUpdate: WindTurbineUpdate;
  };
export type DeleteWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdDeleteApiResponse =
  unknown;
export type DeleteWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdDeleteApiArg =
  {
    windTurbineId: number;
  };
export type GetWindFleetsApiWindEnergyUnitsWindTurbineFleetsGetApiResponse =
  /** status 200 Successful Response */ WindTurbineFleetDb[];
export type GetWindFleetsApiWindEnergyUnitsWindTurbineFleetsGetApiArg = void;
export type CreateWindFleetApiWindEnergyUnitsWindTurbineFleetsPostApiResponse =
  /** status 201 Successful Response */ WindTurbineFleetDb;
export type CreateWindFleetApiWindEnergyUnitsWindTurbineFleetsPostApiArg = {
  windTurbineFleetCreate: WindTurbineFleetCreate;
};
export type GetWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdGetApiResponse =
  /** status 200 Successful Response */ WindTurbineFleetDb;
export type GetWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdGetApiArg =
  {
    windFleetId: number;
  };
export type UpdateWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchApiResponse =
  /** status 200 Successful Response */ WindTurbineFleetDb;
export type UpdateWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchApiArg =
  {
    windFleetId: number;
    windTurbineFleetUpdate: WindTurbineFleetUpdate;
  };
export type DeleteWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteApiResponse =
  unknown;
export type DeleteWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteApiArg =
  {
    windFleetId: number;
  };
export type LoginApiAuthTokenPostApiResponse =
  /** status 200 Successful Response */ any;
export type LoginApiAuthTokenPostApiArg = {
  bodyLoginApiAuthTokenPost: BodyLoginApiAuthTokenPost;
};
export type DownloadForecastCsvApiForecastHistoryHistoryRecordIdDownloadCsvGetApiResponse =
  /** status 200 Successful Response */ any;
export type DownloadForecastCsvApiForecastHistoryHistoryRecordIdDownloadCsvGetApiArg =
  {
    historyRecordId: number;
  };
export type GetForecastHistoryApiForecastHistoryWindFarmIdGetApiResponse =
  /** status 200 Successful Response */ ForecastHistoryDb[];
export type GetForecastHistoryApiForecastHistoryWindFarmIdGetApiArg = {
  windFarmId: number;
};
export type ForecastApiForecastWindFarmIdGetApiResponse =
  /** status 200 Successful Response */ any;
export type ForecastApiForecastWindFarmIdGetApiArg = {
  windFarmId: number;
};
export type ServeSpaFullPathGetApiResponse =
  /** status 200 Successful Response */ any;
export type ServeSpaFullPathGetApiArg = {
  fullPath: string;
};
export type LocationDb = {
  id: number;
  longitude: number;
  latitude: number;
};
export type PowerCurveDb = {
  id: number;
  wind_speed_value_map: {
    [key: string]: number;
  };
};
export type WindTurbineDb = {
  id: number;
  hub_height: number;
  turbine_type: string;
  nominal_power: number;
  power_curve: PowerCurveDb | null;
};
export type WindTurbineFleetDb = {
  id: number;
  number_of_turbines: number;
  wind_turbine?: WindTurbineDb | null;
};
export type GranularityEnum = "60 minutes" | "30 minutes" | "15 minutes";
export type HorizonEnum = "3 hours" | "24 hours" | "48 hours" | "120 hours";
export type ForecastFrequencyEnum = "daily" | "hourly";
export type ForecastDb = {
  name: string;
  granularity: GranularityEnum;
  horizon: HorizonEnum;
  recipients: string[];
  start_time: string | null;
  forecast_frequency: ForecastFrequencyEnum;
  enable?: boolean;
  wind_farm_id: number;
};
export type WindFarmDb = {
  id: number;
  name: string;
  description: string;
  location: LocationDb;
  wind_turbine_fleet: WindTurbineFleetDb[];
  forecasts: ForecastDb[];
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type LocationCreate = {
  longitude: number;
  latitude: number;
};
export type WindFarmForecastCreate = {
  name: string;
  granularity?: GranularityEnum;
  horizon?: HorizonEnum;
  recipients?: string[];
  start_time?: string | null;
  forecast_frequency?: ForecastFrequencyEnum;
  enable?: boolean;
};
export type WindTurbineFleetCreate = {
  number_of_turbines: number;
  wind_turbine_id: number;
};
export type WindFarmCreate = {
  name: string;
  description: string;
  location: LocationCreate;
  forecasts: WindFarmForecastCreate[];
  wind_turbine_fleet: WindTurbineFleetCreate[];
};
export type LocationUpdate = {
  longitude: number;
  latitude: number;
};
export type WindFarmUpdate = {
  name: string | null;
  description: string | null;
  location: LocationUpdate | null;
};
export type PowerCurveCreate = {
  wind_speed_value_map: {
    [key: string]: number;
  };
};
export type PowerCurveUpdate = {
  wind_speed_value_map: {
    [key: string]: number;
  };
};
export type WindTurbineCreate = {
  hubHeight: number;
  turbineType: string;
  nominalPower: number;
  powerCurveId: number;
};
export type WindTurbineUpdate = {
  hub_height?: number | null;
  turbine_type?: string | null;
  nominal_power?: number | null;
  power_curve_id?: number | null;
};
export type WindTurbineFleetUpdate = {
  number_of_turbines?: number | null;
  wind_turbine_id?: number | null;
};
export type BodyLoginApiAuthTokenPost = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};
export type ForecastHistoryDb = {
  id: number;
  forecast_id: number;
  generated_at: string;
};
export const {
  useGetWindFarmsApiWindEnergyUnitsWindFarmsGetQuery,
  useCreateWindFarmApiWindEnergyUnitsWindFarmsPostMutation,
  useCreateLocationApiWindEnergyUnitsLocationPostMutation,
  useUpdateWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdPatchMutation,
  useGetWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdGetQuery,
  useDeleteWindFarmApiWindEnergyUnitsWindFarmsWindFarmIdDeleteMutation,
  useCreateForecastApiWindEnergyUnitsWindFarmsWindFarmIdForecastsPostMutation,
  useGetWindFarmForecastsApiWindEnergyUnitsWindFarmsWindFarmIdForecastsGetQuery,
  useGetPowerCurvesApiWindEnergyUnitsPowerCurvesGetQuery,
  useCreatePowerCurveApiWindEnergyUnitsPowerCurvesPostMutation,
  useGetPowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdGetQuery,
  useUpdatePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdPatchMutation,
  useDeletePowerCurveApiWindEnergyUnitsPowerCurvesPowerCurveIdDeleteMutation,
  useGetWindTurbinesApiWindEnergyUnitsWindTurbinesGetQuery,
  useCreateWindTurbineApiWindEnergyUnitsWindTurbinesPostMutation,
  useGetWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdGetQuery,
  useUpdateWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdPatchMutation,
  useDeleteWindTurbineApiWindEnergyUnitsWindTurbinesWindTurbineIdDeleteMutation,
  useGetWindFleetsApiWindEnergyUnitsWindTurbineFleetsGetQuery,
  useCreateWindFleetApiWindEnergyUnitsWindTurbineFleetsPostMutation,
  useGetWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdGetQuery,
  useUpdateWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchMutation,
  useDeleteWindFleetApiWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteMutation,
  useLoginApiAuthTokenPostMutation,
  useDownloadForecastCsvApiForecastHistoryHistoryRecordIdDownloadCsvGetQuery,
  useGetForecastHistoryApiForecastHistoryWindFarmIdGetQuery,
  useForecastApiForecastWindFarmIdGetQuery,
  useServeSpaFullPathGetQuery,
} = injectedRtkApi;

export const useLazyForecastForecastWindFarmIdGetQuery =
  injectedRtkApi.endpoints.forecastApiForecastWindFarmIdGet.useLazyQuery;
