import { apiSlice } from '../apiSlice';

const ENROLLMENT_URL = '/enrollments';

export const enrollmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkout: builder.mutation({
            query: ({ groupId, studentId }) => ({
                url: `${ENROLLMENT_URL}/checkout/${groupId}`,
                method: 'POST',
                body: { studentId },
            }),
        }),
        getMyEnrollments: builder.query({
            query: () => ({
                url: `${ENROLLMENT_URL}/me`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCheckoutMutation,
    useGetMyEnrollmentsQuery
} = enrollmentApiSlice;
