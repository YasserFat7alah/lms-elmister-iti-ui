"use client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { User, Mail, Phone, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateChildMutation, useGetChildByIdQuery } from "@/redux/api/endPoints/childrenApiSlice";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FullPageLoader } from "@/components/shared/Loader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { IoReturnUpBack } from "react-icons/io5";
import { GRADE_LEVELS } from "@/lib/constants";

const EditChildPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const { data: childData, isLoading: isLoadingChild, isError, error } = useGetChildByIdQuery(id, {
        skip: !id, // Skip query if id is not available
    });
    const [updateChild, { isLoading: isUpdating }] = useUpdateChildMutation();

    // Debug logging (remove in production)
    React.useEffect(() => {
        if (childData) {
            console.log('Child Data Response (Edit):', childData);
        }
        if (isError) {
            console.error('Error fetching child (Edit):', error);
        }
        if (!id) {
            console.warn('No child ID in URL params (Edit)');
        }
    }, [childData, isError, error, id]);

    if (!id) {
        return (
            <div className='max-w-2xl mx-auto p-4'>
                <Link href={`/dashboard/parent/children`}
                    className=" text-pink-500 font-semibold pb-2 flex items-center gap-2 my-2"
                >
                    <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                    <span className="border-b pb-2">Back</span>
                </Link>
                <Alert variant="destructive">
                    <AlertDescription>Invalid child ID in URL.</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (isLoadingChild) {
        return <FullPageLoader message="Loading child details..." />;
    }

    if (isError) {
        return (
            <div className='max-w-2xl mx-auto p-4'>
                <Link href={`/dashboard/parent/children/${id}`}
                    className=" text-pink-500 font-semibold pb-2 flex items-center gap-2 my-2"
                >
                    <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                    <span className="border-b pb-2">Back</span>
                </Link>
                <Alert variant="destructive">
                    <AlertDescription>
                        {error?.data?.message || error?.message || "Failed to load child details. Please try again."}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // transformResponse extracts the data field, so childData is the child object directly
    const child = childData;

    // If we have data but it's empty or doesn't have expected fields, show not found
    if (!child || (typeof child === 'object' && Object.keys(child).length === 0)) {
        return (
            <div className='max-w-2xl mx-auto p-4'>
                <Link href={`/dashboard/parent/children/${id}`}
                    className=" text-pink-500 font-semibold pb-2 flex items-center gap-2 my-2"
                >
                    <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                    <span className="border-b pb-2">Back</span>
                </Link>
                <Alert>
                    <AlertDescription>
                        Child not found. The child may not exist or you may not have permission to view it.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const initialValues = {
        name: child?.name || "",
        email: child?.email || "",
        password: "",
        grade: child?.grade || "",
        phone: child?.phone || "",
        gender: child?.gender || "male",
        notes: child?.notes || "",
    };

    const schema = Yup.object({
        name: Yup.string().min(2, "Name must be at least 2 characters").optional(),
        email: Yup.string().email("Invalid email").optional(),
        password: Yup.string().min(8, "Password must be at least 8 characters").optional(),
        grade: Yup.string().oneOf(GRADE_LEVELS, "Please select a valid grade").optional(),
        phone: Yup.string().optional(),
        gender: Yup.string().oneOf(["male", "female"], "Gender must be male or female").optional(),
        notes: Yup.string().max(500, "Notes must be at most 500 characters").optional(),
    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            // Remove empty password field if not provided
            const updateData = { ...values };
            if (!updateData.password) {
                delete updateData.password;
            }
            // Remove empty fields
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === "" || updateData[key] === null) {
                    delete updateData[key];
                }
            });

            if (Object.keys(updateData).length === 0) {
                toast.info("No changes to save");
                setSubmitting(false);
                return;
            }

            await updateChild({ id, ...updateData }).unwrap();
            toast.success("Child updated successfully!");
            router.push(`/dashboard/parent/children/${id}`);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update child. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href={`/dashboard/parent/children/${id}`}
                        className=" text-pink-500 font-semibold pb-2 flex items-center gap-2 mb-4"
                    >
                        <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                        <span className="border-b pb-2">Back to Child Details</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#392b80] mb-2">
                        Edit Child Information
                    </h1>
                    <p className="text-gray-600">Update your child's details</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="p-6 sm:p-8 space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Field
                                            name="name"
                                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                                                errors.name && touched.name
                                                    ? "border-red-300"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="Ahmed Mohamed"
                                        />
                                    </div>
                                    {errors.name && touched.name && (
                                        <p className="mt-2 text-sm font-medium text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Field
                                            name="email"
                                            type="email"
                                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                                                errors.email && touched.email
                                                    ? "border-red-300"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="ahmed@example.com"
                                        />
                                    </div>
                                    {errors.email && touched.email && (
                                        <p className="mt-2 text-sm font-medium text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        New Password (Leave blank to keep current)
                                    </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                                            errors.password && touched.password
                                                ? "border-red-300"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        placeholder="Leave blank to keep current password"
                                    />
                                    {errors.password && touched.password && (
                                        <p className="mt-2 text-sm font-medium text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Grade */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Grade Level
                                    </label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        <Field
                                            as="select"
                                            name="grade"
                                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 appearance-none cursor-pointer ${
                                                errors.grade && touched.grade
                                                    ? "border-red-300"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <option value="">Select grade</option>
                                            {GRADE_LEVELS.map((grade) => (
                                                <option key={grade} value={grade}>
                                                    Grade {grade}
                                                </option>
                                            ))}
                                        </Field>
                                    </div>
                                    {errors.grade && touched.grade && (
                                        <p className="mt-2 text-sm font-medium text-red-600">
                                            {errors.grade}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Phone (Optional)
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Field
                                            name="phone"
                                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                                                errors.phone && touched.phone
                                                    ? "border-red-300"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="(+20) 00-0000-0000"
                                        />
                                    </div>
                                    {errors.phone && touched.phone && (
                                        <p className="mt-2 text-sm font-medium text-red-600">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Gender
                                    </label>
                                    <Field
                                        as="select"
                                        name="gender"
                                        className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 appearance-none cursor-pointer ${
                                            errors.gender && touched.gender
                                                ? "border-red-300"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Field>
                                    {errors.gender && touched.gender && (
                                        <p className="mt-2 text-sm font-medium text-red-600">
                                            {errors.gender}
                                        </p>
                                    )}
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Notes (Optional)
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="notes"
                                        rows="3"
                                        className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                                            errors.notes && touched.notes
                                                ? "border-red-300"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        placeholder="Any additional notes about your child..."
                                    />
                                    {errors.notes && touched.notes && (
                                        <p className="mt-2 text-sm font-medium text-red-600">
                                            {errors.notes}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.back()}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isUpdating || isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-[#392b80] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isUpdating || isSubmitting ? "Updating..." : "Update Child"}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditChildPage;

