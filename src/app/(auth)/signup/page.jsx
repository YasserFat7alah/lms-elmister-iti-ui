"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signupSchema } from "@/lib/validations";
import { useRegisterMutation } from "@/redux/api/endPoints/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Spinner, FullPageLoader } from "@/components/shared/Loader";
import FormikInput from "@/components/authComponents/FormikInput";
import FormikPassword from "@/components/authComponents/FormikPassword";
import FormikSelect from "@/components/authComponents/FormikSelect";
import Image from "next/image";
// import logo from "@/assets/images/logo.png"; // Removed
import { BASE_URL, USERS_URL_DATA } from "@/constants";
// import LogoLoader from "@/components/shared/LogoLoader"; // Removed

export default function CompleteProfileOrSignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const [serverError, setServerError] = useState("");
  const [loadingSession, setLoadingSession] = useState(true);
  const [isOauthSession, setIsOauthSession] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "male",
    phone: "",
    role: "parent",
  });

  useEffect(() => {
    (async () => {
      setLoadingSession(true);
      setServerError("");
      try {
        const res = await fetch(`${BASE_URL}${USERS_URL_DATA}/me`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          setIsOauthSession(false);
          setLoadingSession(false);
          return;
        }

        const body = await res.json();
        const user = body.user || body.data?.user || body;

        setIsOauthSession(true);

        setInitialValues((prev) => ({
          ...prev,
          name: user.name || prev.name,
          email: user.email || prev.email,
          age: user.age ? String(user.age) : prev.age,
          gender: user.gender || prev.gender,
          phone: user.phone || prev.phone,
          role: user.role || prev.role,
        }));

        setLoadingSession(false);
      } catch (err) {
        setServerError("Network error while checking session. You can still sign up manually.");
        setIsOauthSession(false);
        setLoadingSession(false);
      }
    })();
  }, []);

  const handleRegisterSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      const { confirmPassword, ...rest } = values;
      const payload = { ...rest, role: values.role || "parent" };
      if (payload.age) payload.age = Number(payload.age);

      const res = await register(payload).unwrap();
      const responseData = res?.data || res;
      const { user, accessToken } = responseData || {};

      dispatch(setCredentials({ user, accessToken }));
      const role = user?.role;
      const map = {
        admin: "/dashboard/admin/dashboard",
        teacher: "/dashboard/teacher/analytics",
        student: "/dashboard/student/my-learning",
        parent: "/dashboard/parent/overview",
      };
      router.push(map[role] || "/");
    } catch (err) {
      setServerError(err?.data?.message || err?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteProfileSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      const payload = {
        name: values.name,
        phone: values.phone,
        age: values.age ? Number(values.age) : undefined,
        gender: values.gender,
        role: values.role,
      };

      const res = await fetch(`${BASE_URL}/auth/complete-profile`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.message || "Failed to complete profile");
      }

      const user = body.user || body.data?.user || body;
      dispatch(setCredentials({ user, accessToken: null }));

      const role = user?.role;
      const map = {
        admin: "/dashboard/admin/dashboard",
        teacher: "/dashboard/teacher/analytics",
        student: "/dashboard/student/my-learning",
        parent: "/dashboard/parent/overview",
      };
      router.push(map[role] || "/");
    } catch (err) {
      setServerError(err?.message || "Failed to complete profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingSession) {
    return <FullPageLoader message="Checking session..." />;
  }

  const btnPrimary = "inline-flex items-center gap-2 px-4 py-2 h-10 rounded-md bg-gradient-to-r from-[#FF4667] to-[#FF0055] text-white font-medium shadow-sm";

  return (
    <div className="h-screen overflow-hidden lg:grid lg:grid-cols-2">
      <div className="hidden lg:block relative h-full">
        <div className="absolute inset-0 -z-10 h-full">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
            alt="Classroom"
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
            <h1 className="text-2xl font-bold">
              {isOauthSession ? "Complete your profile" : "Create your account"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isOauthSession
                ? "We got your Google info. Please complete the missing fields."
                : "Sign up to get started."}
            </p>
          </div>

          <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={isOauthSession ? handleCompleteProfileSubmit : handleRegisterSubmit} enableReinitialize>
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="space-y-2">
                <FormikInput label="Full Name" name="name" placeholder="Full Name" />
                <FormikInput label="Email" name="email" type="email" disabled={isOauthSession} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <FormikInput label="Age" name="age" type="number" />
                  <FormikSelect
                    label="Gender"
                    name="gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" }
                    ]}
                  />
                </div>

                <FormikInput label="Phone Number" name="phone" placeholder="+20..." />

                {!isOauthSession && (
                  <div className="grid grid-cols-1 gap-2">
                    <FormikPassword label="Password" name="password" />
                    <FormikPassword label="Confirm Password" name="confirmPassword" placeholder="********" />
                  </div>
                )}

                <div className="text-[10px] text-gray-500 text-center px-4 leading-tight">
                  By creating an account, you accept our <Link href="/privacy" className="text-[#FF4667] hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-[#FF4667] hover:underline">Terms of Service</Link>.
                </div>

                {serverError && <div className="text-red-600 text-xs bg-red-50 p-2 rounded">{serverError}</div>}

                <Button type="submit" className="w-full bg-[#FF4667] h-10" disabled={isRegistering || isSubmitting || !isValid || (!dirty && !isOauthSession)}>
                  {isRegistering || isSubmitting ? <Spinner /> : isOauthSession ? "Complete Profile" : "Sign Up"}
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
              Already have an account? <Link href="/login" className="underline font-semibold text-[#FF4667] ml-1">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
