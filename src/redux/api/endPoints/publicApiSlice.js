import { apiSlice } from "../apiSlice";
import { PUBLIC_COURSES_URL, GROUPS_URL } from "../../../constants";

export const publicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPublicCourses: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams();

                if (params.page) queryParams.append("page", params.page);
                if (params.limit) queryParams.append("limit", params.limit);
                if (params.search) queryParams.append("search", params.search);

                // Subject Filter
                if (params.subject && Array.isArray(params.subject)) {
                    params.subject.forEach(s => queryParams.append("subject", s));
                } else if (params.subject) {
                    queryParams.append("subject", params.subject);
                }

                if (params.selectedSubjects && Array.isArray(params.selectedSubjects)) {
                    params.selectedSubjects.forEach(s => queryParams.append("subject", s));
                }

                // Teacher ID Filter
                if (params.teacherId) queryParams.append("teacherId", params.teacherId);

                // Grade Level Filter (Array)
                if (params.gradeLevel) {
                    if (Array.isArray(params.gradeLevel)) {
                        params.gradeLevel.forEach(g => queryParams.append("gradeLevel", g));
                    } else if (params.gradeLevel !== 'all') {
                        queryParams.append("gradeLevel", params.gradeLevel);
                    }
                }

                // Price Ranges Filter (Array)
                if (params.priceRanges && Array.isArray(params.priceRanges)) {
                    params.priceRanges.forEach(range => queryParams.append("priceRanges", range));
                }

                // Language Filter
                if (params.languageFilter && Array.isArray(params.languageFilter)) {
                    params.languageFilter.forEach(lang => queryParams.append("courseLanguage", lang));
                }

                // Legacy Min/Max (if used)
                if (params.minPrice !== undefined) queryParams.append("minPrice", params.minPrice);
                if (params.maxPrice !== undefined) queryParams.append("maxPrice", params.maxPrice);

                return {
                    url: `${PUBLIC_COURSES_URL}?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["Courses"],
        }),
        getPublicCourseById: builder.query({
            query: (id) => ({
                url: `${PUBLIC_COURSES_URL}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Courses", id }],
        }),
        getPublicGroups: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params.courseId) queryParams.append("courseId", params.courseId);
                // Add other filters if needed
                return {
                    url: `${GROUPS_URL}?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["Groups"],
        }),
        getPublicTeachers: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params.page) queryParams.append("page", params.page);
                if (params.limit) queryParams.append("limit", params.limit);
                if (params.search) queryParams.append("search", params.search);
                if (params.rating) queryParams.append("rating", params.rating);

                if (params.subject && Array.isArray(params.subject)) {
                    params.subject.forEach(s => queryParams.append("subject", s));
                }
                // Also support 'selectedSubjects' for consistency with filter component
                if (params.selectedSubjects && Array.isArray(params.selectedSubjects)) {
                    params.selectedSubjects.forEach(s => queryParams.append("subject", s));
                }

                return {
                    url: `/public/teachers?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["Teachers"],
        }),
        getUserByUsername: builder.query({
            query: (username) => ({
                url: `/public/users/${username}`,
                method: "GET",
            }),
            providesTags: (result, error, username) => [{ type: "Users", id: username }],
        }),
    }),
});

export const {
    useGetPublicCoursesQuery,
    useGetPublicCourseByIdQuery,
    useGetPublicGroupsQuery,
    useGetPublicTeachersQuery,
    useGetUserByUsernameQuery
} = publicApiSlice;
