import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

const initialState = {
  userInfo: getUserFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
        refreshToken: refreshToken || state.userInfo?.refreshToken,
        user: {
          ...state.userInfo?.user,
          ...user
        }
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));

        if (accessToken) {
          Cookies.set('accessToken', accessToken, { expires: 1 });
        }

        if (refreshToken) {
          Cookies.set('refreshToken', refreshToken, { expires: 7 });
        }

        if (state.userInfo.user?.role) {
          Cookies.set('user_role', state.userInfo.user.role, { expires: 7 });
        }
      }
    },
    logout: (state) => {
      state.userInfo = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('user_role');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;