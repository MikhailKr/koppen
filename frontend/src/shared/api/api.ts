import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWindFarmsWindEnergyUnitsWindFarmsGet: build.query<
      GetWindFarmsWindEnergyUnitsWindFarmsGetApiResponse,
      GetWindFarmsWindEnergyUnitsWindFarmsGetApiArg
    >({
      query: () => ({ url: `/wind-energy-units/wind_farms` }),
    }),
    createWindFarmWindEnergyUnitsWindFarmsPost: build.mutation<
      CreateWindFarmWindEnergyUnitsWindFarmsPostApiResponse,
      CreateWindFarmWindEnergyUnitsWindFarmsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/wind_farms`,
        method: "POST",
        body: queryArg.windFarmCreate,
      }),
    }),
    createLocationWindEnergyUnitsLocationPost: build.mutation<
      CreateLocationWindEnergyUnitsLocationPostApiResponse,
      CreateLocationWindEnergyUnitsLocationPostApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/location`,
        method: "POST",
        body: queryArg.locationCreate,
      }),
    }),
    updateWindFarmWindEnergyUnitsWindFarmsWindFarmIdPatch: build.mutation<
      UpdateWindFarmWindEnergyUnitsWindFarmsWindFarmIdPatchApiResponse,
      UpdateWindFarmWindEnergyUnitsWindFarmsWindFarmIdPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/wind_farms/${queryArg.windFarmId}`,
        method: "PATCH",
        body: queryArg.windFarmUpdate,
      }),
    }),
    getWindFarmWindEnergyUnitsWindFarmsWindFarmIdGet: build.query<
      GetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetApiResponse,
      GetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/wind_farms/${queryArg.windFarmId}`,
      }),
    }),
    deleteWindFarmWindEnergyUnitsWindFarmsWindFarmIdDelete: build.mutation<
      DeleteWindFarmWindEnergyUnitsWindFarmsWindFarmIdDeleteApiResponse,
      DeleteWindFarmWindEnergyUnitsWindFarmsWindFarmIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/wind_farms/${queryArg.windFarmId}`,
        method: "DELETE",
      }),
    }),
    createForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPost:
      build.mutation<
        CreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostApiResponse,
        CreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostApiArg
      >({
        query: (queryArg) => ({
          url: `/wind-energy-units/wind_farms/${queryArg.windFarmId}/forecasts`,
          method: "POST",
          body: queryArg.windFarmForecastCreate,
        }),
      }),
    getWindFarmForecastsWindEnergyUnitsWindFarmsWindFarmIdForecastsGet:
      build.query<
        GetWindFarmForecastsWindEnergyUnitsWindFarmsWindFarmIdForecastsGetApiResponse,
        GetWindFarmForecastsWindEnergyUnitsWindFarmsWindFarmIdForecastsGetApiArg
      >({
        query: (queryArg) => ({
          url: `/wind-energy-units/wind_farms/${queryArg.windFarmId}/forecasts`,
        }),
      }),
    getPowerCurvesWindEnergyUnitsPowerCurvesGet: build.query<
      GetPowerCurvesWindEnergyUnitsPowerCurvesGetApiResponse,
      GetPowerCurvesWindEnergyUnitsPowerCurvesGetApiArg
    >({
      query: () => ({ url: `/wind-energy-units/power_curves` }),
    }),
    createPowerCurveWindEnergyUnitsPowerCurvesPost: build.mutation<
      CreatePowerCurveWindEnergyUnitsPowerCurvesPostApiResponse,
      CreatePowerCurveWindEnergyUnitsPowerCurvesPostApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/power_curves`,
        method: "POST",
        body: queryArg.powerCurveCreate,
      }),
    }),
    getPowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdGet: build.query<
      GetPowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdGetApiResponse,
      GetPowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/power_curves/${queryArg.powerCurveId}`,
      }),
    }),
    updatePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdPatch: build.mutation<
      UpdatePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdPatchApiResponse,
      UpdatePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/power_curves/${queryArg.powerCurveId}`,
        method: "PATCH",
        body: queryArg.powerCurveUpdate,
      }),
    }),
    deletePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdDelete:
      build.mutation<
        DeletePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdDeleteApiResponse,
        DeletePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/wind-energy-units/power_curves/${queryArg.powerCurveId}`,
          method: "DELETE",
        }),
      }),
    getWindTurbinesWindEnergyUnitsWindTurbinesGet: build.query<
      GetWindTurbinesWindEnergyUnitsWindTurbinesGetApiResponse,
      GetWindTurbinesWindEnergyUnitsWindTurbinesGetApiArg
    >({
      query: () => ({ url: `/wind-energy-units/wind_turbines` }),
    }),
    createWindTurbineWindEnergyUnitsWindTurbinesPost: build.mutation<
      CreateWindTurbineWindEnergyUnitsWindTurbinesPostApiResponse,
      CreateWindTurbineWindEnergyUnitsWindTurbinesPostApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/wind_turbines`,
        method: "POST",
        body: queryArg.windTurbineCreate,
      }),
    }),
    getWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdGet: build.query<
      GetWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdGetApiResponse,
      GetWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/wind_turbines/${queryArg.windTurbineId}`,
      }),
    }),
    updateWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdPatch:
      build.mutation<
        UpdateWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdPatchApiResponse,
        UpdateWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/wind-energy-units/wind_turbines/${queryArg.windTurbineId}`,
          method: "PATCH",
          body: queryArg.windTurbineUpdate,
        }),
      }),
    deleteWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdDelete:
      build.mutation<
        DeleteWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdDeleteApiResponse,
        DeleteWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/wind-energy-units/wind_turbines/${queryArg.windTurbineId}`,
          method: "DELETE",
        }),
      }),
    getWindFleetsWindEnergyUnitsWindTurbineFleetsGet: build.query<
      GetWindFleetsWindEnergyUnitsWindTurbineFleetsGetApiResponse,
      GetWindFleetsWindEnergyUnitsWindTurbineFleetsGetApiArg
    >({
      query: () => ({ url: `/wind-energy-units/wind_turbine_fleets` }),
    }),
    createWindFleetWindEnergyUnitsWindTurbineFleetsPost: build.mutation<
      CreateWindFleetWindEnergyUnitsWindTurbineFleetsPostApiResponse,
      CreateWindFleetWindEnergyUnitsWindTurbineFleetsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/wind_turbine_fleets`,
        method: "POST",
        body: queryArg.windTurbineFleetCreate,
      }),
    }),
    getWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdGet: build.query<
      GetWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdGetApiResponse,
      GetWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdGetApiArg
    >({
      query: (queryArg) => ({
        url: `/wind-energy-units/wind_turbine_fleets/${queryArg.windFleetId}`,
      }),
    }),
    updateWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdPatch:
      build.mutation<
        UpdateWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchApiResponse,
        UpdateWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/wind-energy-units/wind_turbine_fleets/${queryArg.windFleetId}`,
          method: "PATCH",
          body: queryArg.windTurbineFleetUpdate,
        }),
      }),
    deleteWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdDelete:
      build.mutation<
        DeleteWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteApiResponse,
        DeleteWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/wind-energy-units/wind_turbine_fleets/${queryArg.windFleetId}`,
          method: "DELETE",
        }),
      }),
    loginAuthTokenPost: build.mutation<
      LoginAuthTokenPostApiResponse,
      LoginAuthTokenPostApiArg
    >({
      // NOTE: DONT OVERRIDE LOGIN METHOD. It use application/x-www-form-urlencoded.
      query: (queryArg) => {
        const body = new URLSearchParams();
        body.set("username", queryArg.bodyLoginAuthTokenPost.username);
        body.set("password", queryArg.bodyLoginAuthTokenPost.password);

        return {
          url: "/auth/token",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        };
      },
    }),
    forecastForecastWindFarmIdGet: build.query<
      ForecastForecastWindFarmIdGetApiResponse,
      ForecastForecastWindFarmIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/forecast/${queryArg.windFarmId}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetWindFarmsWindEnergyUnitsWindFarmsGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetWindFarmsWindEnergyUnitsWindFarmsGetApiArg = void;
