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
      state.userInfo = action.payload;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        
        if (action.payload.accessToken) {
           Cookies.set('token', action.payload.accessToken, { expires: 7 }); 
        }

        if (action.payload.user?.role) {
           Cookies.set('user_role', action.payload.user.role, { expires: 7 }); 
        }
      }
    },
    logout: (state) => {
      state.userInfo = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
        Cookies.remove('token');
        Cookies.remove('user_role'); 
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;