import { apiSlice } from '../apiSlice';

const CLOUDINARY_URL = "/cloudinary";

export const cloudinaryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    uploadOne: builder.mutation({
      query: (formData) => ({
        url: `${CLOUDINARY_URL}/upload-one`,
        method: 'POST',
        body: formData,
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