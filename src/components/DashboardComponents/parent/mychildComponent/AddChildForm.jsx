"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { User, Mail, Phone, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddChildForm = () => {
  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    age: "",
    dateOfBirth: "",
    gender: "",
  });

  const schema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    phone: Yup.string().required("Phone is required"),
    age: Yup.number().required("Age is required").positive().integer(),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted Data:", values);
    setInitialData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      phone: "",
      age: "",
      dateOfBirth: "",
      gender: "",
    });
    resetForm();
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

                {/* First + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Field
                        name="firstName"
                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                          errors.firstName && touched.firstName
                            ? "border-red-300"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Ahmed"
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Field
                        name="lastName"
                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                          errors.lastName && touched.lastName
                            ? "border-red-300"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Mohamed"
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
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

                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Field
                      name="username"
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                        errors.username && touched.username
                          ? "border-red-300"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="ahmed123"
                    />
                  </div>
                  {errors.username && touched.username && (
                    <p className="mt-2 text-sm font-medium text-red-600">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Phone + Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Age
                    </label>
                    <Field
                      name="age"
                      type="number"
                      className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                        errors.age && touched.age
                          ? "border-red-300"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="12"
                    />
                    {errors.age && touched.age && (
                      <p className="mt-2 text-sm font-medium text-red-600">
                        {errors.age}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Field
                      name="dateOfBirth"
                      type="date"
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none focus:bg-white focus:border-blue-500 ${
                        errors.dateOfBirth && touched.dateOfBirth
                          ? "border-red-300"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <p className="mt-2 text-sm font-medium text-red-600">
                      {errors.dateOfBirth}
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
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  {errors.gender && touched.gender && (
                    <p className="mt-2 text-sm font-medium text-red-600">
                      {errors.gender}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-[#392b80] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                  Register Child
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
