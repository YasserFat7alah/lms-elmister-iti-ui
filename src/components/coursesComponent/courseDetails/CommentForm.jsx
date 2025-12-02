'use client';
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

const CommentForm = ({ isLoggedIn }) => {
    const {userInfo} = useSelector(state => state.auth);
    const [loginError, setLoginError] = useState("");

    const initialValues = {
        comment: "",
    };
    
    const validationSchema = Yup.object({
        comment: Yup.string().required('Comment is required')
    });
    
    const handleSubmit = (values, { resetForm }) => {

        if (!userInfo) {
            setLoginError("You must login to post a comment");
            return;
        }

        console.log("Comment submitted:", values.comment);
        resetForm();
        setLoginError("");
    };

    return (
        <div className="p-4 border rounded-md my-5 mx-4">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className=" flex flex-col md:flex-row  gap-4 justify-between">

                    {/* COMMENT INPUT */}
                    <div className='w-full'>
                        <Field
                            placeholder="Write a comment..."
                            name="comment"
                            type="text"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* VALIDATION ERROR */}
                        <ErrorMessage
                            name="comment"
                            component="p"
                            className="text-red-500 text-sm"
                        />

                        {/* LOGIN ERROR */}
                        {loginError && (
                            <p className="text-red-500 text-sm mt-1">{loginError}</p>
                        )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <Button
                        type="submit"
                        className="bg-blue-800 w-fit text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
                    >
                        Submit
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default CommentForm;
