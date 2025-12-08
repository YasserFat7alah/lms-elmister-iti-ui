"use client";
import React from "react";
import { Mail, Plus, AlertCircle } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

const AddEmailInput = ({ emails, setEmails }) => {

  // ----- Validation Schema -----
  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .test('unique-email', 'This email is already subscribed', function(value) {
        if (!value) return true;
        return !emails.some(e => e.email.toLowerCase() === value.toLowerCase());
      })
      .trim(),
  });

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={emailSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        const trimmedEmail = values.email.trim();
        if (!trimmedEmail) {
          setSubmitting(false);
          return;
        }

        const newEmailObj = {
          id: Date.now(),
          email: trimmedEmail,
          subscribed: new Date().toISOString().split("T")[0],
        };

        setEmails([newEmailObj, ...emails]);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting, values, setFieldTouched }) => (
        <Form className="mb-6 ">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 ">
            <div className={`relative flex-1`}>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />

              <Field
                name="email"
                type="email"
                placeholder="Enter subscriber email address"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all font-medium
                  ${
                    errors.email && touched.email
                      ? "border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/50 text-red-900 placeholder:text-red-400 "
                      : "border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white"
                  }
                `}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />

              {/* Error Message with Icon */}
              {errors.email && touched.email && (
                <div className="absolute -bottom-5  left-0 flex items-center gap-1.5 text-red-600 text-xs font-medium mt-1 animate-in slide-in-from-top-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <ErrorMessage name="email" />
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || (errors.email && touched.email) || !values.email.trim()}
              onClick={() => setFieldTouched('email', true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all 
                ${
                  isSubmitting || (errors.email && touched.email) || !values.email.trim() 
                    ? "bg-[#392b80] text-white"
                    : " text-white cursor-pointer "
                }
              `}
            >
              <Plus className="w-5 h-5" />
              Add
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddEmailInput;