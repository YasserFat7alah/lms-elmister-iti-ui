'use client';
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';

const CommentForm = () => {

    const initialValues = {
        name: "",
        email: "",
        subject: "",
        comments: ""
    };
    
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        subject: Yup.string().required("Subject is required"),
        comments: Yup.string().required("Comments are required"),
    });
    
    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

      
    return (
        <div className="p-4 border rounded-md my-5 mx-4">
            <h3 className="text-lg font-semibold mb-4">Post A Comment</h3>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="space-y-4">

                    {/* NAME + EMAIL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-500">Name</label>
                            <Field
                            name="name"
                            type="text"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="name" component="p" className="text-red-500 text-sm"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-500">Email</label>
                            <Field
                            name="email"
                            type="email"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="email" component="p" className="text-red-500 text-sm"/>
                        </div>
                    </div>

                    {/* SUBJECT */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-500">Subject</label>
                        <Field
                            name="subject"
                            type="text"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="subject" component="p" className="text-red-500 text-sm"/>
                    </div>

                    {/* COMMENTS */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-500">Comments</label>
                        <Field
                            as="textarea"
                            name="comments"
                            rows="4"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="comments" component="p" className="text-red-500 text-sm"/>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <Button type="submit"
                        className="bg-blue-800 px-14 text-white py-2 rounded-lg hover:bg-pink-700 transition"
                    >
                        Submit
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default CommentForm