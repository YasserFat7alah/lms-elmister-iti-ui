
export const mockCourses = [
  {
    id: "course-1",
    title: "Mathematics Basics",
    description: "Introduction to basic mathematics concepts",
    teacherId: "teacher-1",
    teacherName: "Ahmed Mohamed",
    category: "Mathematics",
    level: "Beginner",
    duration: "30 hours",
    studentCount: 45,
    rating: 4.8,
    imageUrl: "/images/courses/math.jpg",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
    groups: ["group-1", "group-2"] // Array of group IDs
  }
];

export const mockGroups = [
  {
    id: "group-1",
    courseId: "course-1",
    name: "Group A - Morning",
    description: "Morning sessions group",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    teacherId: "teacher-1",
    maxStudents: 20,
    currentStudents: 15,
    status: "active",
    startDate: "2024-03-01",
    endDate: "2024-06-30",
    createdAt: "2024-02-15",
    lessons: ["lesson-1", "lesson-2"] // Array of lesson IDs
  },
  {
    id: "group-2",
    courseId: "course-1",
    name: "Group B - Evening",
    description: "Evening sessions group",
    schedule: "Tue, Thu - 6:00 PM",
    teacherId: "teacher-1",
    maxStudents: 25,
    currentStudents: 18,
    status: "active",
    startDate: "2024-03-05",
    endDate: "2024-07-15",
    createdAt: "2024-02-18",
    lessons: ["lesson-3", "lesson-4"]
  }
];

export const mockLessons = [
  {
    id: "lesson-1",
    courseId: "course-1",
    groupId: "group-1",
    title: "Introduction to Algebra",
    description: "Basic algebraic expressions and equations",
    content: {
      type: "video",
      url: "https://example.com/video-1",
      duration: "45:00",
      resources: [
        { name: "Algebra Basics PDF", type: "pdf", url: "#" },
        { name: "Practice Problems", type: "doc", url: "#" }
      ]
    },
    order: 1,
    isPublished: true,
    publishedAt: "2024-02-01",
    scheduledDate: "2024-03-04",
    createdAt: "2024-01-25",
    updatedAt: "2024-02-01",
    views: 120,
    completionRate: 85,
    attendance: [
      { studentId: "student-1", status: "present" },
      { studentId: "student-2", status: "absent" }
    ]
  },
  {
    id: "lesson-2",
    courseId: "course-1",
    groupId: "group-1",
    title: "Linear Equations",
    description: "Solving linear equations with one variable",
    content: {
      type: "article",
      content: "Linear equations are equations of the first degree...",
      readingTime: "15 min",
      resources: [
        { name: "Worksheet 1", type: "pdf", url: "#" }
      ]
    },
    order: 2,
    isPublished: true,
    publishedAt: "2024-02-05",
    scheduledDate: "2024-03-06",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-05",
    views: 98,
    completionRate: 78
  },
  {
    id: "lesson-3",
    courseId: "course-1",
    groupId: "group-2",
    title: "Introduction to Algebra",
    description: "Basic algebraic expressions and equations",
    content: {
      type: "video",
      url: "https://example.com/video-1",
      duration: "45:00",
      resources: [
        { name: "Algebra Basics PDF", type: "pdf", url: "#" }
      ]
    },
    order: 1,
    isPublished: true,
    publishedAt: "2024-02-10",
    scheduledDate: "2024-03-05",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-10",
    views: 75,
    completionRate: 82
  }
];