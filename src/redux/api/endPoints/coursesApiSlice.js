import { COURSES_URL } from '@/constants'; 
import { apiSlice } from '../apiSlice';

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: COURSES_URL,
        method: 'GET',
      }),
      providesTags: ['Courses'],
      keepUnusedDataFor: 5,
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),
  }),
});

export const { useGetCoursesQuery ,useGetCourseByIdQuery } = coursesApiSlice;