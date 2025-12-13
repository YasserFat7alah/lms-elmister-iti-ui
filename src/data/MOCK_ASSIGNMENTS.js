// // constants/mockData.js

// export const MOCK_ASSIGNMENTS = [
//   {
//     id: "1",
//     title: "Algebra Linear Equations Quiz",
//     course: "Mathematics 101",
//     dueDate: "2023-12-10T23:59:00",
//     status: "published", // published, draft, closed
//     submissions: 25,
//     totalStudents: 30,
//     points: 100,
//   },
//   {
//     id: "2",
//     title: "Newton's Laws of Motion - Lab Report",
//     course: "Physics 101",
//     dueDate: "2023-12-15T23:59:00",
//     status: "draft",
//     submissions: 0,
//     totalStudents: 30,
//     points: 50,
//   },
//   {
//     id: "3",
//     title: "Shakespeare's Hamlet Essay",
//     course: "English Literature",
//     dueDate: "2023-11-20T23:59:00",
//     status: "closed",
//     submissions: 28,
//     totalStudents: 28,
//     points: 150,
//   },
//   {
//     id: "4",
//     title: "Chemical Bonding Worksheet",
//     course: "Chemistry",
//     dueDate: "2023-12-25T23:59:00",
//     status: "published",
//     submissions: 5,
//     totalStudents: 30,
//     points: 20,
//   },
// ];


import { addDays, subDays, format } from 'date-fns';

export const generateDummyAssignments = () => {
  const courses = [
    { name: 'Physics 101', code: 'PHY101' },
    { name: 'Computer Science', code: 'CS101' },
    { name: 'Mathematics', code: 'MATH101' },
    { name: 'Chemistry', code: 'CHEM101' },
  ];

  const assignments = [
    {
      _id: '1',
      title: 'Physics Lab Report: Motion',
      description: 'Complete the lab report on motion experiments including calculations and analysis.',
      course: courses[0],
      dueDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
      totalGrade: 100,
      allowLateSubmission: true,
      latePenaltyPerDay: 5,
      maxLateDays: 7,
      file: {
        url: '/assignments/physics-lab.pdf',
        type: 'pdf'
      },
      teacher: { name: 'Dr. Smith' }
    },
    {
      _id: '2',
      title: 'JavaScript Basics Quiz',
      description: 'Complete the quiz on JavaScript fundamentals including variables, functions, and loops.',
      course: courses[1],
      dueDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      totalGrade: 50,
      allowLateSubmission: false,
      latePenaltyPerDay: 0,
      maxLateDays: 0,
      teacher: { name: 'Prof. Johnson' }
    },
    {
      _id: '3',
      title: 'Calculus Homework: Derivatives',
      description: 'Solve problems 1-20 on derivatives and submit your solutions.',
      course: courses[2],
      dueDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      totalGrade: 100,
      allowLateSubmission: true,
      latePenaltyPerDay: 2,
      maxLateDays: 5,
      teacher: { name: 'Dr. Williams' }
    },
    {
      _id: '4',
      title: 'Chemistry Lab Safety Report',
      description: 'Review and summarize the lab safety procedures document.',
      course: courses[3],
      dueDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      totalGrade: 30,
      allowLateSubmission: true,
      latePenaltyPerDay: 10,
      maxLateDays: 3,
      teacher: { name: 'Prof. Davis' }
    },
    {
      _id: '5',
      title: 'Web Development Project',
      description: 'Create a responsive website using HTML, CSS, and JavaScript.',
      course: courses[1],
      dueDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
      totalGrade: 150,
      allowLateSubmission: true,
      latePenaltyPerDay: 3,
      maxLateDays: 10,
      file: {
        url: '/assignments/web-project.pdf',
        type: 'pdf'
      },
      teacher: { name: 'Prof. Johnson' }
    }
  ];

  return assignments;
};

export const generateDummySubmissions = () => {
  return [
    {
      _id: 'sub1',
      assignmentId: '1',
      studentId: 'student123',
      content: 'Completed lab report with analysis...',
      submittedAt: format(subDays(new Date(), 8), 'yyyy-MM-dd'),
      isLate: true,
      lateDays: 1,
      penaltyApplied: 5,
      finalGrade: 85,
      status: 'graded'
    },
    {
      _id: 'sub2',
      assignmentId: '2',
      studentId: 'student123',
      content: 'Quiz answers...',
      submittedAt: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      isLate: false,
      lateDays: 0,
      penaltyApplied: 0,
      finalGrade: 45,
      status: 'graded'
    },
    {
      _id: 'sub3',
      assignmentId: '4',
      studentId: 'student123',
      content: 'Lab safety procedures summary...',
      submittedAt: format(new Date(), 'yyyy-MM-dd'),
      isLate: true,
      lateDays: 0,
      penaltyApplied: 0,
      status: 'submitted'
    }
  ];
};

// Helper function to calculate late status
export const calculateLateStatus = (dueDate, submittedAt) => {
  const due = new Date(dueDate);
  const submitted = new Date(submittedAt);
  const diffTime = submitted.getTime() - due.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    isLate: diffDays > 0,
    lateDays: Math.max(0, diffDays)
  };
};