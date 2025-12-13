import { apiSlice } from "../apiSlice";

export const newsletterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        subscribe: builder.mutation({
            query: (data) => ({
                url: "/newsletter/subscribe",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["NewsletterSubscriber"],
        }),
        unsubscribe: builder.mutation({
            query: (data) => ({
                url: "/newsletter/unsubscribe",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["NewsletterSubscriber"],
        }),
        getSubscribers: builder.query({
            query: () => "/newsletter/subscribers",
            providesTags: ["NewsletterSubscriber"],
        }),
        getNewsletters: builder.query({
            query: () => "/newsletter",
            providesTags: ["NewsletterHistory"],
        }),
        deleteNewsletter: builder.mutation({
            query: (id) => ({
                url: `/newsletter/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["NewsletterHistory"],
        }),
        sendNewsletter: builder.mutation({
            query: (data) => ({
                url: "/newsletter/send",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["NewsletterHistory"],
        }),
    }),
});

export const {
    useSubscribeMutation,
    useUnsubscribeMutation,
    useGetSubscribersQuery,
    useGetNewslettersQuery,
    useSendNewsletterMutation,
    useDeleteNewsletterMutation,
} = newsletterApiSlice;
