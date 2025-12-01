"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/api/endPoints/usersApiSlice"; 
import { setCredentials } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/authComponents/FormikInput"; 
import FormikPassword from "@/components/authComponents/FormikPassword";
import { Spinner } from "@/components/shared/Loader";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";






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
      
      const dashboardPaths = {
        admin: "/dashboard/admin/dashboard",     
        teacher: "/dashboard/teacher/analytics",  
        student: "/dashboard/student/my-learning", 
        parent: "/dashboard/parent",     
      };

      const targetPath = dashboardPaths[role] || "/";
      
      router.push(targetPath);

    } catch (err) {
      console.error("Login Error:", err);
      setServerError(err?.data?.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden bg-muted lg:block relative h-full">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
          alt="Login Cover"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center py-12 bg-gray-50">
        
        <div className="mx-auto grid w-[350px] gap-6">
          
<div className="mb-4 flex items-center justify-between">







    <Link 
    href="/" 
    className="inline-block px-2 py-2 bg-[#ff5372] text-white rounded hover:bg-[#ff274f]"
  >
    Back Home
  </Link>


  <Image 
    src={logo} 
    alt="El-Mister Logo" 
    className="h-12 w-auto"
  />


</div>
          <div className="grid gap-2 text-center">

            <div className="flex justify-center mb-4 lg:hidden">
                <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password below to login
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

                <Button type="submit" className="w-full bg-[#FF4667]" disabled={isLoading || isSubmitting}>
                  {isLoading ? <Spinner size={20} className="text-white" /> : "Login"}
                </Button>
                
              </Form>
            )}
          </Formik>
          
          <div className="mt-4 text-center text-sm">
            Don't have an account? 
            <Link href="/signup" className="underline font-semibold hover:text-primary mx-1">
              Register
            </Link>
            <br />
                        <Link href="/forgetPassword" className="underline mt-2 font-semibold hover:text-primary ">
              forget your password
            </Link>

          </div>
          <div className=" text-center text-sm">
          </div>

        </div>
      </div>


    </div>  
  );
}