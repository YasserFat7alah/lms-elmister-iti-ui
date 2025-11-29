"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signupSchema } from "@/lib/validations"; 
import { useRegisterMutation } from "@/redux/api/endPoints/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";
import FormikInput from "@/components/authComponents/FormikInput";
import FormikPassword from "@/components/authComponents/FormikPassword";
import Image from "next/image";


export default function ParentSignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [serverError, setServerError] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // 1. زودناها هنا
    age: "",
    phone: "", 
    role: "parent", 
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      // 2. تنظيف البيانات قبل الإرسال
      // بناخد نسخة من values ونشيل منها confirmPassword
      const { confirmPassword, ...rest } = values; 

      const payload = { 
        ...rest, // بنبعت كل حاجة ما عدا تأكيد الباسورد
        role: "parent" 
      };
      
      if (payload.age) payload.age = Number(payload.age);

      const res = await register(payload).unwrap();
      const { user, accessToken } = res.data || res; 
      
      dispatch(setCredentials({ user, accessToken }));
      router.push("/parent");
      
    } catch (err) {
      setServerError(err?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* الجزء الجانبي (الصورة) زي ما هو... */}
      
      <div className="hidden lg:block relative h-full">
         <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-12 text-white">
          <img
           src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
           alt="Classroom"
           className="h-full w-full object-cover absolute inset-0 -z-10"
          />
          {/* <h2 className="text-4xl font-bold mb-4">Parent Portal</h2>
          <p className="text-lg">Track your child's progress easily.</p> */}
         </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-8 bg-gray-50">
        
        <div className="mx-auto grid w-full max-w-[500px] gap-6">
         
         
          <div className="grid gap-2 text-center">
            
<Image 
  src="/imgs/Logo.png" 
  alt="Logo"
  width={100}        // حط أي مقاس مناسب
  height={100}
/>
            <h1 className="text-3xl font-bold">Sign into Your Account</h1>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                
                <FormikInput label="Full Name" name="name" placeholder="Parent Name" />
                <FormikInput label="Email" name="email" type="email" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormikInput label="Age" name="age" type="number" />
                    <FormikInput label="Phone Number" name="phone" placeholder="+20..." />
                </div>

                {/* 3. حقول الباسورد */}
                <div className="grid grid-cols-1 gap-4">
                    <FormikPassword label="Password" name="password" />
                    <FormikPassword 
                        label="Confirm Password" 
                        name="confirmPassword" 
                        placeholder="********" 
                    />
                </div>

                {serverError && (
                  <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{serverError}</div>
                )}

                <Button type="submit" className="w-full bg-[#FF4667] "  disabled={isLoading || isSubmitting}>
                  {isLoading ? <Spinner /> : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-sm space-y-2">
            <div>
                Already have an account? 
                <Link href="/login" className="underline font-semibold text-primary ml-1">Log in</Link>
            </div>
            <div className="text-muted-foreground text-xs">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}