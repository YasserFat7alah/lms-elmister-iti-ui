import { apiSlice } from '../apiSlice';

const CLOUDINARY_URL = "/api/v1/cloudinary"; 

export const cloudinaryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ التعديل: بنبعت formData بس (جواه الفايل والمسار والنوع)
    uploadOne: builder.mutation({
      query: (formData) => ({
        url: `${CLOUDINARY_URL}/upload-one`,
        method: 'POST',
        body: formData,
        // شيلنا params: { path, type } خلاص
      }),
    }),

    deleteOne: builder.mutation({
      query: (publicId) => ({
        url: `${CLOUDINARY_URL}/delete-one`,
        method: 'POST',
        body: { publicId },
      }),
    }),

  }),
});

export const { useUploadOneMutation, useDeleteOneMutation } = cloudinaryApiSlice;