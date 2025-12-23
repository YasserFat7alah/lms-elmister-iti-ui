import { apiSlice } from '../apiSlice';
import { NOTIFICATIONS_URL } from '@/constants';

export const notificationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getNotifications: builder.query({
            query: () => NOTIFICATIONS_URL,
            providesTags: ['Notifications'],
            transformResponse: (response) => response.data,
        }),

        markNotificationAsRead: builder.mutation({
            query: (id) => ({
                url: `${NOTIFICATIONS_URL}/${id}/read`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notifications'],
        }),

        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `${NOTIFICATIONS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notifications'],
        }),

    }),
});

export const {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useDeleteNotificationMutation,
} = notificationsApiSlice;
