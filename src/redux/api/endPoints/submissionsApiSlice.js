import { apiSlice } from "../apiSlice";

export const submissionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ------------------ Student Submit Assignment ------------------
    submitAssignment: builder.mutation({
      query: ({ assignmentId, formData }) => ({
        url: `/submissions/${assignmentId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Submissions"],
    }),

    // ------------------ Get student OR parent submissions for one assignment ------------------
    getUserSubmissionsByAssignment: builder.query({
      query: (assignmentId) => ({
        url: `/submissions/${assignmentId}`,
        method: "GET",
      }),
      providesTags: ["Submissions"],
    }),

    // ------------------ Teacher: Get all submissions for an assignment ------------------
    getAllSubmissionsForTeacher: builder.query({
      query: (assignmentId) => ({
        url: `/submissions/${assignmentId}/all`,
        method: "GET",
      }),
      providesTags: ["Submissions"],
    }),

    // ------------------ Teacher: Grade submission ------------------
    gradeSubmission: builder.mutation({
      query: ({ submissionId, data }) => ({
        url: `/submissions/${submissionId}/grade`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Submissions"],
    }),

    // ------------------ Student: Get ALL submissions for logged-in user ------------------
    getMySubmissions: builder.query({
      query: () => ({
        url: "/submissions/me",
        method: "GET",
      }),
      providesTags: ["Submissions"],
    }),

  }),
});

export const {
  useSubmitAssignmentMutation,
  useGetUserSubmissionsByAssignmentQuery,
  useGetAllSubmissionsForTeacherQuery,
  useGradeSubmissionMutation,
  useGetMySubmissionsQuery,     // <-- important export
} = submissionsApiSlice;
