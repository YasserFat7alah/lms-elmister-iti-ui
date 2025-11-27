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
        
        if (action.payload.user?.role) {
           Cookies.set('user_role', action.payload.user.role, { expires: 7 }); // 7 أيام
        }
      }
    },
    // دالة تسجيل الخروج
    logout: (state) => {
      state.userInfo = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('users_db'); 
        Cookies.remove('user_role'); 
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;