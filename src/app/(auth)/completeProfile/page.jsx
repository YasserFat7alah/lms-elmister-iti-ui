"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useCompleteProfileMutation } from "@/redux/api/endPoints/usersApiSlice"; 
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";
import FormikInput from "@/components/authComponents/FormikInput";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const completeProfileSchema = Yup.object().shape({
  gender: Yup.string().oneOf(["male", "female"], "Invalid gender").required("Required"),
  bio: Yup.string().min(10, "Bio must be at least 10 characters").required("Required"),
  yearsOfExperience: Yup.number().min(0, "Invalid years").required("Required"),
  subjects: Yup.string().required("Please enter at least one subject"),
  degree: Yup.string().required("Degree is required"),
  university: Yup.string().required("University is required"),
  graduationYear: Yup.number()
    .min(1950, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year")
    .required("Required"),
});

export default function CompleteProfilePage() {
  const router = useRouter();
const [completeProfile, { isLoading }] = useCompleteProfileMutation();
  const [serverError, setServerError] = useState("");
  const initialValues = {
    gender: "male",
    bio: "",
    yearsOfExperience: 0,
    subjects: "", 
    degree: "",
    university: "",
    graduationYear: "",
  };

const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      // 1. Prepare Arrays
      const subjectsArray = values.subjects.split(",").map((s) => s.trim()).filter((s) => s !== "");
      const qualificationsArray = [{
        degree: values.degree,
        university: values.university,
        year: Number(values.graduationYear),
      }];

      // 2. Payload: EVERYTHING FLAT (No teacherData wrapper)
      const payload = {
        gender: values.gender,
        bio: values.bio,
        yearsOfExperience: Number(values.yearsOfExperience),
        subjects: subjectsArray,
        qualifications: qualificationsArray
      };

      console.log("Sending Flat Payload:", payload);

      // 3. Send Request
const res = await completeProfile(payload).unwrap();
      router.push("/dashboard/teacher/analytics");
      
    } catch (err) {
      console.error("Complete Profile Error:", err);
      setServerError(err?.data?.message || "Invalid Data Format");
    } finally {
      setSubmitting(false);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Image src={logo} alt="Logo" className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell students more about your expertise.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={initialValues}
            validationSchema={completeProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5">
                
                {/* Gender Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <Field
                    as="select"
                    name="gender"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#FF0055] focus:border-[#FF0055] sm:text-sm rounded-md"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio & About You</label>
                    <Field
                        as="textarea"
                        name="bio"
                        rows={3}
                        className={`mt-1 block w-full p-2 border ${touched.bio && errors.bio ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-[#FF0055] focus:border-[#FF0055] sm:text-sm`}
                        placeholder="Expert in Mathematics..."
                    />
                     <ErrorMessage name="bio" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Years of Experience */}
                <FormikInput 
                    label="Years of Experience" 
                    name="yearsOfExperience" 
                    type="number" 
                    placeholder="e.g. 5" 
                />

                {/* Subjects */}
                <div>
                    <FormikInput 
                        label="Subjects (Comma Separated)" 
                        name="subjects" 
                        placeholder="Math, Mechanics, Physics" 
                    />
                    <p className="text-xs text-gray-400 mt-1">Separate subjects with a comma.</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Latest Qualification</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <FormikInput label="Degree" name="degree" placeholder="Bachelor's, Master's" />
                        <FormikInput label="University" name="university" placeholder="Alexandria University" />
                        <FormikInput label="Graduation Year" name="graduationYear" type="number" placeholder="2019" />
                    </div>
                </div>

                {serverError && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    {serverError}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF0055] hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? <Spinner className="text-white" /> : "Save & Continue"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}