export type CreateWindFarmWindEnergyUnitsWindFarmsPostApiResponse =
  /** status 201 Successful Response */ WindFarmDb;
export type CreateWindFarmWindEnergyUnitsWindFarmsPostApiArg = {
  windFarmCreate: WindFarmCreate;
};
export type CreateLocationWindEnergyUnitsLocationPostApiResponse =
  /** status 201 Successful Response */ LocationDb;
export type CreateLocationWindEnergyUnitsLocationPostApiArg = {
  locationCreate: LocationCreate;
};
export type UpdateWindFarmWindEnergyUnitsWindFarmsWindFarmIdPatchApiResponse =
  /** status 200 Successful Response */ WindFarmDb;
export type UpdateWindFarmWindEnergyUnitsWindFarmsWindFarmIdPatchApiArg = {
  windFarmId: number;
  windFarmUpdate: WindFarmUpdate;
};
export type GetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetApiResponse =
  /** status 200 Successful Response */ WindFarmDb;
export type GetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetApiArg = {
  windFarmId: number;
};
export type DeleteWindFarmWindEnergyUnitsWindFarmsWindFarmIdDeleteApiResponse =
  unknown;
export type DeleteWindFarmWindEnergyUnitsWindFarmsWindFarmIdDeleteApiArg = {
  windFarmId: number;
};
export type CreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostApiResponse =
  /** status 200 Successful Response */ any;
