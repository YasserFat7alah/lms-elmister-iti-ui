"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/authComponents/FormikInput"; 
import { Spinner } from "@/components/shared/Loader";
import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useResetPasswordMutation } from "@/redux/api/endPoints/usersApiSlice";
import { useEffect, useState } from "react";

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  otp: Yup.string().required("OTP is required").length(6, "OTP must be 6 characters"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Confirm Password is required"),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const emailFromUrl = searchParams.get('email') || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleFormikSubmit = async (values, { resetForm }) => {
    try {
        console.log("Values from Formik:", values);
const dataToSend = {
        email: values.email,
        otp: values.otp,
        newPassword: values.password 
      };
      
      console.log("Data being sent to Backend:", dataToSend); 
      const res = await resetPassword(dataToSend).unwrap();
      
      alert("Password reset successfully! You can login now.");
      
      router.push("/login");
      
    } catch (err) {
      alert(err?.data?.message || err.error || "Failed to reset password");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-[800px] bg-gray-50">
      
      <div className="hidden bg-muted lg:block relative h-full">
        <img
          src="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop"
          alt="Security Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          
          {/* Header & Logo */}
          <div className="mb-4 flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-block px-2 py-2 bg-[#ff5372] text-white rounded hover:bg-[#ff274f]"
            >
              Back Home
            </Link>

            <Image src={logo} alt="El-Mister Logo" className="h-12 w-auto" />
          </div>

          <div className="grid gap-2 text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <LockKeyhole className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Set New Password</h1>
            <p className="text-muted-foreground">
              Enter the OTP sent to your email and your new password.
            </p>
          </div>
          
          {/* Formik Integration */}
          <Formik
            initialValues={{ 
                email: emailFromUrl, // لو الإيميل جاي في الرابط هيتكتب لوحده
                otp: "", 
                password: "", 
                confirmPassword: "" 
            }}
            validationSchema={resetPasswordSchema}
            enableReinitialize // مهم عشان لو الإيميل اتأخر في التحميل الفورم يحدث نفسه
            onSubmit={handleFormikSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                
                {/* Email Field */}
                <FormikInput label="Email Address" name="email" type="email" placeholder="name@example.com" />

                {/* OTP Field */}
                <FormikInput label="OTP Code" name="otp" type="text" placeholder="Enter 6-digit code" />

                {/* Password Fields */}
                <FormikInput label="New Password" name="password" type="password" placeholder="******" />
                <FormikInput label="Confirm Password" name="confirmPassword" type="password" placeholder="******" />

                <Button 
                  type="submit" 
                  className="w-full bg-[#FF4667] hover:bg-[#ff274f] mt-4" 
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? <Spinner /> : "Reset Password"}
                </Button>
                
              </Form>
            )}
          </Formik>
          
          <div className="mt-4 text-center text-sm">
             <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>  
  );
}