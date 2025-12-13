import * as Yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  username: Yup.string().min(3, "Username too short"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .matches(
      passwordRules,
      "Password must contain at least 8 characters, one uppercase letter, and one number"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

  role: Yup.string()
    .oneOf(["student", "parent", "teacher"], "Invalid role")
    .required("Role is required"),

  age: Yup.number()
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .required("Age is required"),

  gradeLevel: Yup.string().when("role", {
    is: "student",
    then: (schema) => schema.required("Grade Level is required for students"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Conditional: specialization required ONLY for teachers
  specialization: Yup.string().when("role", {
    is: "teacher",
    then: (schema) =>
      schema.required("Specialization is required for teachers"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Conditional: phone required for parent OR teacher
  phone: Yup.string().when("role", {
    is: (val) => val === "parent" || val === "teacher",
    then: (schema) =>
      schema
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});


export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Current password is required"),
  newPassword:  Yup.string()
    .matches(
      passwordRules,
      "Password must contain at least 8 characters, one uppercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
    .required("Confirm password is required"),
});



export const teacherSignupSchema = Yup.object({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number").required("Phone number is required"),
  password: Yup.string().min(8, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Confirm Password is required"),
});




export const courseSchema = Yup.object().shape({
  title: Yup.string().min(5, "Title is too short").required("Course title is required"),
  description: Yup.string().min(20, "Description must be detailed").required("Required"),
  level: Yup.string().required("Level is required"),
  subject: Yup.string().required("Subject is required"),
  // Thumbnail مش هنعمله required دلوقتي عشان لو لسه بيرفع الصورة
});