export type CreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostApiArg =
  {
    windFarmId: number;
    windFarmForecastCreate: WindFarmForecastCreate;
  };
export type GetWindFarmForecastsWindEnergyUnitsWindFarmsWindFarmIdForecastsGetApiResponse =
  /** status 200 Successful Response */ any;
export type GetWindFarmForecastsWindEnergyUnitsWindFarmsWindFarmIdForecastsGetApiArg =
  {
    windFarmId: number;
  };
export type GetPowerCurvesWindEnergyUnitsPowerCurvesGetApiResponse =
  /** status 200 Successful Response */ PowerCurveDb[];
export type GetPowerCurvesWindEnergyUnitsPowerCurvesGetApiArg = void;
export type CreatePowerCurveWindEnergyUnitsPowerCurvesPostApiResponse =
  /** status 201 Successful Response */ PowerCurveDb;
export type CreatePowerCurveWindEnergyUnitsPowerCurvesPostApiArg = {
  powerCurveCreate: PowerCurveCreate;
};
export type GetPowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdGetApiResponse =
  /** status 200 Successful Response */ PowerCurveDb;
export type GetPowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdGetApiArg = {
  powerCurveId: number;
};
export type UpdatePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdPatchApiResponse =
  /** status 200 Successful Response */ PowerCurveDb;
export type UpdatePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdPatchApiArg =
  {
    powerCurveId: number;
    powerCurveUpdate: PowerCurveUpdate;
  };
export type DeletePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdDeleteApiResponse =
  unknown;
export type DeletePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdDeleteApiArg =
  {
    powerCurveId: number;
  };
export type GetWindTurbinesWindEnergyUnitsWindTurbinesGetApiResponse =
  /** status 200 Successful Response */ WindTurbineDb[];
export type GetWindTurbinesWindEnergyUnitsWindTurbinesGetApiArg = void;
export type CreateWindTurbineWindEnergyUnitsWindTurbinesPostApiResponse =
  /** status 201 Successful Response */ WindTurbineDb;
export type CreateWindTurbineWindEnergyUnitsWindTurbinesPostApiArg = {
  windTurbineCreate: WindTurbineCreate;
};
export type GetWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdGetApiResponse =
  /** status 200 Successful Response */ WindTurbineDb;
export type GetWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdGetApiArg = {
  windTurbineId: number;
};
export type UpdateWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdPatchApiResponse =
  /** status 200 Successful Response */ WindTurbineDb;
export type UpdateWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdPatchApiArg =
  {
    windTurbineId: number;
    windTurbineUpdate: WindTurbineUpdate;
  };
export type DeleteWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdDeleteApiResponse =
  unknown;
export type DeleteWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdDeleteApiArg =
  {
    windTurbineId: number;
  };
export type GetWindFleetsWindEnergyUnitsWindTurbineFleetsGetApiResponse =
  /** status 200 Successful Response */ WindTurbineFleetDb[];
export type GetWindFleetsWindEnergyUnitsWindTurbineFleetsGetApiArg = void;
export type CreateWindFleetWindEnergyUnitsWindTurbineFleetsPostApiResponse =
  /** status 201 Successful Response */ WindTurbineFleetDb;
