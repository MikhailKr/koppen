import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appRoutes } from "../../app/appRoutes";
import { ACCESS_TOKEN_KEY } from "../contexts/AuthContext";

const baseUrl = import.meta.env.DEV ? "http://158.160.91.255" : "/";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRedirect = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = appRoutes.login;
  }

  return result;
};

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRedirect,
  endpoints: () => ({}),
});
