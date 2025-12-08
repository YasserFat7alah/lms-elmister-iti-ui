import { COURSES_URL } from '@/constants'; 
import { apiSlice } from '../apiSlice';

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
getCourses: builder.query({
      query: (params) => ({
        url: COURSES_URL,
        method: 'GET',
        params: params,
      }),
      providesTags: ['Courses'],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: COURSES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Courses'],
    }),

deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses'],
    }),    
    
    
    updateCourse: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `${COURSES_URL}/${courseId}`,
        method: 'PATCH', 
        body: data,   
      }),
      invalidatesTags: (result, error, arg) => [
        'Courses', 
        { type: 'Courses', id: arg.courseId }
      ],
    }),

  }),
});

export const { useGetCoursesQuery, useDeleteCourseMutation ,useGetCourseByIdQuery ,useCreateCourseMutation, 
  useUpdateCourseMutation } = coursesApiSlice;