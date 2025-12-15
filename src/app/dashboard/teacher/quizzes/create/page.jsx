"use client"

import { useCreateQuizMutation } from "@/redux/api/endPoints/quizzesApiSlice";
import { useGetMyGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Plus, Trash2, Save, FileText, Calendar, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const CreateQuizForm = () => {
    const router = useRouter();
    const [createQuiz, { isLoading: isCreating }] = useCreateQuizMutation();
    const { data: groups, isLoading: isGroupsLoading, isError: isGroupsError } = useGetMyGroupsQuery();
    console.log(groups);

    const allGroups = Array.isArray(groups?.data)
        ? groups.data
        : Array.isArray(groups?.groups)
            ? groups.groups
            : [];

    const validationSchema = Yup.object({
        title: Yup.string().required('Quiz title is required'),
        description: Yup.string(),
        group: Yup.string().required('Please select a group'),
        dueDate: Yup.date()
            .required('Due date is required')
            .min(new Date(), 'Due date cannot be in the past'),
        duration: Yup.number()
            .min(1, 'Duration must be at least 1 minute')
            .required('Duration is required'),
        questions: Yup.array().of(
            Yup.object({
                text: Yup.string().required('Question text is required'),
                type: Yup.string().oneOf(['mcq', 'true-false', 'short-answer']).required(),
                points: Yup.number().min(1).required('Points are required'),
                options: Yup.array().when('type', {
                    is: 'mcq',
                    then: (schema) => schema.min(2, 'At least 2 options required').required(),
                    otherwise: (schema) => schema.notRequired()
                }),
                correctAnswer: Yup.mixed().required('Correct answer is required')
            })
        ).min(1, 'At least one question is required')
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            group: '',
            dueDate: '',
            duration: 30, // default 30 mins
            questions: [
                {
                    text: '',
                    type: 'mcq',
                    points: 10,
                    options: ['', ''],
                    correctAnswer: ''
                }
            ]
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await createQuiz(values).unwrap();
                toast.success('Quiz created successfully!');
                router.push('/dashboard/teacher/quizzes');
            } catch (error) {
                console.error('Error creating quiz:', error);
                toast.error(`Failed to create quiz: ${error.data?.message || 'Unknown error'}`);
            }
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Quiz</h1>

                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">

                        {/* Basic Info Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                                <FileText className="w-5 h-5 text-indigo-500" />
                                <h2 className="text-lg font-semibold text-gray-900">Quiz Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps('title')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. Chapter 1 Review"
                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        {...formik.getFieldProps('description')}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Instructions for students..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Group</label>
                                    <select
                                        {...formik.getFieldProps('group')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">Select a Group</option>
                                        {allGroups.map(group => (
                                            <option key={group._id} value={group._id}>{group.title}</option>
                                        ))}
                                    </select>
                                    {formik.touched.group && formik.errors.group && (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.group}</div>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-1" /> Due Date
                                        </label>
                                        <input
                                            type="datetime-local"
                                            {...formik.getFieldProps('dueDate')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        {formik.touched.dueDate && formik.errors.dueDate && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.dueDate}</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Clock className="w-4 h-4 inline mr-1" /> Duration (mins)
                                        </label>
                                        <input
                                            type="number"
                                            {...formik.getFieldProps('duration')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        {formik.touched.duration && formik.errors.duration && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.duration}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Questions Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b">
                                <div className="flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-indigo-500" />
                                    <h2 className="text-lg font-semibold text-gray-900">Questions Builder</h2>
                                </div>
                            </div>

                            <FieldArray name="questions">
                                {({ push, remove }) => (
                                    <div className="space-y-8">
                                        {formik.values.questions.map((question, index) => (
                                            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative">
                                                <div className="absolute top-4 right-4">
                                                    {formik.values.questions.length > 1 && (
                                                        <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>

                                                <h3 className="font-medium text-gray-700 mb-4">Question {index + 1}</h3>

                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                                    {/* Question Text */}
                                                    <div className="md:col-span-8">
                                                        <input
                                                            type="text"
                                                            name={`questions.${index}.text`}
                                                            value={question.text}
                                                            onChange={formik.handleChange}
                                                            placeholder="Enter your question here"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                        />
                                                        {formik.touched.questions?.[index]?.text && formik.errors.questions?.[index]?.text && (
                                                            <div className="text-red-500 text-xs mt-1">{formik.errors.questions[index].text}</div>
                                                        )}
                                                    </div>

                                                    {/* Type & Points */}
                                                    <div className="md:col-span-2">
                                                        <select
                                                            name={`questions.${index}.type`}
                                                            value={question.type}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                // Reset options/answer on type change if needed
                                                                if (e.target.value !== 'mcq') {
                                                                    formik.setFieldValue(`questions.${index}.options`, []);
                                                                } else {
                                                                    formik.setFieldValue(`questions.${index}.options`, ['', '']);
                                                                }
                                                                formik.setFieldValue(`questions.${index}.correctAnswer`, '');
                                                            }}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                        >
                                                            <option value="mcq">Multiple Choice</option>
                                                            <option value="true-false">True / False</option>
                                                            <option value="short-answer">Short Answer</option>
                                                        </select>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <input
                                                            type="number"
                                                            name={`questions.${index}.points`}
                                                            value={question.points}
                                                            onChange={formik.handleChange}
                                                            placeholder="Points"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Options Section based on Type */}
                                                <div className="mt-4 pl-4 border-l-2 border-indigo-100">
                                                    {question.type === 'mcq' && (
                                                        <FieldArray name={`questions.${index}.options`}>
                                                            {({ push: pushOption, remove: removeOption }) => (
                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium text-gray-500 mb-2">Options (Select the correct one)</p>
                                                                    {question.options.map((option, optIndex) => (
                                                                        <div key={optIndex} className="flex items-center gap-2">
                                                                            <input
                                                                                type="radio"
                                                                                name={`questions.${index}.correctAnswer`}
                                                                                value={option}
                                                                                checked={question.correctAnswer === option && option !== ''}
                                                                                onChange={formik.handleChange}
                                                                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                name={`questions.${index}.options.${optIndex}`}
                                                                                value={option}
                                                                                onChange={formik.handleChange}
                                                                                placeholder={`Option ${optIndex + 1}`}
                                                                                className="flex-1 px-3 py-1 border border-gray-300 rounded bg-white text-sm"
                                                                            />
                                                                            {question.options.length > 2 && (
                                                                                <button type="button" onClick={() => removeOption(optIndex)} className="text-gray-400 hover:text-red-500">
                                                                                    <Trash2 className="w-4 h-4" />
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => pushOption('')}
                                                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-2 flex items-center"
                                                                    >
                                                                        <Plus className="w-3 h-3 mr-1" /> Add Option
                                                                    </button>
                                                                    {formik.touched.questions?.[index]?.options && typeof formik.errors.questions?.[index]?.options === 'string' && (
                                                                        <div className="text-red-500 text-xs">{formik.errors.questions[index].options}</div>
                                                                    )}
                                                                    {formik.touched.questions?.[index]?.correctAnswer && formik.errors.questions?.[index]?.correctAnswer && (
                                                                        <div className="text-red-500 text-xs mt-1">Please select the correct answer</div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </FieldArray>
                                                    )}

                                                    {question.type === 'true-false' && (
                                                        <div className="flex gap-4 mt-2">
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name={`questions.${index}.correctAnswer`}
                                                                    value="true"
                                                                    checked={String(question.correctAnswer) === 'true'}
                                                                    onChange={formik.handleChange}
                                                                    className="w-4 h-4 text-indigo-600"
                                                                />
                                                                <span>True</span>
                                                            </label>
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name={`questions.${index}.correctAnswer`}
                                                                    value="false"
                                                                    checked={String(question.correctAnswer) === 'false'}
                                                                    onChange={formik.handleChange}
                                                                    className="w-4 h-4 text-indigo-600"
                                                                />
                                                                <span>False</span>
                                                            </label>
                                                            {formik.touched.questions?.[index]?.correctAnswer && formik.errors.questions?.[index]?.correctAnswer && (
                                                                <div className="text-red-500 text-xs ml-2">Required</div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {question.type === 'short-answer' && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500 italic">Short answer questions must be manually graded.</p>
                                                            <input
                                                                type="text"
                                                                name={`questions.${index}.correctAnswer`} // Optional for short answer?
                                                                value={question.correctAnswer}
                                                                onChange={formik.handleChange}
                                                                placeholder="Sample correct answer (for reference)"
                                                                className="w-full mt-1 px-3 py-1 border border-gray-300 rounded bg-white text-sm"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => push({ text: '', type: 'mcq', points: 10, options: ['', ''], correctAnswer: '' })}
                                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-500 hover:text-indigo-500 transition flex items-center justify-center font-medium"
                                        >
                                            <Plus className="w-5 h-5 mr-2" /> Add Next Question
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition disabled:opacity-50 font-semibold"
                            >
                                {isCreating ? 'Publishing...' : 'Publish Quiz'}
                            </button>
                        </div>

                    </form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default CreateQuizForm;
