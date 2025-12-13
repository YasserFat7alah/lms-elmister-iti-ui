// Simulating Database IDs
export const MOCK_ASSIGNMENTS = [
  { 
    _id: '1', 
    title: 'Chemistry Homework',
    courseName: 'Chemistry 201',
    dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // بعد يومين
    totalGrade: 20,
    allowLateSubmission: true,
    latePenaltyPerDay: 5,
    description: "Solve the attached worksheet and submit your answers.",
    file: {
      url: "https://example.com/chemistry_homework.pdf",
      publicId: "chem_001",
      type: "pdf"
    }
  },

  { 
    _id: '2', 
    title: 'History Essay', 
    courseName: 'World History', 
    dueDate: new Date(Date.now() - 86400000).toISOString(), // أمس
    totalGrade: 50,
    allowLateSubmission: true,
    latePenaltyPerDay: 10,
    description: "Write a detailed essay about World War II.",
    file: {
      url: "https://example.com/history_essay_guide.pdf",
      publicId: "hist_002",
      type: "pdf"
    }
  },

  { 
    _id: '3', 
    title: 'Math Quiz', 
    courseName: 'Mathematics', 
    dueDate: '2023-01-01T00:00:00.000Z', // Past
    totalGrade: 20,
    allowLateSubmission: false,
    description: "Review chapter 5 before attempting the quiz.",
    file: {
      url: "https://example.com/math_quiz_instructions.pdf",
      publicId: "math_003",
      type: "pdf"
    }
  },

  { 
    _id: '4', 
    title: 'Art Project', 
    courseName: 'Arts', 
    dueDate: new Date(Date.now() + 100000000).toISOString(), // Future
    totalGrade: 100,
    allowLateSubmission: true,
    latePenaltyPerDay: 2,
    description: "Create an original art piece and upload a clear photo.",
    file: {
      url: "https://example.com/art_project_details.pdf",
      publicId: "art_004",
      type: "pdf"
    }
  },
];

export const MOCK_SUBMISSIONS = [
   { 
    assignment: '4', 
    content: 'My art project link...', 
    submittedAt: new Date().toISOString(),
    grade: 20,
    file: {
      url: "https://example.com/my_art_project.png",
      publicId: "stu_art_001",
      type: "image"
    }
  },

  // Assignment 1, 2, 3 have NO submission yet
];