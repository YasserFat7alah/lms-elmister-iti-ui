"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import { signupSchema } from "@/lib/validations";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/shared/Loader";

import FormikInput from "@/components/authComponents/FormikInput";
import FormikPassword from "@/components/authComponents/FormikPassword";
import FormikSelect from "@/components/authComponents/FormikSelect";

const gradeOptions = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `Grade ${i + 1}`,
}));

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "", username: "", email: "", password: "",
    age: "", phone: "", role: "student", specialization: "", gradeLevel: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      if (values.role !== 'teacher') delete values.specialization;
      if (values.role !== 'student') delete values.gradeLevel;
      
      await registerUser(values);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

      <div className="flex items-center justify-center py-12 px-4 sm:px-8">
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
            {({ setFieldValue, isSubmitting, values }) => (
              <Form className="grid gap-4">
                
                <Tabs 
                  defaultValue="student" 
                  onValueChange={(val) => {
                      setFieldValue("role", val);
                      setFieldValue("gradeLevel", "");
                      setFieldValue("specialization", "");
                  }} 
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 h-auto">
                    <TabsTrigger value="student" className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">Student</TabsTrigger>
                    <TabsTrigger value="parent" className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">Parent</TabsTrigger>
                    <TabsTrigger value="teacher" className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">Teacher</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="grid grid-cols-2 gap-4">
                  <FormikInput label="Full Name" name="name" placeholder="omar ibrahem" />
                  <FormikInput label="Username" name="username" placeholder="omar_selema" />
                </div>

                <FormikInput label="Email" name="email" type="email" placeholder="enter your email" />
                
                <div className="grid grid-cols-2 gap-4">
                   <FormikInput label="Age" name="age" type="number" placeholder="16" />
                   <FormikInput label="Phone" name="phone" placeholder="01xxxxxxxxx" />
                </div>

                <FormikPassword label="Password" name="password" placeholder="********" />

                {values.role === "teacher" && (
                    <div>
                        <FormikInput label="Specialization" name="specialization" placeholder="e.g. Math" />
                    </div>
                )}

                {values.role === "student" && (
                    <div>
                        <FormikSelect label="Grade Level" name="gradeLevel" placeholder="Select Grade" options={gradeOptions} />
                    </div>
                )}

                <Button type="submit" className="w-full mt-2 font-bold" size="lg" disabled={loading || isSubmitting}>
                   {loading ? <Spinner size={20} className="text-white" /> : "Sign Up"}
                </Button>

              </Form>
            )}
          </Formik>

          <div className="mt-4 text-center text-sm">
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