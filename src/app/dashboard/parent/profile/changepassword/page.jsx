"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation } from "@/redux/api/endPoints/usersApiSlice";
import { changePasswordSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/shared/Loader";
import FormikPassword from "@/components/authComponents/FormikPassword";
import { KeyRound, ShieldCheck, AlertCircle, ChevronLeft } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setServerError("");
    setSuccessMsg("");
    
    try {
      const payload = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      await changePassword(payload).unwrap();

      setSuccessMsg("Password changed successfully!");
      resetForm();
      
      setTimeout(() => {
        router.push("/dashboard/student/profile"); 
      }, 1000);

    } catch (err) {
      console.error("Change Password Error:", err);
      setServerError(err?.data?.message || err?.data?.error || "Failed to change password");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="container max-w-6xl  py-10 px-4">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Profile
      </Button>

      <Card className="border-none shadow-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ShieldCheck size={28} />
          <CardTitle className="text-2xl">Change Password</CardTitle>
          </div>
          <CardDescription>
            Ensure your account is using a long, random password to stay secure.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {successMsg && (
            <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{successMsg}</AlertDescription>
            </Alert>
          )}

          {serverError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={changePasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                
                <div className="space-y-2">
                   <FormikPassword 
                      name="currentPassword" 
                      label="Current Password" 
                      placeholder="Enter current password" 
                   />
                </div>

                <div className="h-px bg-gray-100 my-4" />

                <div className="grid gap-4 md:grid-cols-2">
                    <FormikPassword 
                        name="newPassword" 
                        label="New Password" 
                        placeholder="Min 8 characters" 
                    />
                    <FormikPassword 
                        name="confirmPassword" 
                        label="Confirm New Password" 
                        placeholder="Retype new password" 
                    />
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-[#FF0055] hover:bg-pink-700 text-white min-w-[150px]"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading ? (
                       <Spinner className="text-white mr-2" />
                    ) : (
                       <><KeyRound className="mr-2 h-4 w-4" /> Update Password</>
                    )}
                  </Button>
                </div>

              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}