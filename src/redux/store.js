import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';

// 1. تجميع الـ Reducers في متغير واحد
const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

// 2. عمل Root Reducer (عشان يقدر يصفر الكل)
const rootReducer = (state, action) => {
  // لو الأكشن هو 'auth/logout' -> صفر الستيت بالكامل
  if (action.type === 'auth/logout') {
    // لما نخلي الـ state بـ undefined، الريدكس بيرجعه للحالة الافتراضية (Initial State)
    state = undefined;
  }
  return appReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer, // 3. نستخدم الـ Root Reducer هنا
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};