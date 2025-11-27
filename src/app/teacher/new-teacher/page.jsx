'use client'
import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikInput from '@/components/authComponents/FormikInput'
import FormikSelect from '@/components/authComponents/FormikSelect'
import FormikFileUpload from '@/components/authComponents/FormikPassword'
// Mock Data for Subjects Dropdown 
//need to be replaced with real data from backend
import {subjects} from '@/data/mockSubjects'

// Validation Schema
const TeacherSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  specialization: Yup.string().required('Specialization is required'),
  experience: Yup.number()
    .required('Years of experience is required')
    .min(0, 'Invalid number'),
      cv: Yup.mixed()
    .required("CV is required")
    .test("fileSize", "File too large (max 5MB)", (file) =>
      file ? file.size <= 5 * 1024 * 1024 : false
    )
    .test("fileType", "Only PDF allowed", (file) =>
      file ? file.type === "application/pdf" : false
    ),
})

export default function TeacherForm() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Apply as a Teacher
      </h2>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          specialization: '',
          experience: '',
          cv: null,
        }}
        validationSchema={TeacherSchema}


        //save data to database
        onSubmit={(values) => {
          console.log('Teacher Form Submitted: ', values)
        }}
      >
        <Form className="space-y-4">
          <FormikInput
            name="fullName"
            label="Full Name"
            placeholder="Enter your name"
          />

          <FormikInput
            name="email"
            label="Email"
            type="email"
            placeholder="example@mail.com"
          />

          <FormikInput
            name="phone"
            label="Phone Number"
            placeholder="+20 010 0000 0000"
          />

          <FormikSelect
            name="specialization"
            label="Specialization"
            options={subjects.map((subject) => ({  label: subject, value: subject }))}
          />

          <FormikInput
            name="experience"
            label="Years of Experience"
            type="number"
            min="0"
          />
          

        <FormikFileUpload name="cv" label="Upload CV" accept=".pdf" />



          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}
