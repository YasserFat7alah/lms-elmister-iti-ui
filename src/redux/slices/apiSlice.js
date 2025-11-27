import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", 
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.originalStatus === 401) {
    console.warn(" Access Token expired… Trying refresh token");

    const refreshResult = await baseQuery(
      { url: "/api/v1/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      console.log("🔄 Token refreshed successfully!");

      api.dispatch({
        type: "auth/setCredentials",
        payload: refreshResult.data
      });

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh token failed → Logging out");
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Course"],
  endpoints: (builder) => ({}),
});
