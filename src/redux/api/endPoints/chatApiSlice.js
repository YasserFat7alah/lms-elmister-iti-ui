import { apiSlice } from '../apiSlice';

const CHAT_URL = '/chat';

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        startConversation: builder.mutation({
            query: (receiverId) => ({
                url: `${CHAT_URL}/conversation`,
                method: 'POST',
                body: { receiverId }
            }),
            invalidatesTags: ['Conversations']
        }),

        getUserConversations: builder.query({
            query: () => `${CHAT_URL}/conversation`,
            providesTags: ['Conversations']
        }),

        getMessages: builder.query({
            query: (conversationId) => `${CHAT_URL}/${conversationId}/messages`,
            providesTags: (result, error, conversationId) => [
                { type: 'Messages', id: conversationId }
            ]
        }),

        sendMessage: builder.mutation({
            query: ({ conversationId, text, receiverId }) => ({
                url: `${CHAT_URL}/${conversationId}/message`,
                method: 'POST',
                body: { text, receiverId }
            }),
            invalidatesTags: (result, error, { conversationId }) => [
                { type: 'Messages', id: conversationId },
                'Conversations'
            ]
        })
    })
});

export const {
    useStartConversationMutation,
    useGetUserConversationsQuery,
    useGetMessagesQuery,
    useSendMessageMutation
} = chatApiSlice;