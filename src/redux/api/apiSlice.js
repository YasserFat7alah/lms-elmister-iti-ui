import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { BASE_URL, USERS_URL } from '@/constants';
import { setCredentials, logout } from '../slices/authSlice';

const mutex = new Mutex();

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
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  const url = typeof args === 'string' ? args : args.url;

  if (
    (result?.error?.status === 401 || result?.error?.status === 403) &&
    !url.includes("/login") &&
    !url.includes("/register") &&
    !url.includes("/refresh-token")
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        console.warn("Token expired. Refreshing logic started...");

        const refreshResult = await baseQuery(
          { url: `${USERS_URL}/refresh-token`, method: "POST" },
          api,
          extraOptions
        );

        if (refreshResult?.data) {
          console.log("Token refreshed successfully inside Mutex!");

          const responseData = refreshResult.data.data || refreshResult.data;
          const { user, accessToken } = responseData;

          if (accessToken) {
            api.dispatch(setCredentials({ user, accessToken }));

            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logout());
          }
        } else {
          console.error("Refresh failed. Logging out.");
          api.dispatch(logout());
        }

      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Courses", "Groups", "Lessons", "Enrollment"],
  endpoints: (builder) => ({}),
});