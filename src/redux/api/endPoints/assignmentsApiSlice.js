import { apiSlice } from "../apiSlice";

export const assignmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ------------------ Create Assignment (Teacher) ------------------
    createAssignment: builder.mutation({
      query: (formData) => ({
        url: "/assignments",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Assignments"],
    }),

    // ------------------ Get assignments by group ------------------
    getAssignmentsByGroup: builder.query({
      query: (groupId) => ({
        url: `/assignments/group/${groupId}`,
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),

    // ------------------ Get assignments by lesson ------------------
    getAssignmentsByLesson: builder.query({
      query: (lessonId) => ({
        url: `/assignments/lesson/${lessonId}`,
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),

    // ------------------ Get assignment by ID ------------------
    getAssignmentById: builder.query({
      query: (assignmentId) => ({
        url: `/assignments/${assignmentId}`,
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),

    // ------------------ Get all assignments for student ------------------
    getStudentAssignments: builder.query({
      query: () => ({
        url: "/assignments/my-assignments",
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),

    // ------------------ Get assignment details for student ------------------
    getStudentAssignmentDetails: builder.query({
      query: (assignmentId) => ({
        url: `/assignments/${assignmentId}`,
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),

  }),
});

export const {
  useCreateAssignmentMutation,
  useGetAssignmentsByGroupQuery,
  useGetAssignmentsByLessonQuery,
  useGetAssignmentByIdQuery,
  useGetStudentAssignmentsQuery,
  useGetStudentAssignmentDetailsQuery,
} = assignmentsApiSlice;
