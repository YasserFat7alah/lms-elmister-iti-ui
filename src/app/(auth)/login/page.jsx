"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/authComponents/FormikInput"; 
import FormikPassword from "@/components/authComponents/FormikPassword";
import { Spinner } from "@/components/shared/Loader";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState("");

const handleLoginSubmit = async (values, { setSubmitting }) => {
  setServerError("");
  try {
    const res = await login(values).unwrap();

    const responseData = res?.data || res; 
    const { user, accessToken } = responseData;

    dispatch(setCredentials({ user, accessToken }));

    const role = user.role;
    router.push(`/${role}`);

  } catch (err) {
    setServerError(err?.data?.message || "Invalid email or password");
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
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <FormikInput label="Email" name="email" type="email" />
                <FormikPassword label="Password" name="password" />

                {serverError && (
                  <div className="p-3 text-sm text-red-600 bg-red-100 rounded">
                    {serverError}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
                  {isLoading ? <Spinner size={20} className="text-white" /> : "Login"}
                </Button>
                
                <div className="text-center text-sm">
                    Don't have an account? <Link href="/signup" className="text-blue-600">Sign up</Link>
                </div>
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