'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import  FormikInput  from '@/components/authComponents/FormikInput';
import FormikSelect  from '@/components/authComponents/FormikSelect';
import { FormikTextarea}  from '@/components/authComponents/FormikTextarea';
import { categories, addNewPost } from '@/data/mockPosts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must not exceed 100 characters'),
  excerpt: Yup.string()
    .required('Excerpt is required')
    .min(20, 'Excerpt must be at least 20 characters')
    .max(200, 'Excerpt must not exceed 200 characters'),
  content: Yup.string()
    .required('Content is required')
    .min(50, 'Content must be at least 50 characters'),
  author: Yup.string()
    .required('Author name is required'),
  category: Yup.string()
    .required('Category is required'),
  image: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required')
});

export default function CreateBlogPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial values
  const initialValues = {
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: ''
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost = savePostToLocalStorage(values);
      
      console.log('Post created:', newPost);
      console.log('All posts:', getPostsFromLocalStorage());
      
      resetForm();
      
      router.push(`/blog/${newPost.id}`);
      
    } catch (error) {
      console.error('Error creating the post:', error);
      alert('An error occurred while saving the article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Create New Article
            </h1>
          </div>
          
          <p className="text-gray-600 text-center text-lg">
            Share your knowledge and expertise with the learning community
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-6">

                <FormikInput
                  name="title"
                  label="Article Title"
                  placeholder="Enter the article title..."
                  type="text"
                />

                <FormikInput
                  name="author"
                  label="Author Name"
                  placeholder="Enter the author's name..."
                  type="text"
                />

                <FormikSelect
                  name="category"
                  label="Category"
                  options={categories === null ? [] : categories.map((category) => ({ value: category, label: category }))}
                />

                <FormikInput
                  name="image"
                  label="Main Image URL"
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />

                <FormikTextarea
                  name="excerpt"
                  label="Article Excerpt"
                  placeholder="Write a short excerpt about the article..."
                  rows={3}
                />

                <FormikTextarea
                  name="content"
                  label="Article Content"
                  placeholder="Write the full article content here..."
                  rows={8}
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2 text-right">
                    Tips for writing a great article:
                  </h3>
                  <ul className="text-blue-700 text-sm space-y-1 text-right">
                    <li>• Use subheadings to divide content</li>
                    <li>• Add practical examples from your experience</li>
                    <li>• Review grammar and spelling</li>
                    <li>• Ensure accuracy of information</li>
                  </ul>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={!isValid || !dirty || isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Publishing...
                      </>
                    ) : (
                      'Publish Article'
                    )}
                  </button>
                  
                  <Link
                    href="/blog"
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
                  >
                    Cancel
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2 text-right">
            Note:
          </h3>
          <p className="text-yellow-700 text-sm text-right">
            This is a demo form. In a real application, this form will be connected
            to a database with features like image uploading and an advanced text editor.
          </p>
        </div>
      </div>
    </div>
  );
}
