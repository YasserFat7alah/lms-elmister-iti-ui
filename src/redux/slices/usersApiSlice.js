import { apiSlice } from './apiSlice';
import { USERS_URL } from '@/constants'; // تأكد إن قيمتها '/api/v1/auth'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. تسجيل الدخول (Login)
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`, // الرابط النهائي: /api/v1/auth/login
        method: 'POST',
        body: data,
      }),
    }),

    // 2. إنشاء حساب جديد (Register)
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`, // الرابط النهائي: /api/v1/auth/register
        method: 'POST',
        body: data,
      }),
    }),

    // 3. تسجيل الخروج (Logout)
    // بنبعت طلب للباك إند عشان يمسح الـ Refresh Token من الكوكيز
    logoutApi: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // الرابط النهائي: /api/v1/auth/logout
        method: 'POST',
      }),
    }),

    // 4. تحديث البروفايل (Profile Update - اختياري للمستقبل)

  }),
});

// تصدير الـ Hooks لاستخدامها في الصفحات (Components)
export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutApiMutation,
} = usersApiSlice;