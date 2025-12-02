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
    !url.includes("/register") &&
    !url.includes("/refresh-token") // ✅ حماية إضافية
  ) {
    console.warn("⚠️ Token expired. Attempting refresh...");

    const refreshResult = await baseQuery(
      { url: `${USERS_URL}/refresh-token`, method: "POST" }, 
      api,
      extraOptions
    );

    console.log("🔍 Refresh Result Full Object:", refreshResult); // 👈 ده هيعرفنا المشكلة فين

    if (refreshResult?.data) {
      console.log("✅ Token refreshed successfully!");
      
      // ✅ تعديل مهم جداً: التعامل المرن مع هيكلة الداتا
      // بنشوف هل الداتا جوه data.data ولا data مباشرة
      const responseData = refreshResult.data.data || refreshResult.data;
      
      const { user, accessToken } = responseData;

      if (accessToken) {
        api.dispatch(setCredentials({ user, accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("❌ Refresh succeeded but AccessToken is missing in response!", responseData);
        api.dispatch(logout());
      }

    } else {
      // هنا هنعرف ليه الفشل حصل (هل 401 ولا 500 ولا حاجة تانية)
      console.error("❌ Refresh Request Failed.");
      console.error("Status:", refreshResult?.error?.status);
      console.error("Error Data:", refreshResult?.error?.data);
      
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