
"use client";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "@/lib/validations";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/api/endPoints/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/authComponents/FormikInput";
import FormikPassword from "@/components/authComponents/FormikPassword";
import { Spinner } from "@/components/shared/Loader";
import { GraduationCap, HomeIcon } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { BASE_URL, USERS_URL_DATA } from "@/constants";


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState("");
  const [oauthProcessing, setOauthProcessing] = useState(false);

useEffect(() => {
  const success = searchParams.get("success") === "true";
  const error = searchParams.get("error");

  if (error) {
    setServerError("Google sign-in failed. Please try again.");
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
    return;
  }

  if (!success) return;

  (async () => {
    setOauthProcessing(true);

    try {
const res = await fetch(`${BASE_URL}${USERS_URL_DATA}/me`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const text = await res.text();
      let body;
      try { body = JSON.parse(text); } catch (e) { body = text; }

      if (res.ok) {
        const user = body.user || body.data?.user || body;
        dispatch(setCredentials({ user, accessToken: null }));
        if (typeof window !== "undefined") {
          window.history.replaceState({}, "", window.location.pathname);
        }
        const role = user?.role;
        const dashboardPaths = {
          admin: "/dashboard/admin/dashboard",
          teacher: "/dashboard/teacher/analytics",
          student: "/dashboard/student/my-learning",
          parent: "/dashboard/parent/overview",
        };
        router.push(dashboardPaths[role] || "/");
        return;
      } else {
        console.warn("[OAuth] /me returned not ok:", res.status, body);
        if (typeof window !== "undefined") {
          window.history.replaceState({}, "", window.location.pathname);
        }
        setServerError("Google sign-in failed to validate session. Please login manually.");
      }
    } catch (err) {
      console.error("[OAuth] fetch /me error:", err);
      setServerError("Network error during Google sign-in. Please try again.");
    } finally {
      setOauthProcessing(false);
    }
  })();
}, [searchParams?.toString()]);

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      const res = await login(values).unwrap();

      const responseData = res?.data || res;
      const { user, accessToken, refreshToken } = responseData;

      dispatch(setCredentials({ user, accessToken, refreshToken }));

      const role = user.role;
      const dashboardPaths = {
        admin: "/dashboard/admin/dashboard",
        teacher: "/dashboard/teacher/analytics",
        student: "/dashboard/student/my-learning",
        parent: "/dashboard/parent/overview",
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
      <div className="hidden bg-muted lg:block relative h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616531770192-6eaea74c2456?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
          alt="Login Cover"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center py-12 bg-gray-50">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/" className="inline-block px-2 py-2 bg-[#ff5372] text-white rounded hover:bg-[#ff274f]">
              <HomeIcon className="inline-block h-5 w-5 mr-1" /> back 
            </Link>
            <Image src={logo} alt="El-Mister Logo" className="h-12 w-auto" />
          </div>

          <div className="grid gap-2 text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-balance text-muted-foreground">Enter your email and password below to login</p>
          </div>

          <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleLoginSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <FormikInput label="Email" name="email" type="email" />
                <FormikPassword label="Password" name="password" />

                {(serverError || oauthProcessing) && (
                  <div className="p-3 text-sm text-red-600 bg-red-100 rounded">
                    {oauthProcessing ? "Processing Google sign-in..." : serverError}
                  </div>
                )}
<div className="text-center">
              <Link href="/forgetPassword" className="underline  text-sm  mt-2 font-semibold hover:text-primary ">
              Forget your password?
            </Link>

</div>

                <Button type="submit" className="w-full bg-[#FF4667]" disabled={isLoading || isSubmitting || oauthProcessing}>
                  {isLoading || oauthProcessing ? <Spinner size={20} className="text-white" /> : "Login"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className=" text-center text-sm">
            Don't have an account?
            <Link href="/signup" className="underline font-semibold hover:text-primary mx-1">
              Register
            </Link>
            <br />

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2"> login with</p>
              <a
                href={`${BASE_URL}/api/v1/auth/google`}
                className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span>Continue with Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
