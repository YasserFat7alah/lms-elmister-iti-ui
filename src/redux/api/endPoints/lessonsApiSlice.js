import { apiSlice } from "../apiSlice";


const LESSONS_URL = "/api/v1/lessons"; 
// const LESSONS_URL = "/lessons"; 

export const lessonsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getLessonsByGroup: builder.query({
      query: ({ groupId, page = 1, limit = 50 }) => ({
        // url: `${LESSONS_URL}/group/${groupId}`,
        url: `/lessons/group/${groupId}`,
        params: { page, limit },
      }),
      providesTags: (result) => 
        result 
          ? [{ type: "Lessons", id: "LIST" }] 
          : [{ type: "Lessons", id: "LIST" }],
    }),

    createLesson: builder.mutation({
      query: (data) => ({
        url: LESSONS_URL,
        method: "POST",
        body: data, 
      }),
      invalidatesTags: [{ type: "Lessons", id: "LIST" }],
    }),

    updateLesson: builder.mutation({
      query: ({ lessonId, data }) => ({
        url: `${LESSONS_URL}/${lessonId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Lessons", id: arg.lessonId },
        { type: "Lessons", id: "LIST" },
      ],
    }),

    deleteLesson: builder.mutation({
      query: (lessonId) => ({
        url: `${LESSONS_URL}/${lessonId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Lessons", id: "LIST" }],
    }),



        addLessonMaterial: builder.mutation({
      query: ({ lessonId, data }) => ({
        url: `${LESSONS_URL}/${lessonId}/materials`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Lessons", id: arg.lessonId }],
    }),

    deleteLessonMaterial: builder.mutation({
      query: ({ lessonId, materialId }) => ({
        url: `${LESSONS_URL}/${lessonId}/materials/${materialId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Lessons", id: arg.lessonId }],
    }),

getLessonById: builder.query({
  query: (id) => `${LESSONS_URL}/${id}`,
  providesTags: (result, error, id) => [{ type: "Lessons", id }], 
}),



markAttendance: builder.mutation({
      query: ({ lessonId, attendance }) => ({
        url: `${LESSONS_URL}/${lessonId}/attendance`,
        method: "POST",
        body: { attendance }, 
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Lessons", id: arg.lessonId },
        { type: "Lessons", id: "LIST" } 
      ],
    }),
  }),
});

export const {
  useGetLessonsByGroupQuery,
  useGetLessonByIdQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useMarkAttendanceMutation,
  useAddLessonMaterialMutation,
  useDeleteLessonMaterialMutation
} = lessonsApiSlice;