import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    unreadCount: 0,
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
            state.unreadCount = action.payload.filter(n => !n.isRead).length;
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            if (!action.payload.isRead) {
                state.unreadCount += 1;
            }
        },
        markAsRead: (state, action) => {
            const notification = state.notifications.find(n => n._id === action.payload);
            if (notification && !notification.isRead) {
                notification.isRead = true;
                state.unreadCount -= 1;
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(n => n.isRead = true);
            state.unreadCount = 0;
        },
        deleteNotification: (state, action) => {
            const notification = state.notifications.find(n => n._id === action.payload);
            state.notifications = state.notifications.filter(n => n._id !== action.payload);
            if (notification && !notification.isRead) {
                state.unreadCount -= 1;
            }
        },
    },
});

export const { setNotifications, addNotification, markAsRead, markAllAsRead, deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
