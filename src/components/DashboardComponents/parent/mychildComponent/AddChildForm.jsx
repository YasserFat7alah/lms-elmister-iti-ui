"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { User, Mail, Phone, Calendar, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateChildMutation } from "@/redux/api/endPoints/childrenApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { GRADE_LEVELS } from "@/lib/constants";

const AddChildForm = () => {
  const router = useRouter();
  const [createChild, { isLoading: isCreating }] = useCreateChildMutation();

  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    password: "",
    grade: "",
    phone: "",
    gender: "male",
    notes: "",
  });

  const schema = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    grade: Yup.string().oneOf(GRADE_LEVELS, "Please select a valid grade").required("Grade is required"),
    phone: Yup.string().optional(),
    gender: Yup.string().oneOf(["male", "female"], "Gender must be male or female").required("Gender is required"),
    notes: Yup.string().max(500, "Notes must be at most 500 characters").optional(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await createChild(values).unwrap();
      toast.success("Child created successfully!");
      resetForm();
      setInitialData({
        name: "",
        email: "",
        password: "",
        grade: "",
        phone: "",
        gender: "male",
        notes: "",
      });
      // Redirect to children page after successful creation
      setTimeout(() => {
        router.push("/dashboard/parent/children");
      }, 1500);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create child. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8 ">

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#392b80] mb-2">
            Add a child
          </h1>
          <p className="text-gray-600">Fill in the details to register a new child</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <Formik
            initialValues={initialData}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
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
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                      errors.password && touched.password
                        ? "border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="At least 8 characters"
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
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="w-full mt-8 bg-gradient-to-r from-[#392b80] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? "Creating..." : "Register Child"}
                </Button>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddChildForm;
