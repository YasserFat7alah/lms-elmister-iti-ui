import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        conversations: [],
        activeConversationId: null,
        messages: {},
    },
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversationId = action.payload;
        },
        setMessages: (state, action) => {
            const { conversationId, messages } = action.payload;
            state.messages[conversationId] = messages;
        },
        addMessage: (state, action) => {
            const msg = action.payload;
            if (!state.messages[msg.conversation]) {
                state.messages[msg.conversation] = [];
            }
            state.messages[msg.conversation].push(msg);
        },
    },
});

export const {
    setActiveConversation,
    setMessages,
    addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
