import { apiSlice } from "./apiSlice";

export const invoicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInvoices: builder.query({
            query: ({ page = 1, limit = 10, search, status, sort }) => ({
                url: "/invoices", // Assuming mounted at /api/v1/invoices
                params: { page, limit, search, status, sort },
            }),
            providesTags: ["Invoices"],
        }),
    }),
});

export const { useGetInvoicesQuery } = invoicesApiSlice;
