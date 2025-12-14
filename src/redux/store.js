import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { chatApiSlice } from './api/endPoints/chatApiSlice';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import notificationReducer from './slices/notificationSlice';

const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  chat: chatReducer,
  notifications: notificationReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};