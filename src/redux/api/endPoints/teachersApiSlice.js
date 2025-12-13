import { apiSlice } from '../apiSlice';
import { TEACHERS_URL } from '@/constants';

export const teachersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeacherDashboard: builder.query({
            query: (params) => ({
                url: `${TEACHERS_URL}/dashboard`,
                method: 'GET',
                params,
            }),
            providesTags: ['Dashboard'],
            keepUnusedDataFor: 5 // Cache for 5 seconds
        }),
        getTeacherAcademicChart: builder.query({
            query: (params) => ({
                url: `${TEACHERS_URL}/dashboard/academic-chart`,
                method: 'GET',
                params,
            }),
            keepUnusedDataFor: 5
        }),
        getTeacherEarningsChart: builder.query({
            query: (params) => ({
                url: `${TEACHERS_URL}/dashboard/earnings-chart`,
                method: 'GET',
                params,
            }),
            keepUnusedDataFor: 5
        }),
    }),
});

export const {
    useGetTeacherDashboardQuery,
    useGetTeacherAcademicChartQuery,
    useGetTeacherEarningsChartQuery,
} = teachersApiSlice;
