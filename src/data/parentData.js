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
      activeCourses: 5
    },
    {
      id: "102",
      name: "Sarah Salem",
      grade: "Grade 8",
      avgGrade: 92,
      attendance: 98,
      pendingTasks: 1,
      activeCourses: 4
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
      childId: "101",
      title: "New math assignment posted",
      timeAgo: "Just now",
      unread: true
    },
    {
      id: "n2",
      childId: "102",
      title: "Science project update",
      timeAgo: "3 hours ago",
      unread: true
    }
  ];
  