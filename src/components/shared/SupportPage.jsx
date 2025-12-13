"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useCreateTicketMutation } from "@/redux/api/endPoints/ticketsApiSlice";
import { toast } from "react-hot-toast";
import { Mail, Phone, User, MessageSquare, Send, Info } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Validation Schema
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone Number is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
});

const SupportPage = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [createTicket, { isLoading }] = useCreateTicketMutation();

    const initialValues = {
        name: userInfo?.user?.name || "",
        email: userInfo?.user?.email || "",
        phone: userInfo?.user?.phone || "",
        subject: "",
        message: "",
    };

    const onSubmit = async (values, { resetForm }) => {
        try {
            await createTicket(values).unwrap();
            toast.success("Ticket submitted successfully! We will contact you soon.");
            resetForm({
                values: {
                    ...values,
                    subject: "",
                    message: ""
                }
            });
        } catch (err) {
            toast.error(err?.data?.message || "Failed to submit ticket");
        }
    };

    return (
        <div className="container mx-auto max-w-5xl py-8 px-4">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side: Info */}
                <div className="md:w-1/3 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
                        <p className="text-gray-500 mt-2">
                            Have an issue? We're here to help. Fill out the form to create a support ticket.
                        </p>
                    </div>

                    <Card className="bg-blue-50 border-blue-100 shadow-none">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-blue-900">How it works</h3>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Your contact information is automatically pre-filled from your profile.
                                        You can update it specifically for this ticket if you'd like to receive updates on a different email or phone.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-2/3">
                    <Card className="shadow-lg border-gray-100">
                        <CardHeader>
                            <CardTitle>Submit a Ticket</CardTitle>
                            <CardDescription>
                                Please provide details about your issue so we can assist you better.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                enableReinitialize
                            >
                                {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
                                    <Form className="space-y-6">

                                        {/* Contact Info Group */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">



                                            {/* Phone Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <div className="relative">
                                                    <PhoneInput
                                                        country={"eg"}
                                                        value={values.phone}
                                                        onChange={(phone) => setFieldValue("phone", phone)}
                                                        onBlur={() => setFieldTouched("phone", true)}
                                                        inputStyle={{
                                                            width: "100%",
                                                            height: "36px", // h-9 equivalent (36px)
                                                            fontSize: "0.875rem",
                                                            borderRadius: "calc(var(--radius) - 2px)",
                                                            borderColor: touched.phone && errors.phone ? "#ef4444" : "hsl(var(--input))",
                                                            backgroundColor: "transparent",
                                                            borderWidth: "1px",
                                                        }}
                                                        containerStyle={{
                                                            width: "100%",
                                                        }}
                                                        buttonStyle={{
                                                            borderColor: touched.phone && errors.phone ? "#ef4444" : "hsl(var(--input))",
                                                            borderRadius: "calc(var(--radius) - 2px) 0 0 calc(var(--radius) - 2px)",
                                                            backgroundColor: "transparent",
                                                            borderWidth: "1px",
                                                        }}
                                                        dropdownStyle={{
                                                            backgroundColor: "white",
                                                            color: "black",
                                                        }}
                                                    />
                                                </div>
                                                {touched.phone && errors.phone && (
                                                    <div className="text-sm text-red-500">{errors.phone}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Email Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 z-10" />
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 pl-9 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${touched.email && errors.email ? "border-red-500" : "border-input"
                                                        }`}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                This email will be used for all correspondence regarding this ticket.
                                            </p>
                                            <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                                        </div>

                                        {/* Ticket Details */}
                                        <div className="space-y-4 pt-4 border-t border-gray-100">

                                            {/* Subject Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="subject">Subject</Label>
                                                <Field
                                                    id="subject"
                                                    name="subject"
                                                    placeholder="Brief summary of the issue"
                                                    className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${touched.subject && errors.subject ? "border-red-500" : "border-input"
                                                        }`}
                                                />
                                                <ErrorMessage name="subject" component="p" className="text-sm text-red-500" />
                                            </div>

                                            {/* Message Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="message">Message</Label>
                                                <div className="relative">
                                                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                                                    <Field
                                                        as="textarea"
                                                        id="message"
                                                        name="message"
                                                        placeholder="Describe your issue in detail..."
                                                        className={`flex min-h-[150px] w-full rounded-md border bg-transparent px-3 py-2 pl-9 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${touched.message && errors.message ? "border-red-500" : "border-input"
                                                            }`}
                                                    />
                                                </div>
                                                <ErrorMessage name="message" component="p" className="text-sm text-red-500" />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full md:w-auto bg-[#FF0055] hover:bg-[#FF0055]/90"
                                            >
                                                {isLoading ? (
                                                    "Submitting..."
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Submit Ticket
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
