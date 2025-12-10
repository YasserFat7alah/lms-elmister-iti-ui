'use client';
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { useCreateCommentMutation } from '@/redux/api/endPoints/commentsApiSlice';

const CommentForm = ({ targetId, targetModel }) => {
    const { userInfo } = useSelector(state => state.auth);
    const [loginError, setLoginError] = useState("");
    const [createComment, { isLoading }] = useCreateCommentMutation();

    const initialValues = {
        comment: "",
    };



    const handleSubmit = async (values, { resetForm }) => {

        if (!userInfo) {
            setLoginError("You must login to post a comment");
            return;
        }

        try {
            await createComment({
                targetId,
                targetModel: targetModel || 'Course',
                content: values.comment
            }).unwrap();

            resetForm();
            setLoginError("");
        } catch (err) {
            setLoginError(err?.data?.message || "Failed to post comment");
        }
    };

    return (
        <div className="">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form className=" flex flex-col md:flex-row  gap-4 justify-between">

                        {/* COMMENT INPUT */}
                        <div className='w-full'>
                            <Field
                                placeholder="Write a comment..."
                                name="comment"
                                type="text"
                                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* LOGIN ERROR */}
                            {loginError && (
                                <p className="text-red-500 text-sm mt-1">{loginError}</p>
                            )}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <Button
                            type="submit"
                            disabled={isLoading || !values.comment?.trim()}
                            className="bg-blue-800 w-fit text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Posting...' : 'Comment'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CommentForm;
