import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    notifications: [
      { id: "n1", user: "Ahmed Salem", title: "New math assignment posted", read: false, timeAgo: "Just now" },
      { id: "n2", user: "Sarah Salem", title: "Science project update", read: false, timeAgo: "3 hours ago" },
      { id: "n3", user: "Sarah Salem", title: "New study materials uploaded", read: true, timeAgo: "2 days ago" },
      { id: "n4", user: "Sarah Salem", title: "New study materials uploaded", read: true, timeAgo: "3 days ago" }
    ]
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        markAllAsRead: (state) => {
            state.notifications = state.notifications.map(n => ({
                ...n,
                read: true
            }));
        } ,
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
          },
          setNotifications: (state, action) => {
            state.notifications = action.payload;
        }
    },
});

// const notificationReducer = notificationSlice.reducer

export const { markAllAsRead, addNotification, setLoading, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