export type CreateWindFleetWindEnergyUnitsWindTurbineFleetsPostApiArg = {
  windTurbineFleetCreate: WindTurbineFleetCreate;
};
export type GetWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdGetApiResponse =
  /** status 200 Successful Response */ WindTurbineFleetDb;
export type GetWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdGetApiArg = {
  windFleetId: number;
};
export type UpdateWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchApiResponse =
  /** status 200 Successful Response */ WindTurbineFleetDb;
export type UpdateWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchApiArg =
  {
    windFleetId: number;
    windTurbineFleetUpdate: WindTurbineFleetUpdate;
  };
export type DeleteWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteApiResponse =
  unknown;
export type DeleteWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteApiArg =
  {
    windFleetId: number;
  };
export type LoginAuthTokenPostApiResponse =
  /** status 200 Successful Response */ any;
export type LoginAuthTokenPostApiArg = {
  bodyLoginAuthTokenPost: BodyLoginAuthTokenPost;
};
export type ForecastForecastWindFarmIdGetApiResponse =
  /** status 200 Successful Response */ any;
export type ForecastForecastWindFarmIdGetApiArg = {
  windFarmId: number;
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
export type TimeResolutionEnum = "minute" | "hour" | "day";
export type ForecastDb = {
  time_resolution: TimeResolutionEnum;
  repeat_daily?: boolean;
  daily_time?: string | null;
  repeat_hourly?: boolean;
  hourly_minute?: number | null;
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
  time_resolution: TimeResolutionEnum;
  repeat_daily?: boolean;
  daily_time?: string | null;
  repeat_hourly?: boolean;
  hourly_minute?: number | null;
  wind_farm_id: number;
};
export type WindTurbineFleetCreate = {
  number_of_turbines: number;
  wind_turbine_id: number;
};
export type WindFarmCreate = {
  name: string;
  description: string;
  location: LocationCreate;
  user_id: number;
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
export type BodyLoginAuthTokenPost = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};
export const {
  useGetWindFarmsWindEnergyUnitsWindFarmsGetQuery,
  useCreateWindFarmWindEnergyUnitsWindFarmsPostMutation,
  useCreateLocationWindEnergyUnitsLocationPostMutation,
  useUpdateWindFarmWindEnergyUnitsWindFarmsWindFarmIdPatchMutation,
  useGetWindFarmWindEnergyUnitsWindFarmsWindFarmIdGetQuery,
  useDeleteWindFarmWindEnergyUnitsWindFarmsWindFarmIdDeleteMutation,
  useCreateForecastWindEnergyUnitsWindFarmsWindFarmIdForecastsPostMutation,
  useGetWindFarmForecastsWindEnergyUnitsWindFarmsWindFarmIdForecastsGetQuery,
  useGetPowerCurvesWindEnergyUnitsPowerCurvesGetQuery,
  useCreatePowerCurveWindEnergyUnitsPowerCurvesPostMutation,
  useGetPowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdGetQuery,
  useUpdatePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdPatchMutation,
  useDeletePowerCurveWindEnergyUnitsPowerCurvesPowerCurveIdDeleteMutation,
  useGetWindTurbinesWindEnergyUnitsWindTurbinesGetQuery,
  useCreateWindTurbineWindEnergyUnitsWindTurbinesPostMutation,
  useGetWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdGetQuery,
  useUpdateWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdPatchMutation,
  useDeleteWindTurbineWindEnergyUnitsWindTurbinesWindTurbineIdDeleteMutation,
  useGetWindFleetsWindEnergyUnitsWindTurbineFleetsGetQuery,
  useCreateWindFleetWindEnergyUnitsWindTurbineFleetsPostMutation,
  useGetWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdGetQuery,
  useUpdateWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdPatchMutation,
  useDeleteWindFleetWindEnergyUnitsWindTurbineFleetsWindFleetIdDeleteMutation,
  useLoginAuthTokenPostMutation,
  useForecastForecastWindFarmIdGetQuery,
} = injectedRtkApi;

export const useLazyForecastForecastWindFarmIdGetQuery =
  injectedRtkApi.endpoints.forecastForecastWindFarmIdGet.useLazyQuery;
