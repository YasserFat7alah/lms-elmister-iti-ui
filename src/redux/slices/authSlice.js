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

        
        const cookieOptions = { 
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === 'production', // مهم جداً للبرودكشن
            sameSite: 'strict' 
        };

        if (state.userInfo.user?.role) {
          Cookies.set('user_role', state.userInfo.user.role, cookieOptions);
        }

        if (accessToken) {
            Cookies.set('accessToken', accessToken, cookieOptions);
        }

        if (refreshToken) {
            Cookies.set('refreshToken', refreshToken, cookieOptions);
        }
      }
    },
    logout: (state) => {
      state.userInfo = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
        Cookies.remove('user_role');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;