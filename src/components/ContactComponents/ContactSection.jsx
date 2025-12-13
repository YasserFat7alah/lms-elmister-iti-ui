"use client";

import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { useCreateTicketMutation } from "@/redux/api/endPoints/ticketsApiSlice";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactSection() {
  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    title: "",
    message: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createTicket(values).unwrap();
      toast.success("Message sent successfully! We'll get back to you soon.");
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send message. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      label: "PHONE NUMBER",
      details: "+1 (555) 123-4567",
    },
    {
      icon: FaEnvelope,
      label: "EMAIL ADDRESS",
      details: "hello@etutorapp.com",
    },
    {
      icon: FaClock,
      label: "WORKING HOURS",
      details: "Mon - Fri: 9AM to 6PM",
    },
  ];

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Contact Us</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We're here to help. Reach out with any questions and we'll respond as soon as possible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in touch</h3>
            <div className="space-y-8">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="text-[#FF4667] text-2xl mt-1">
                      <IconComponent />
                    </div>
                    <div>
                      <p className="text-[#FF4667] font-bold text-sm mb-1">{item.label}</p>
                      <p className="text-gray-900 font-semibold">{item.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Full Name</label>
                    <Field
                      type="text"
                      name="name"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667] ${touched.name && errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      placeholder="Your name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667] ${touched.email && errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      placeholder="Your email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Phone Number</label>
                    <div className={`${touched.phone && errors.phone ? "border-red-500" : ""}`}>
                      <PhoneInput
                        country={"eg"}
                        value={values.phone}
                        onChange={(phone) => setFieldValue("phone", phone)}
                        onBlur={() => setFieldTouched("phone", true)}
                        inputStyle={{
                          width: "100%",
                          height: "42px",
                          fontSize: "1rem",
                          borderRadius: "0.5rem",
                          borderColor: touched.phone && errors.phone ? "#ef4444" : "#d1d5db",
                        }}
                        containerStyle={{
                          width: "100%",
                        }}
                        buttonStyle={{
                          borderColor: touched.phone && errors.phone ? "#ef4444" : "#d1d5db",
                          borderRadius: "0.5rem 0 0 0.5rem",
                        }}
                      />
                    </div>
                    {touched.phone && errors.phone && (
                      <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Title</label>
                    <Field
                      type="text"
                      name="title"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667] ${touched.title && errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                      placeholder="Ticket Title"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Message</label>
                    <Field
                      as="textarea"
                      name="message"
                      rows="4"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667] ${touched.message && errors.message ? "border-red-500" : "border-gray-300"
                        }`}
                      placeholder="Your message"
                    />
                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FF4667] hover:bg-[#e93d5b] text-white font-semibold py-3 px-6 rounded transition disabled:opacity-50"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
