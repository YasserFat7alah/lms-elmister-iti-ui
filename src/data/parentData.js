// ==============================
// Parents
// ==============================
export const parents = [
    {
      id: "1",
      name: "Mariam Salem",
      email: "mariam@example.com",
      children: ["101", "102"] // Child IDs
    }
  ];
  
  // ==============================
  // Children
  // ==============================
  export const children = [
    {
      id: "101",
      name: "Ahmed Salem",
      grade: "Grade 10",
      avgGrade: 88,
      attendance: 96,
      pendingTasks: 2,
      activeCourses: 5,
      enrolledCourses: [
        {
          courseId: "1",
          title: "Introduction to Algebra",
          progress: 60,
          groupType: "shared",
          groupId: "g1",
  
          // NEW DATA
          attendancePercentage: 85,
          totalClasses: 20,
          attendedClasses: 17,
          lastAttendance: "01-12-2025",
          nextAttendance: "2025-12-15",
          tests: [
            { testName: "Algebra Basics Quiz", score: 75, fullMark: 100 },
            { testName: "Equations Exam", score: 88, fullMark: 100 }
          ],
  
          assignments: {
            submitted: 5,
            pending: 1,
          },
  
          instructor: "Mr. Khaled Hassan",
          groupSchedule: ["Sunday", "Wednesday"],
  
          unitsProgress: [
            { unit: "Intro to Algebra", completion: 100 },
            { unit: "Linear Equations", completion: 20 },
            { unit: "Inequalities", completion: 0 }
          ],
  
          studentStatus: "Good" // excellent – good – needs_attention
        },
  
        {
          courseId: "3",
          title: "Physics: Motion & Forces",
          progress: 10,
          groupType: "private",
          groupId: "p1",
  
          attendancePercentage: 60,
          totalClasses: 15,
          attendedClasses: 7,
          lastAttendance: "2025-11-28",
          nextAttendance: "2025-12-09",
          tests: [
            { testName: "Forces Quiz", score: 40, fullMark: 100 }
          ],
  
          assignments: {
            submitted: 2,
            pending: 3,
          },
  
          instructor: "Dr. Maha Farid",
          groupSchedule: ["Monday", "Thursday"],
  
          unitsProgress: [
            { unit: "Motion Basics", completion: 10 },
            { unit: "Newton’s Laws", completion: 0 }
          ],
  
          studentStatus: "Needs Attention"
        }
      ]
    },
  
    {
      id: "102",
      name: "Sarah Salem",
      grade: "Grade 8",
      avgGrade: 92,
      attendance: 98,
      pendingTasks: 1,
      activeCourses: 4,
      enrolledCourses: [
        {
          courseId: "2",
          title: "English Grammar Basics",
          progress: 80,
          groupType: "shared",
          groupId: "g2",
  
          attendancePercentage: 95,
          totalClasses: 18,
          attendedClasses: 17,
          lastAttendance: "2025-12-02",
          nextAttendance: "2025-12-08",

          tests: [
            { testName: "Grammar Quiz 1", score: 90, fullMark: 100 },
            { testName: "Verb Tenses Exam", score: 85, fullMark: 100 }
          ],
  
          assignments: {
            submitted: 7,
            pending: 0,
          },
  
          instructor: "Ms. Rania Saeed",
          groupSchedule: ["Tuesday", "Friday"],
  
          unitsProgress: [
            { unit: "Nouns & Pronouns", completion: 100 },
            { unit: "Verb Tenses", completion: 90 }
          ],
  
          studentStatus: "Excellent"
        }
      ]
    }
  ];
  
  
  // ==============================
  // Upcoming Sessions
  // ==============================
  export const sessions = [
    {
      id: "s1",
      childId: "101",
      subject: "Mathematics",
      grade: "Grade 10",
      tutor: "Mr. Ahmed Hassan",
      time: "Today, 4:00 PM",
      status: "Online"
    },
    {
      id: "s2",
      childId: "102",
      subject: "Science",
      grade: "Grade 8",
      tutor: "Dr. Salma Khaled",
      time: "Tomorrow, 2:00 PM",
      status: "Offline"
    }
  ];
  
  // ==============================
  // Alerts
  // ==============================
  export const alerts = [
    {
      id: "a1",
      childId: "102",
      type: "success",
      message: "Received excellent grade (95%) on Science Quiz",
      timeAgo: "2 hours ago"
    },
    {
      id: "a2",
      childId: "101",
      type: "warning",
      message: "Assignment deadline approaching - Math Practice Set due Nov 23",
      timeAgo: "5 hours ago"
    }
  ];
  
  // ==============================
  // Messages
  // ==============================
  export const messages = [
    {
      id: "m1",
      childId: "101",
      sender: "Mr. Ahmed Hassan",
      subject: "Today's session summary",
      unread: true,
      time: "1 hour ago"
    },
    {
      id: "m2",
      childId: "102",
      sender: "Dr. Salma Khaled",
      subject: "Quiz results released",
      unread: false,
      time: "Yesterday"
    }
  ];
  
  // ==============================
  // Notifications
  // ==============================
  export const notifications = [
    {
      id: "n1",
      user: "Ahmed Salem",
      childId: "101",
      title: "New math assignment posted",
      timeAgo: "Just now",
      read: false
    },
    {
      id: "n2",
      user: "Sarah Salem",
      childId: "102",
      title: "Science project update",
      timeAgo: "3 hours ago",
      read: false
    },
    {
      id: "n3",
      user: "Sarah Salem",
      childId: "102",
      title: "New study materials uploaded",
      timeAgo: "2 days ago",
      read: true
    }
  ];

  
  