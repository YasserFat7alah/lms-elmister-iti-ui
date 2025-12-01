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
        method: 'PUT',
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

  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useChangePasswordMutation,
  useLogoutApiMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useUploadAvatarMutation 
} = usersApiSlice;