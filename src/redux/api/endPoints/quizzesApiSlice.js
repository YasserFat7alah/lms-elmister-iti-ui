import { apiSlice } from "../apiSlice";

export const quizzesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Teacher: Create Quiz
        createQuiz: builder.mutation({
            query: (quizData) => ({
                url: "/quizzes",
                method: "POST",
                body: quizData,
            }),
            invalidatesTags: ["Quizzes"],
        }),

        // Teacher: Get My Quizzes
        getTeacherQuizzes: builder.query({
            query: () => ({
                url: "/quizzes/my-quizzes",
                method: "GET",
            }),
            providesTags: ["Quizzes"],
        }),

        // Shared: Get Quizzes by Group
        getQuizzesByGroup: builder.query({
            query: (groupId) => ({
                url: `/quizzes/group/${groupId}`,
                method: "GET",
            }),
            providesTags: ["Quizzes"],
        }),

        // Shared: Get Quiz by ID
        getQuizById: builder.query({
            query: (quizId) => ({
                url: `/quizzes/${quizId}`,
                method: "GET",
            }),
            providesTags: ["Quizzes"],
        }),

        // Student: Get All My Quizzes
        getStudentQuizzes: builder.query({
            query: () => ({
                url: "/quizzes/student/my-quizzes",
                method: "GET",
            }),
            providesTags: ["Quizzes"],
        }),

        // Student: Submit Quiz
        submitQuiz: builder.mutation({
            query: ({ quizId, answers }) => ({
                url: `/quizzes/${quizId}/submit`,
                method: "POST",
                body: { answers },
            }),
            invalidatesTags: ["Quizzes", "Submissions"],
        }),

        // Teacher: Get Quiz Submissions
        getQuizSubmissions: builder.query({
            query: (quizId) => ({
                url: `/quizzes/${quizId}/submissions`,
                method: "GET",
            }),
            providesTags: ["Submissions"],
        }),

        // Parent: Get Child Submissions
        getChildSubmissions: builder.query({
            query: (studentId) => ({
                url: `/quizzes/student/${studentId}/submissions`,
                method: "GET",
            }),
            providesTags: ["Submissions"],
        }),

        // Parent: Get Child Quizzes (All)
        getChildQuizzes: builder.query({
            query: (studentId) => ({
                url: `/quizzes/student/${studentId}/quizzes`,
                method: "GET",
            }),
            providesTags: ["Quizzes", "Submissions"],
        }),

        // Student: Get My Quiz Submissions (history)
        getMyQuizSubmissions: builder.query({
            query: (quizId) => {
                let url = "/quizzes/my-submissions";
                if (quizId) url += `?quizId=${quizId}`;
                return {
                    url,
                    method: "GET",
                };
            },
            providesTags: ["Submissions"],
        }),

        // Shared: Get Submission by ID
        getSubmissionById: builder.query({
            query: (submissionId) => ({
                url: `/quizzes/submissions/${submissionId}`,
                method: "GET"
            }),
            providesTags: ["Submissions"]
        }),

        // Teacher: Grade Submission
        gradeSubmission: builder.mutation({
            query: ({ submissionId, additionalScore, feedback }) => ({
                url: `/quizzes/submissions/${submissionId}/grade`,
                method: "PATCH",
                body: { additionalScore, feedback }
            }),
            invalidatesTags: ["Submissions", "Quizzes"]
        })
    }),
});

export const {
    useCreateQuizMutation,
    useGetTeacherQuizzesQuery,
    useGetQuizzesByGroupQuery,
    useGetQuizByIdQuery,
    useGetStudentQuizzesQuery,
    useSubmitQuizMutation,
    useGetQuizSubmissionsQuery,
    useGetChildSubmissionsQuery,
    useGetChildQuizzesQuery,
    useGetMyQuizSubmissionsQuery,
    useGetSubmissionByIdQuery,
    useGradeSubmissionMutation
} = quizzesApiSlice;
