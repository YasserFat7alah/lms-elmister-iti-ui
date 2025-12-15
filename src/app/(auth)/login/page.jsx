"use client";
import { useState, useEffect, useRef, Suspense } from "react";
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
import { Spinner, FullPageLoader } from "@/components/shared/Loader";
import Image from "next/image";
import { BASE_URL, USERS_URL_DATA } from "@/constants";
import { toast } from "react-hot-toast";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState("");
  const [oauthProcessing, setOauthProcessing] = useState(false);
  const oauthToastId = useRef(null);

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const error = searchParams.get("error");

    if (error) {
      setServerError("Google sign-in failed. Please try again.");
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", window.location.pathname);
      }
      toast.error("Google sign-in failed");
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
          toast.success("Signed in with Google");
          router.push(dashboardPaths[role] || "/");
          return;
        } else {
          if (typeof window !== "undefined") {
            window.history.replaceState({}, "", window.location.pathname);
          }
          setServerError("Google sign-in failed to validate session. Please login manually.");
          toast.error("Google sign-in validation failed");
        }
      } catch (err) {
        setServerError("Network error during Google sign-in. Please try again.");
        toast.error("Network error during Google sign-in");
      } finally {
        setOauthProcessing(false);
      }
    })();
  }, [searchParams, dispatch, router]);

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    const toastId = toast.loading("Logging in...");
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
      const targetPath = searchParams.get("redirect") || dashboardPaths[role] || "/";
      toast.success("Logged in", { id: toastId });
      router.push(targetPath);
    } catch (err) {
      toast.error(err?.data?.message || "Invalid email or password", { id: toastId });
      setServerError(err?.data?.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  if (oauthProcessing) {
    return <FullPageLoader message="Signing in..." />;
  }

  return (
    <div className="h-screen overflow-hidden lg:grid lg:grid-cols-2">
      <div className="hidden lg:block relative h-full">
        <div className="absolute inset-0 -z-10 h-full">
          <Image
            src="https://images.unsplash.com/photo-1616531770192-6eaea74c2456?q=80&w=870&auto=format&fit=crop"
            alt="Login Cover"
            fill
            className="object-cover"
            priority={false}
          />
        </div>
      </div>

      <div className="h-full overflow-y-auto flex items-center justify-center py-6 px-4 sm:px-8 bg-gray-50">
        <div className="mx-auto w-full max-w-[450px] gap-4">
          <div className="mb-6 flex justify-start">
            <Link href="/" aria-label="Back to home">
              <Image src="/logo.svg" alt="El-Mister Logo" width={120} height={32} priority />
            </Link>
          </div>

          <div className="grid gap-1 text-center mb-4">
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-xs text-muted-foreground">Enter your email and password below to login</p>
          </div>

          <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleLoginSubmit}>
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="space-y-2">
                <FormikInput label="Email" name="email" type="email" />
                <FormikPassword label="Password" name="password" />

                <div className="text-right">
                  <Link href="/forgetPassword" className="underline text-xs font-semibold hover:text-[#FF4667]">
                    Forget password?
                  </Link>
                </div>

                {serverError && (
                  <div className="p-2 text-xs text-red-600 bg-red-50 rounded">
                    {serverError}
                  </div>
                )}

                <Button type="submit" className="w-full bg-[#FF4667] h-10" disabled={isLoading || isSubmitting || !isValid || !dirty}>
                  {isLoading || isSubmitting ? <Spinner size={20} className="text-white" /> : "Login"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="mt-4 space-y-3 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-50 px-2 text-gray-500">Or continue with</span></div>
            </div>

            <a
              href={`${BASE_URL}/auth/google`}
              className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition h-10"
            >
              <img className="h-4 w-4 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
              <span>Google</span>
            </a>

            <div className="text-sm">
              Don't have an account? <Link href="/signup" className="underline font-semibold text-[#FF4667] ml-1">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<FullPageLoader message="Loading..." />}>
      <LoginContent />
    </Suspense>
  )
}
