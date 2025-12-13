import { apiSlice } from "../apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: "/admins/dashboard",
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetDashboardStatsQuery } = adminApiSlice;
