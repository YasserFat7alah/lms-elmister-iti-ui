import { apiSlice } from "../apiSlice";
import { PUBLIC_COURSES_URL } from "../../../constants";

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
    }),
});

export const { useGetPublicCoursesQuery } = publicApiSlice;
