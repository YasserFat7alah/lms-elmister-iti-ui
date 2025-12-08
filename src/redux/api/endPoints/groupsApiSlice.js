import { GROUPS_URL } from '@/constants'; 
import { apiSlice } from '../apiSlice';

export const groupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
getGroupsByCourse: builder.query({
      query: (courseId) => ({
        url: GROUPS_URL, 
        method: 'GET',
        params: { courseId: courseId },
      }),
      providesTags: ['Groups'],
    }),
    createGroup: builder.mutation({
      query: (data) => ({
        url: `${GROUPS_URL}`, 
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Groups'],
    }),
    updateGroup: builder.mutation({
      query: ({ groupId, data }) => ({
        url: `${GROUPS_URL}/${groupId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Groups'], 
    }),

deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `${GROUPS_URL}/${groupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Groups'],
    }),
    }),
});

export const { 
  useGetGroupsByCourseQuery, 
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation
} = groupsApiSlice;