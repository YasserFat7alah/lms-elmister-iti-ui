import { apiSlice } from '../apiSlice';

import { COMMENTS_URL } from '@/constants';

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (data) => ({
                url: COMMENTS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Courses', id: arg.targetId } // Invalidate the Course cache so it refetches with new comments
            ],
        }),
        deleteComment: builder.mutation({
            query: ({ id }) => ({
                url: `${COMMENTS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Courses', id: arg.targetId }
            ],
        }),
    }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentsApiSlice;
