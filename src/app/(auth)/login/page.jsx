"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "@/lib/validations";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FormikInput from "@/components/authComponents/FormikInput"; 
import FormikPassword from "@/components/authComponents/FormikPassword";
import { Spinner } from "@/components/shared/Loader";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
const router = useRouter();
  const [serverError, setServerError] = useState("");

  const initialValues = { email: "", password: "" };

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      const response = await loginUser(values.email, values.password);
      const role = response.user.role;

      const routes = {
        admin: "/admin",
        teacher: "/teacher",
        student: "/student",
        parent: "/parent",
      };
      
      router.push(routes[role] || "/dashboard");

    } catch (err) {
      setServerError(err.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-[800px]">
      
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          
          <div className="grid gap-2 text-center">
            <div className="flex justify-center mb-4 lg:hidden">
                <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password below to login in
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="grid gap-4">
                
                <FormikInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="enter your email"
                />

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                  </div>
                  <FormikPassword
                    name="password"
                    placeholder="********"
                  />
                </div>

                {serverError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md text-center font-medium animate-in fade-in-50">
                    {serverError}
                  </div>
                )}

                <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner size={20} className="text-white" /> : "Login"}
                </Button>
                
                <Button variant="outline" type="button" className="w-full gap-2" onClick={() => alert("soooooooooon")}>
                   Login with Google
                </Button>

              </Form>
            )}
          </Formik>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link href="/signup" className="underline font-semibold hover:text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block relative h-full">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover  "
        />
        
      </div>

    </div>  );
}