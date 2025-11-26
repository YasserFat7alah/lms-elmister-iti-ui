import * as yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
const phoneRules = /^01[0125][0-9]{8}$/; 

export const signupSchema = yup.object().shape({
  name: yup.string().required("Full Name is required").trim(),
  username: yup.string().required("Username is required").trim().min(3),
  email: yup.string().email("Invalid email").required("Email is required").trim(),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, "Password must have 1 uppercase & 1 number")
    .required("Password is required"),
  
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(6, "Age must be at least 6")
    .max(100, "Invalid age"),
    
  phone: yup
    .string()
    .matches(phoneRules, "Invalid Egyptian phone number")
    .nullable(),

  role: yup
    .string()
    .required("Role is required")
    .oneOf(['student', 'parent', 'teacher', 'admin'])
    .default('student'),

  
  specialization: yup.string().when('role', {
    is: 'teacher',
    then: (schema) => schema.required("Specialization is required for teachers"),
    otherwise: (schema) => schema.nullable(),
  }),

  gradeLevel: yup.string().when('role', {
    is: 'student',
    then: (schema) => schema.required("Grade Level is required for students"),
    otherwise: (schema) => schema.nullable(),
  }),

  parentId: yup.string().nullable(), 
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});