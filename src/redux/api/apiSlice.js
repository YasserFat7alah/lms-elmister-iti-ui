import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, USERS_URL } from '@/constants';
import { setCredentials, logout } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const url = typeof args === 'string' ? args : args.url;

  if (
    (result?.error?.status === 401 || result?.error?.status === 403) &&
    !url.includes("/login") && 
    !url.includes("/register")
  ) {
    console.warn(" Token expired. Attempting refresh...");

    const refreshResult = await baseQuery(
      { url: `${USERS_URL}/refresh-token`, method: "POST" }, 
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      console.log(" Token refreshed successfully!");
      
      const { user, accessToken } = refreshResult.data.data;

      api.dispatch(setCredentials({ user, accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error(" Refresh failed. Logging out.");
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Course"],
  endpoints: (builder) => ({}),
});