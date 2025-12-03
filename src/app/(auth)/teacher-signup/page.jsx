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

export default function TeacherSignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [register, { isLoading }] = useRegisterMutation();
  const [serverError, setServerError] = useState("");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
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
      
      router.push("/dashboard/teacher/complete-profile");
      
    } catch (err) {
      console.error("Registration Error:", err);
      setServerError(err?.data?.message || err?.data?.error || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      
      <div className="hidden lg:block relative h-screen bg-black overflow-hidden">
         <div className="absolute inset-0 bg-blue-900/40 z-10 mix-blend-multiply" />
         <img
           src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764722342/pexels-fauxels-3184644_w3ztts.jpg"
           alt="Instructor teaching"
           className="object-fit opacity-90 h-full w-full object-cover "
           priority
         />
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-8 bg-gray-50 h-full overflow-y-auto">
        
        <div className="mx-auto grid w-full max-w-[500px] gap-6">
         <div className="mb-4 flex items-center justify-between">
    <Link 
    href="/" 
    className="inline-block px-2 py-2 bg-[#ff5372] text-white rounded hover:bg-[#ff274f]"
  >
    Back Home
  </Link>
           <Image src={logo} alt="El-Mister Logo" className="h-10 w-auto" />
         </div>
         
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Become an Instructor</h1>
            <p className="text-muted-foreground">Sign up as a teacher to start your journey.</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={teacherSignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                
                <FormikInput label="Full Name" name="name" placeholder="Dr. Ahmed Ali" />
                <FormikInput label="Email" name="email" type="email" placeholder="instructor@example.com" />
                <FormikInput label="Phone Number" name="phone" placeholder="01xxxxxxxxx" />
                <FormikInput label="age" name="age" placeholder="enter " />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormikPassword label="Password" name="password" placeholder="******" />
                    <FormikPassword label="Confirm Password" name="confirmPassword" placeholder="******" />
                </div>

                {serverError && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <span className="font-bold">Error:</span> {serverError}
                  </div>
                )}

                <Button 
                    type="submit" 
                    className="w-full bg-[#FF0055] hover:bg-pink-700 h-12 text-base font-semibold shadow-lg shadow-pink-200/50 transition-all" 
                    disabled={isLoading || isSubmitting}
                >
                  {isLoading ? <Spinner className="text-white" /> : "Create Instructor Account"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-sm text-gray-500">
            Already have an account? 
            <Link href="/login" className="underline font-semibold text-[#FF0055] ml-1 hover:text-pink-700">
                Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}