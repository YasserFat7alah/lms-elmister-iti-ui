import { apiSlice } from "../apiSlice";

export const childrenApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getChildren: builder.query({
            query: () => ({
                url: "/children",
                method: "GET",
            }),
            transformResponse: (response) => {
                // Handle API response structure: { success: true, message: "...", data: children }
                return response?.data || response;
            },
            providesTags: ["Children"],
        }),

        getChildById: builder.query({
            query: (id) => ({
                url: `/children/${id}`,
                method: "GET",
            }),
            transformResponse: (response) => {
                // Handle API response structure: { success: true, message: "...", data: child }
                return response?.data || response;
            },
            providesTags: ["Children"],
        }),

        createChild: builder.mutation({
            query: (data) => ({
                url: "/children",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Children"],
        }),

        updateChild: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/children/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Children"],
        }),

        deleteChild: builder.mutation({
            query: (id) => ({
                url: `/children/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Children"],
        }),

        getChildCourseStats: builder.query({
            query: ({ childId, courseId }) => ({
                url: `/children/${childId}/courses/${courseId}/stats`,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response?.data || response;
            },
        }),

        getUpcomingSessions: builder.query({
            query: () => ({
                url: `/children/upcoming-sessions`,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response?.data || response;
            },
        }),

        getSubscriptions: builder.query({
            query: () => ({
                url: `/children/subscriptions`,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response?.data || response;
            },
        }),

        getChildrenTeachers: builder.query({
            query: () => ({
                url: `/children/teachers`,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response?.data || response;
            },
            providesTags: ["Children"],
        }),
    })
});

export const {
    useGetChildrenQuery,
    useGetChildByIdQuery,
    useCreateChildMutation,
    useUpdateChildMutation,
    useDeleteChildMutation,
    useGetChildCourseStatsQuery,
    useGetUpcomingSessionsQuery,
    useGetSubscriptionsQuery,
    useGetChildrenTeachersQuery
} = childrenApiSlice;