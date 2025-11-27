"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { signupSchema } from "@/lib/validations";
import { useRegisterMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/shared/Loader";

import FormikInput from "@/components/authComponents/FormikInput";
import FormikPassword from "@/components/authComponents/FormikPassword";
import FormikSelect from "@/components/authComponents/FormikSelect";

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [serverError, setServerError] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    role: "student",
    specialization: "",
    gradeLevel: "", 
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    console.log("Starting Submission...", values); 

    try {
      const payload = { ...values };

      delete payload.username; 
      if (payload.age) payload.age = Number(payload.age);

      if (payload.role === "student") {
        delete payload.specialization;
      } else if (payload.role === "teacher") {
        delete payload.gradeLevel;
      } else if (payload.role === "parent") {
        delete payload.gradeLevel;
        delete payload.specialization;
      }

      if (!payload.phone) delete payload.phone;

      console.log(" Payload sent to Backend:", payload); 

      const res = await register(payload).unwrap();
      // console.log(" Success Response:", res); 

      const { user, accessToken } = res.data || res; 
      dispatch(setCredentials({ user, token: accessToken }));
      
      router.push("/dashboard");
    } catch (err) {
      console.error(" Register Error Full Object:", err); 
            const errorMessage = err?.data?.message || err?.error || "Registration failed";
      setServerError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
       <div className="hidden lg:block relative h-full">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
          alt="Classroom"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg max-w-md text-gray-200">
            Start your learning journey today with thousands of courses and expert teachers.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto grid w-full max-w-[500px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">
              Choose your role and enter your details to get started.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, isSubmitting, errors }) => (
              <Form className="space-y-4">
                

                <Tabs 
                  defaultValue="student" 
                  value={values.role}
                  onValueChange={(val) => {
                    setFieldValue("role", val);
                    setFieldValue("gradeLevel", "");
                    setFieldValue("specialization", "");
                  }}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="parent">Parent</TabsTrigger>
                    <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  </TabsList>
                </Tabs>

                    <FormikInput label="Full Name" name="name" placeholder="John Doe" />

                <FormikInput label="Email" name="email" type="email" placeholder="john@example.com" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormikInput label="Age" name="age" type="number" placeholder="18" />
                    
                    {(values.role === "parent" || values.role === "teacher") && (
                       <FormikInput label="Phone Number" name="phone" placeholder="+201xxxxxxxxx" />
                    )}
                </div>

                {values.role === "student" && (
                  <FormikSelect 
                    label="Grade Level" 
                    name="gradeLevel"
                    placeholder="Select Grade"
                    options={[
                        { value: "10", label: "Grade 10" },
                        { value: "11", label: "Grade 11" },
                        { value: "12", label: "Grade 12" },
                    ]}
                  />
                )}

                {values.role === "teacher" && (
                   <FormikInput label="Specialization" name="specialization" placeholder="e.g. Mathematics" />
                )}

                <FormikPassword label="Password" name="password" placeholder="********" />

                {serverError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                     {serverError}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
                  {isLoading ? <Spinner /> : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-sm">
            Already have an account?
            <Link href="/login" className="underline font-semibold hover:text-primary ms-1">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}