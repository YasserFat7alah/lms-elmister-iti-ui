// constants/studentMockData.js

export const STUDENT_ASSIGNMENTS = [
  {
    id: "101",
    title: "Linear Algebra Problem Set",
    course: "Mathematics 101",
    dueDate: "2024-12-10T23:59:00",
    status: "pending", // pending, submitted, graded, overdue
    type: "homework", // homework, quiz
    totalPoints: 20,
    obtainedPoints: null,
  },
  {
    id: "102",
    title: "Physics Lab Report: Motion",
    course: "Physics 101",
    dueDate: "2024-12-05T14:00:00",
    status: "submitted",
    type: "assignment",
    totalPoints: 50,
    obtainedPoints: null, // لسه متصححش
  },
  {
    id: "103",
    title: "JavaScript Basics Quiz",
    course: "Computer Science",
    dueDate: "2024-11-20T10:00:00",
    status: "graded",
    type: "quiz",
    totalPoints: 10,
    obtainedPoints: 9, // جاب 9 من 10
  },
  {
    id: "104",
    title: "History Essay: WW2",
    course: "History",
    dueDate: "2024-11-25T23:59:00",
    status: "overdue", // فات ميعاده ومسلمش
    type: "assignment",
    totalPoints: 100,
    obtainedPoints: 0,
  },
];