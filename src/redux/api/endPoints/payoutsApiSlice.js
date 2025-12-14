import { apiSlice } from '../apiSlice';

const payoutsDetailTag = (result, error, arg) => {
    return [{ type: 'Payouts', id: arg.id }];
}

export const payoutsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        onboardTeacher: builder.mutation({
            query: () => ({
                url: '/teachers/payouts/onboard', // POST
                method: 'POST',
            }),
        }),
        checkOnboardingStatus: builder.query({
            query: () => ({
                url: '/teachers/payouts/onboard/callback',
                method: 'GET',
            }),
            providesTags: ['User'], // Re-fetch if user changes, or maybe just own tag
        }),
        requestPayout: builder.mutation({
            query: (data) => ({
                url: '/payouts/request',
                method: 'POST',
                body: data, // { amount, note }
            }),
            invalidatesTags: ['Payouts', 'User', 'Dashboard'], // Update balance and list
        }),
        getTeacherPayouts: builder.query({
            query: () => ({
                url: '/payouts/my-payouts',
                method: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.payouts.map(({ _id }) => ({ type: 'Payouts', id: _id })),
                        { type: 'Payouts', id: 'LIST' },
                    ]
                    : [{ type: 'Payouts', id: 'LIST' }],
        }),
        // --- Admin Endpoints ---
        getAdminPayouts: builder.query({
            query: (params) => ({
                url: '/payouts',
                method: 'GET',
                params, // { status: 'pending' | 'approved' | ... }
            }),
            providesTags: ['Payouts'],
        }),
        updatePayoutStatus: builder.mutation({
            query: ({ payoutId, status, note }) => ({
                url: `/payouts/${payoutId}`,
                method: 'PATCH',
                body: { status, note },
            }),
            invalidatesTags: ['Payouts', 'Dashboard'],
        }),
    }),
});

export const {
    useOnboardTeacherMutation,
    useCheckOnboardingStatusQuery,
    useRequestPayoutMutation,
    useGetTeacherPayoutsQuery,
    useGetAdminPayoutsQuery,
    useUpdatePayoutStatusMutation,
} = payoutsApiSlice;
