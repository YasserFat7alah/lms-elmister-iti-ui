"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/authComponents/FormikInput"; 
import { Spinner } from "@/components/shared/Loader";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useRouter } from "next/navigation";

import { useForgotPasswordMutation } from "@/redux/api/endPoints/usersApiSlice";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

export default function Page() { 
  const router = useRouter(); 

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleFormikSubmit = async (values, { resetForm }) => {
    try {

      const res = await forgotPassword({ email: values.email }).unwrap();
      
      toast.success(res.message || "Please check your email specifically the spam folder.");
      resetForm();
router.push(`/reset-password?email=${values.email}`);      
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Failed to send reset email");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-[800px] bg-gray-50">
      
      {/* Left Side Image */}
      <div className="hidden bg-muted lg:block relative h-full">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
          alt="Login Cover"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          
          {/* Header & Logo */}
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

          <div className="grid gap-2 text-center ">
            <div className="flex justify-center mb-4 lg:hidden">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Forget your password!</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to receive a reset link
            </p>
          </div>
          
          <Formik
            initialValues={{ email: "" }}
            validationSchema={forgotPasswordSchema} 
            onSubmit={handleFormikSubmit} 
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                
                <FormikInput label="Email" name="email" type="email" />

                <Button 
                  type="submit" 
                  className="w-full bg-[#FF4667] hover:bg-[#ff274f]" 
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? <Spinner /> : "Send Reset Link"}
                </Button>
                
              </Form>
            )}
          </Formik>
          
          <div className="mt-4 text-center text-sm">
            Don't have an account? 
            <Link href="/signup" className="underline font-semibold hover:text-primary mx-1">
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>  
  );
}