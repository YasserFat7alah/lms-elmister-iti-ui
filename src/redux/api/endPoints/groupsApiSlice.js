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



    getAllGroups: builder.query({
      query: (params) => ({
        url: GROUPS_URL,
        method: 'GET',
        params: params,
      }),
      providesTags: ['Groups'],
    }),

getGroupById: builder.query({
      query: (groupId) => ({
        url: `${GROUPS_URL}/${groupId}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Groups', id }],
    }),

    addStudentToGroup: builder.mutation({
  query: ({ groupId, email }) => ({ 
    url: `/groups/${groupId}/students`, 
    method: "POST",
    body: { email }, 
  }),
  invalidatesTags: (result, error, arg) => [{ type: "Groups", id: arg.groupId }],
}),
getMyGroups: builder.query({
      query: () => ({
        url: GROUPS_URL, 
        method: 'GET',
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
  useGetMyGroupsQuery,
  useGetAllGroupsQuery,
  useGetGroupsByCourseQuery, 
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useGetGroupByIdQuery,
  useAddStudentToGroupMutation
} = groupsApiSlice;