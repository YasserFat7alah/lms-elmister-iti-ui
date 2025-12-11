import { apiSlice } from '../apiSlice';
import { USERS_URL, USERS_URL_DATA } from '@/constants';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),

    logoutApi: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),

    getMe: builder.query({
      query: () => `${USERS_URL_DATA}/me`,
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),

    updateMe: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL_DATA}/me`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL_DATA}/me/avatar`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/change-password`,
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'POST',
        body: data,
      }),

    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password`,
        method: 'POST',
        body: data,
      }),
    }),
    completeProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/complete-profile`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getMyChildren: builder.query({
      query: (courseId) => ({
        url: `${USERS_URL_DATA}/me/children`,
        method: 'GET',
        params: { courseId }
      }),
      providesTags: ['Children']
    }),


  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useLogoutApiMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useUploadAvatarMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCompleteProfileMutation,
  useGetMyChildrenQuery
} = usersApiSlice;