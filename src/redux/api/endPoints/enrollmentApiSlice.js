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
            invalidatesTags: ['Enrollment'],
        }),
        getMyEnrollments: builder.query({
            query: () => ({
                url: `${ENROLLMENT_URL}/me`,
                method: 'GET',
            }),
            providesTags: ['Enrollment'],
        }),
        getAllEnrollments: builder.query({
            query: () => ({
                url: ENROLLMENT_URL,
                method: 'GET',
            }),
            providesTags: ['Enrollment'],
        }),
        deleteEnrollment: builder.mutation({
            query: (id) => ({
                url: `${ENROLLMENT_URL}/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Enrollment'],
        }),
        updateEnrollmentStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `${ENROLLMENT_URL}/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Enrollment'],
        }),
        getEnrollmentsByStudent: builder.query({
            query: (studentId) => ({
                url: `${ENROLLMENT_URL}/student/${studentId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                // Handle API response structure: { success: true, data: enrollments }
                return response?.data || response?.enrollments || [];
            },
            providesTags: ['Enrollment'],
        }),
        cancelEnrollment: builder.mutation({
            query: (enrollmentId) => ({
                url: `${ENROLLMENT_URL}/${enrollmentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Enrollment', 'Children'],
        }),
        forceCancelEnrollment: builder.mutation({
            query: ({ enrollmentId, data }) => ({
                url: `${ENROLLMENT_URL}/${enrollmentId}/force`,
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['Enrollment', 'Children'],
        }),
        renewEnrollment: builder.mutation({
            query: (enrollmentId) => ({
                url: `${ENROLLMENT_URL}/${enrollmentId}/renew`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Enrollment', 'Children'],
        }),
        completePayment: builder.mutation({
            query: (enrollmentId) => ({
                url: `${ENROLLMENT_URL}/${enrollmentId}/pay`,
                method: 'POST',
            }),
            // No invalidation needed as it redirects to Stripe
        }),
        removeEnrollment: builder.mutation({
            query: (enrollmentId) => ({
                url: `${ENROLLMENT_URL}/${enrollmentId}/remove`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Enrollment', 'Children'],
        }),
    }),
});

export const {
    useCheckoutMutation,
    useGetMyEnrollmentsQuery,
    useGetAllEnrollmentsQuery,
    useDeleteEnrollmentMutation,
    useUpdateEnrollmentStatusMutation,
    useGetEnrollmentsByStudentQuery,
    useCancelEnrollmentMutation,
    useForceCancelEnrollmentMutation,
    useRenewEnrollmentMutation,
    useCompletePaymentMutation,
    useRemoveEnrollmentMutation
} = enrollmentApiSlice;
