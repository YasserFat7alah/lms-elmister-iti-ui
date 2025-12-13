"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { teacherSignupSchema } from "@/lib/validations";
import { useRegisterMutation } from "@/redux/api/endPoints/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";
import FormikInput from "@/components/authComponents/FormikInput";
import FormikPassword from "@/components/authComponents/FormikPassword";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import LogoLoader from "@/components/shared/LogoLoader";

export default function TeacherSignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [serverError, setServerError] = useState("");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
    role: "teacher",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      const { confirmPassword, ...payload } = values;
      const res = await register(payload).unwrap();
      const { user, accessToken } = res.data || res;
      dispatch(setCredentials({ user, accessToken }));
      router.push("/completeProfile");
    } catch (err) {
      setServerError(err?.data?.message || err?.data?.error || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <LogoLoader variant="pulse" background="bg-white" />;
  }

  const btnPrimary = "inline-flex items-center gap-2 px-4 py-2 h-10 rounded-md bg-gradient-to-r from-[#FF4667] to-[#FF0055] text-white font-medium shadow-sm transition";
  const btnOutline = "inline-flex items-center gap-2 px-4 py-2 h-10 rounded-md bg-white border border-gray-200 text-gray-700 font-medium shadow-sm transition";

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:block relative h-screen">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764722342/pexels-fauxels-3184644_w3ztts.jpg"
            alt="Instructor teaching"
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-8 bg-gray-50">
        <div className="mx-auto w-full max-w-[500px] gap-6">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/">
              <p className={btnPrimary}>Back Home</p>
            </Link>

            <div className="flex items-center">
              <Image src={logo} alt="El-Mister Logo" width={140} height={40} priority />
            </div>
          </div>

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Become an Instructor</h1>
            <p className="text-sm text-muted-foreground ">Sign up as a teacher to start your journey.</p>
          </div>

          <Formik initialValues={initialValues} validationSchema={teacherSignupSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-4 mt-2">
                <FormikInput label="Full Name" name="name" placeholder="Enter your full name" />
                <FormikInput label="Email" name="email" type="email" placeholder="teacher@example.com" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormikInput label="Phone Number" name="phone" placeholder="01xxxxxxxxx" />
                  <FormikInput label="Age" name="age" placeholder="e.g. 30" type="number" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormikPassword label="Password" name="password" placeholder="******" />
                  <FormikPassword label="Confirm Password" name="confirmPassword" placeholder="******" />
                </div>

                {serverError && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <span className="font-semibold">Error:</span>
                    <span>{serverError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-[#FF4667] hover:bg-[#FF2855] shadow-lg transition"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading || isSubmitting ? <Spinner className="text-white" /> : "Create Instructor Account"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-sm text-gray-500 mt-3">
            Already have an account?
            <Link href="/login">
              <p className="underline font-semibold text-[#FF4667] ml-1 hover:text-[#FF2855]">Log in</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
