export const initialUsers = [
  {
    _id: "65f1a2b3c4d5e6f7g8h9i0j1", 
    name: "Mohamed Admin",
    username: "admin_mo",
    email: "admin@iti.com",
    password: "Password123", 
    age: 30,
    phone: "01000000000",
    role: "admin",
    avatar: {
      url: "https://github.com/shadcn.png",
      publicId: "sample_id_1"
    },
    createdAt: "2023-01-01T12:00:00Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7g8h9i0j2",
    name: "Mr. Hassan",
    username: "hassan_math",
    email: "teacher@iti.com",
    password: "Password123",
    age: 35,
    phone: "01200000000",
    role: "teacher",
    specialization: "Mathematics", 
    avatar: { url: null, publicId: null },
    createdAt: "2023-03-10T09:00:00Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7g8h9i0j3",
    name: "Ahmed Student",
    username: "ahmed_stud",
    email: "student@iti.com",
    password: "Password123",
    age: 16,
    phone: "01100000000",
    role: "student",
    gradeLevel: "10", //
    parentId: "65f1a2b3c4d5e6f7g8h9i0j4", 
    avatar: { url: null, publicId: null },
    createdAt: "2023-02-15T10:30:00Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7g8h9i0j4",
    name: "Parent User",
    username: "parent_user",
    email: "parent@iti.com",
    password: "Password123",
    age: 45,
    phone: "01500000000",
    role: "parent",
    childrenId: ["65f1a2b3c4d5e6f7g8h9i0j3"], 
    avatar: { url: null, publicId: null },
    createdAt: "2023-02-15T10:00:00Z"
  }
];