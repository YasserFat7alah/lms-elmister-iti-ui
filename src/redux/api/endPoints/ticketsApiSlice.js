import { apiSlice } from "../apiSlice";

export const ticketsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTicket: builder.mutation({
            query: (data) => ({
                url: "/tickets",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Tickets"],
        }),
        getAllTickets: builder.query({
            query: (params) => ({
                url: "/tickets",
                params,
            }),
            providesTags: ["Tickets"],
        }),
        replyToTicket: builder.mutation({
            query: ({ id, message }) => ({
                url: `/tickets/${id}/reply`,
                method: "POST",
                body: { message },
            }),
            invalidatesTags: ["Tickets"],
        }),
        updateTicketStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/tickets/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Tickets"],
        }),
        deleteTicket: builder.mutation({
            query: (id) => ({
                url: `/tickets/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tickets"],
        }),
    }),
});

export const {
    useCreateTicketMutation,
    useGetAllTicketsQuery,
    useReplyToTicketMutation,
    useUpdateTicketStatusMutation,
    useDeleteTicketMutation,
} = ticketsApiSlice;
