"use client";
import { Formik, Form } from "formik";
import { loginSchema } from "@/lib/validations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/authComponents/FormikInput"; 
import FormikPassword from "@/components/authComponents/FormikPassword";
import { Spinner } from "@/components/shared/Loader";
import { GraduationCap } from "lucide-react";

export default function page() {





  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-[800px]">
      
      <div className="flex items-center justify-center py-12">
        
        <div className="mx-auto grid w-[350px] gap-6">
          
            <div className="mb-4 text-start ">
  <Link 
    href="/login" 
    className="inline-block px-4 py-2 bg-[#ff5372] text-white rounded hover:bg[#ff274f]"
  >
    Back to login
  </Link>
{/* <img
  src={logo}
  alt="Logo" 
  width={100} 
  height={100} 
    className="inline-block ml-4"
  /> */}
</div>
          <div className="grid gap-2 text-center">

            <div className="flex justify-center mb-4 lg:hidden">
                <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Forget your password!</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email
            </p>
            
          </div>
          
          <Formik
            initialValues={{ email: ""}}
            validationSchema={loginSchema}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <FormikInput label="Email" name="email" type="email" />


                <Button type="submit" className="w-full bg-[#FF4667]" >
                send
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
          <div className=" text-center text-sm">
          </div>

        </div>
      </div>

      <div className="hidden bg-muted lg:block relative h-full">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
          alt="Login Cover"
          className="h-full w-full object-cover"
        />
      </div>

    </div>  
  );
}