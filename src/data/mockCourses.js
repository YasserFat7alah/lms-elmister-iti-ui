// Dummy courses for test (Merged with Lessons)
export const mockCourses = [
  {
    id: "1",
    title: "Introduction to Algebra",
    description: "A beginner-friendly course covering basic algebraic concepts, equations, and problem-solving techniques.",
    detailedDescription: "This course introduces students to the fundamentals of algebra including variables, expressions, equations, and inequalities. Students will learn step-by-step problem-solving strategies and develop logical thinking.",
    whatYouWillLearn: [
      "Understand variables and algebraic expressions",
      "Solve linear equations and inequalities",
      "Apply algebraic methods to real-world problems",
      "Build foundational skills for advanced mathematics"
    ],
    requirements: [
      "Basic understanding of arithmetic operations",
      "Interest in developing problem-solving skills"
    ],
    relatedContent: ["Math puzzles and exercises", "Interactive quizzes for practice"],
    thumbnail: { url: "/imgs/tstimg.jpeg", publicId: "mock_algebra_01" },
    subject: "Mathematics",
    gradeLevel: "8",
    status: "published",
    pricing: { isPaid: true, price: 49, currency: "USD" },
    language: "English",
    tags: ["math", "algebra", "equations"],
    teacherId: "mock_teacher_01",
    totalLessons: 22,
    totalStudents: 500,

    sections: [
      {
        title: "Getting Started",
        lessons: [
          { title: "What is Algebra?", duration: "03:10", url: "/courses/1/lesson/1" },
          { title: "Understanding Variables", duration: "04:22", url: "/courses/1/lesson/2" }
        ]
      },
      {
        title: "Core Concepts",
        lessons: [
          { title: "Linear Equations Basics", duration: "05:30", url: "/courses/1/lesson/3" },
          { title: "Solving Multi-step Equations", duration: "06:12", url: "/courses/1/lesson/4" },
          { title: "Introduction to Inequalities", duration: "04:44", url: "/courses/1/lesson/5" }
        ]
      },
      {
        title: "Real-world Algebra",
        lessons: [
          { title: "Word Problems Explained", duration: "06:50", url: "/courses/1/lesson/6" },
          { title: "Patterns & Relations", duration: "04:33", url: "/courses/1/lesson/7" }
        ]
      }
    ],
    features: [
      "Full lifetime access",
      "Downloadable resources",
      "Certificate of completion",
      "Access on mobile and TV",
      "Personalized learning path"
    ] ,groups: {
      sharedGroups: [
        {
          id: "g1",
          days: ["Sunday", "Tuesday", "Thursday"],
          time: "4:00 PM",
          currentMembers: 3,
          maxMembers: 5,
          status: "available" 
        },
        {
          id: "g2",
          days: ["Saturday", "Monday", "Wednesday"],
          time: "12:00 PM",
          currentMembers: 5,
          maxMembers: 5,
          status: "full"
        }
      ],
  
      privateGroups: [
        {
          id: "p1",
          days: ["Friday"],
          time: "6:00 PM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 120
        },
        {
          id: "p2",
          days: ["Sunday"],
          time: "8:00 PM",
          maxMembers: 1,
          currentMembers: 1,
          status: "full",
          price: 120
        },
        {
          id: "p3",
          days: ["Monday", "Wednesday"],
          time: "10:00 AM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 150
        }
      ]
    }
  },

  {
    id: "2",
    title: "English Grammar Basics",
    description: "Learn essential grammar rules, sentence structure, and writing skills for academic success.",
    detailedDescription: "This course focuses on the core rules of English grammar, including parts of speech, sentence structure, punctuation, and common mistakes.",
    whatYouWillLearn: [
      "Identify and use nouns, verbs, adjectives, and adverbs correctly",
      "Construct proper sentences with correct punctuation",
      "Improve writing clarity and style",
      "Avoid common grammar mistakes"
    ],
    requirements: [
      "Basic knowledge of English vocabulary",
      "Willingness to practice writing and grammar exercises"
    ],
    relatedContent: ["Grammar exercises and worksheets", "Short writing assignments"],
    thumbnail: { url: "/assets/imgs/imgtst.jpg", publicId: "mock_english_02" },
    subject: "English",
    gradeLevel: "7",
    status: "published",
    pricing: { isPaid: true, price: 30, currency: "USD" },
    language: "English",
    tags: ["grammar", "writing"],
    teacherId: "mock_teacher_02",
    totalLessons: 15,
    totalStudents: 320,

    sections: [
      {
        title: "Grammar Essentials",
        lessons: [
          { title: "Parts of Speech Overview", duration: "03:50", url: "/courses/2/lesson/1" },
          { title: "Nouns, Verbs, Adjectives", duration: "04:10", url: "/courses/2/lesson/2" }
        ]
      },
      {
        title: "Sentence Structure",
        lessons: [
          { title: "Simple & Compound Sentences", duration: "05:40", url: "/courses/2/lesson/3" },
          { title: "Complex Sentences", duration: "06:20", url: "/courses/2/lesson/4" }
        ]
      },
      {
        title: "Writing Skills",
        lessons: [
          { title: "Common Grammar Mistakes", duration: "04:55", url: "/courses/2/lesson/5" },
          { title: "Improving Clarity & Style", duration: "05:18", url: "/courses/2/lesson/6" }
        ]
      }
    ],
    features: [
      "Full lifetime access",
      "Downloadable resources",
      "Certificate of completion",
      "Access on mobile and TV",
      "Personalized learning path"
    ] ,
    groups: {
      // مجموعات مشتركة (Shared Groups)
      sharedGroups: [
        {
          id: "g1",
          days: ["Sunday", "Tuesday", "Thursday"],
          time: "4:00 PM",
          currentMembers: 3,
          maxMembers: 5,
          status: "available" 
        },
        {
          id: "g2",
          days: ["Saturday", "Monday", "Wednesday"],
          time: "12:00 PM",
          currentMembers: 5,
          maxMembers: 5,
          status: "full"
        }
      ],
  
      // مجموعات خاصة (Private Groups)
      privateGroups: [
        {
          id: "p1",
          days: ["Friday"],
          time: "6:00 PM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 120 // لو سعر البرايفت أعلى
        },
        {
          id: "p2",
          days: ["Sunday"],
          time: "8:00 PM",
          maxMembers: 1,
          currentMembers: 1,
          status: "full",
          price: 120
        },
        {
          id: "p3",
          days: ["Monday", "Wednesday"],
          time: "10:00 AM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 150
        }
      ]
    }
  },

  {
    id: "3",
    title: "Physics: Motion & Forces",
    description: "A complete introduction to motion, force, speed, velocity, and Newton’s laws.",
    detailedDescription: "This course covers the basic principles of physics, focusing on motion, forces, and Newtonian mechanics.",

    whatYouWillLearn: [
      "Understand speed, velocity, and acceleration",
      "Apply Newton’s laws to solve motion problems",
      "Analyze forces and their effects on objects",
      "Develop problem-solving skills in physics"
    ],

    requirements: ["Basic math skills", "Curiosity about physics"],
    relatedContent: ["Physics simulations", "Interactive problem sets"],
    thumbnail: { url: "/assets/imgs/imgtst.jpg", publicId: "mock_physics_03" },
    subject: "Science",
    gradeLevel: "10",
    status: "draft",
    pricing: { isPaid: true, price: 79, currency: "USD" },
    language: "English",
    tags: ["physics", "forces", "science"],
    teacherId: "mock_teacher_03",
    totalLessons: 30,
    totalStudents: 780,

    sections: [
      {
        title: "Motion Basics",
        lessons: [
          { title: "Speed vs Velocity", duration: "04:12", url: "/courses/3/lesson/1" },
          { title: "Acceleration Explained", duration: "05:00", url: "/courses/3/lesson/2" }
        ]
      },
      {
        title: "Forces & Newton",
        lessons: [
          { title: "Newton’s First Law", duration: "03:55", url: "/courses/3/lesson/3" },
          { title: "Newton’s Second Law", duration: "06:20", url: "/courses/3/lesson/4" },
          { title: "Newton’s Third Law", duration: "04:45", url: "/courses/3/lesson/5" }
        ]
      },
      {
        title: "Applications",
        lessons: [
          { title: "Real-life Force Problems", duration: "07:22", url: "/courses/3/lesson/6" }
        ]
      }
    ],
    features: [
      "Full lifetime access",
      "Downloadable resources",
      "Certificate of completion",
      "Access on mobile and TV",
      "Personalized learning path"
    ] ,
    groups: {
      // مجموعات مشتركة (Shared Groups)
      sharedGroups: [
        {
          id: "g1",
          days: ["Sunday", "Tuesday", "Thursday"],
          time: "4:00 PM",
          currentMembers: 3,
          maxMembers: 5,
          status: "available" 
        },
        {
          id: "g2",
          days: ["Saturday", "Monday", "Wednesday"],
          time: "12:00 PM",
          currentMembers: 5,
          maxMembers: 5,
          status: "full"
        }
      ],
  
      // مجموعات خاصة (Private Groups)
      privateGroups: [
        {
          id: "p1",
          days: ["Friday"],
          time: "6:00 PM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 120 // لو سعر البرايفت أعلى
        },
        {
          id: "p2",
          days: ["Sunday"],
          time: "8:00 PM",
          maxMembers: 1,
          currentMembers: 1,
          status: "full",
          price: 120
        },
        {
          id: "p3",
          days: ["Monday", "Wednesday"],
          time: "10:00 AM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 150
        }
      ]
    }
  },

  {
    id: "4",
    title: "Biology: Cells & Living Systems",
    description: "Understand the structure of cells, human body systems, and the basics of genetics and ecosystems.",
    detailedDescription: "Explore the microscopic world of cells and body systems.",
    whatYouWillLearn: ["Cells", "Body systems", "Genetics", "Ecosystems"],
    requirements: ["Basic science understanding"],
    relatedContent: ["Microscope activities", "Biology quizzes"],
    thumbnail: { url: "/assets/imgs/imgtst.jpg", publicId: "mock_biology_04" },
    subject: "Biology",
    gradeLevel: "9",
    status: "published",
    pricing: { isPaid: false, price: 0, currency: "USD" },
    language: "English",
    tags: ["biology", "cells", "ecosystem"],
    teacherId: "mock_teacher_04",
    totalLessons: 18,
    totalStudents: 450,

    sections: [
      {
        title: "Cell Basics",
        lessons: [
          { title: "What is a Cell?", duration: "04:00", url: "/courses/4/lesson/1" },
          { title: "Cell Components", duration: "05:18", url: "/courses/4/lesson/2" }
        ]
      },
      {
        title: "Human Body Systems",
        lessons: [
          { title: "Respiratory System", duration: "04:55", url: "/courses/4/lesson/3" },
          { title: "Digestive System", duration: "05:43", url: "/courses/4/lesson/4" }
        ]
      },
      {
        title: "Genetics & Ecosystems",
        lessons: [
          { title: "Basics of Genetics", duration: "06:10", url: "/courses/4/lesson/5" },
          { title: "How Ecosystems Work", duration: "07:00", url: "/courses/4/lesson/6" }
        ]
      }
    ],
    features: [
      "Full lifetime access",
      "Downloadable resources",
      "Certificate of completion",
      "Access on mobile and TV",
      "Personalized learning path"
    ],groups: {
      // مجموعات مشتركة (Shared Groups)
      sharedGroups: [
        {
          id: "g1",
          days: ["Sunday", "Tuesday", "Thursday"],
          time: "4:00 PM",
          currentMembers: 3,
          maxMembers: 5,
          status: "available" 
        },
        {
          id: "g2",
          days: ["Saturday", "Monday", "Wednesday"],
          time: "12:00 PM",
          currentMembers: 5,
          maxMembers: 5,
          status: "full"
        }
      ],
  
      // مجموعات خاصة (Private Groups)
      privateGroups: [
        {
          id: "p1",
          days: ["Friday"],
          time: "6:00 PM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 120 // لو سعر البرايفت أعلى
        },
        {
          id: "p2",
          days: ["Sunday"],
          time: "8:00 PM",
          maxMembers: 1,
          currentMembers: 1,
          status: "full",
          price: 120
        },
        {
          id: "p3",
          days: ["Monday", "Wednesday"],
          time: "10:00 AM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 150
        }
      ]
    }
  },

  {
    id: "5",
    title: "World History: Ancient Civilizations",
    description: "Explore ancient Egypt, Mesopotamia, Greece, and Rome.",
    detailedDescription: "Learn about major ancient civilizations.",
    whatYouWillLearn: ["Egypt", "Mesopotamia", "Greece", "Rome"],
    requirements: ["Reading skills"],
    relatedContent: ["Maps", "Quizzes"],
    thumbnail: { url: "/assets/imgs/imgtst.jpg", publicId: "mock_history_05" },
    subject: "History",
    gradeLevel: "8",
    status: "published",
    pricing: { isPaid: true, price: 59, currency: "USD" },
    language: "English",
    tags: ["history", "civilizations"],
    teacherId: "mock_teacher_05",
    totalLessons: 20,
    totalStudents: 600,

    sections: [
      {
        title: "Early Civilizations",
        lessons: [
          { title: "Ancient Egypt", duration: "06:30", url: "/courses/5/lesson/1" },
          { title: "Mesopotamia", duration: "05:15", url: "/courses/5/lesson/2" }
        ]
      },
      {
        title: "Classical Civilizations",
        lessons: [
          { title: "Ancient Greece", duration: "06:55", url: "/courses/5/lesson/3" },
          { title: "Ancient Rome", duration: "07:20", url: "/courses/5/lesson/4" }
        ]
      },
      {
        title: "Cultural Impact",
        lessons: [
          { title: "Influence on Modern World", duration: "05:40", url: "/courses/5/lesson/5" }
        ]
      }
    ],
    features: [
      "Full lifetime access",
      "Downloadable resources",
      "Certificate of completion",
      "Access on mobile and TV",
      "Personalized learning path"
    ],groups: {
      // مجموعات مشتركة (Shared Groups)
      sharedGroups: [
        {
          id: "g1",
          days: ["Sunday", "Tuesday", "Thursday"],
          time: "4:00 PM",
          currentMembers: 3,
          maxMembers: 5,
          status: "available" 
        },
        {
          id: "g2",
          days: ["Saturday", "Monday", "Wednesday"],
          time: "12:00 PM",
          currentMembers: 5,
          maxMembers: 5,
          status: "full"
        }
      ],
  
      // مجموعات خاصة (Private Groups)
      privateGroups: [
        {
          id: "p1",
          days: ["Friday"],
          time: "6:00 PM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 120 // لو سعر البرايفت أعلى
        },
        {
          id: "p2",
          days: ["Sunday"],
          time: "8:00 PM",
          maxMembers: 1,
          currentMembers: 1,
          status: "full",
          price: 120
        },
        {
          id: "p3",
          days: ["Monday", "Wednesday"],
          time: "10:00 AM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 150
        }
      ]
    }
  },

  {
    id: "6",
    title: "Arabic Language Basics",
    description: "Learn basic Arabic grammar, reading, and writing.",
    detailedDescription: "This course introduces Arabic grammar and reading comprehension.",
    whatYouWillLearn: ["Grammar", "Reading", "Writing"],
    requirements: ["Basic Arabic"],
    relatedContent: ["Exercises"],
    thumbnail: { url: "/assets/imgs/imgtst.jpg", publicId: "mock_arabic_06" },
    subject: "Arabic",
    gradeLevel: "6",
    status: "published",
    pricing: { isPaid: false, price: 0, currency: "USD" },
    language: "Arabic",
    tags: ["arabic", "grammar", "writing"],
    teacherId: "mock_teacher_06",
    totalLessons: 12,
    totalStudents: 300,

    sections: [
      {
        title: "Grammar Basics",
        lessons: [
          { title: "الجملة الاسمية والفعلية", duration: "04:10", url: "/courses/6/lesson/1" },
          { title: "علامات الإعراب", duration: "05:00", url: "/courses/6/lesson/2" }
        ]
      },
      {
        title: "Reading",
        lessons: [
          { title: "مهارات الفهم القرائي", duration: "06:05", url: "/courses/6/lesson/3" },
          { title: "تحليل النصوص", duration: "05:44", url: "/courses/6/lesson/4" }
        ]
      },
      {
        title: "Writing",
        lessons: [
          { title: "تكوين الجمل", duration: "04:55", url: "/courses/6/lesson/5" }
        ]
      }
    ], features: [
      "Full lifetime access",
      "Downloadable resources",
      "Certificate of completion",
      "Access on mobile and TV",
      "Personalized learning path"
    ],groups: {
      // مجموعات مشتركة (Shared Groups)
      sharedGroups: [
        {
          id: "g1",
          days: ["Sunday", "Tuesday", "Thursday"],
          time: "4:00 PM",
          currentMembers: 3,
          maxMembers: 5,
          status: "available" 
        },
        {
          id: "g2",
          days: ["Saturday", "Monday", "Wednesday"],
          time: "12:00 PM",
          currentMembers: 5,
          maxMembers: 5,
          status: "full"
        }
      ],
  
      // مجموعات خاصة (Private Groups)
      privateGroups: [
        {
          id: "p1",
          days: ["Friday"],
          time: "6:00 PM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 120 // لو سعر البرايفت أعلى
        },
        {
          id: "p2",
          days: ["Sunday"],
          time: "8:00 PM",
          maxMembers: 1,
          currentMembers: 1,
          status: "full",
          price: 120
        },
        {
          id: "p3",
          days: ["Monday", "Wednesday"],
          time: "10:00 AM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 150
        }
      ]
    }
  },

  {
    id: "7",
    title: "Introduction to Computer Science",
    description: "A beginner's guide to programming, logic building, algorithms, and computational thinking.",
    detailedDescription: "Covers basic programming concepts and algorithms.",
    whatYouWillLearn: ["Programming", "Algorithms", "Logic"],
    requirements: ["Basic computer literacy"],
    relatedContent: ["Exercises", "Puzzles"],
    thumbnail: { url: "/assets/imgs/imgtst.jpg", publicId: "mock_cs_07" },
    subject: "Computer Science",
    gradeLevel: "9",
    status: "published",
    pricing: { isPaid: true, price: 99, currency: "USD" },
    language: "English",
    tags: ["coding", "algorithm", "logic"],
    teacherId: "mock_teacher_07",
    totalLessons: 25,
    totalStudents: 900,

    sections: [
      {
        title: "Programming Basics",
        lessons: [
          { title: "What is Programming?", duration: "03:50", url: "/courses/7/lesson/1" },
          { title: "Variables & Data Types", duration: "05:00", url: "/courses/7/lesson/2" }
        ]
      },
      {
        title: "Algorithms",
        lessons: [
          { title: "Introduction to Algorithms", duration: "04:30", url: "/courses/7/lesson/3" },
          { title: "Flowcharts & Pseudocode", duration: "06:15", url: "/courses/7/lesson/4" }
        ]
      },
      {
        title: "Problem Solving",
        lessons: [
          { title: "Logic Building", duration: "07:10", url: "/courses/7/lesson/5" },
          { title: "Beginner Coding Exercises", duration: "08:00", url: "/courses/7/lesson/6" }
        ]
      }
    ], features: [
      "Full lifetime access",
      "Downloadable resources",
      "Certificate of completion",
      "Access on mobile and TV",
      "Personalized learning path"
    ] ,groups: {
      // مجموعات مشتركة (Shared Groups)
      sharedGroups: [
        {
          id: "g1",
          days: ["Sunday", "Tuesday", "Thursday"],
          time: "4:00 PM",
          currentMembers: 3,
          maxMembers: 5,
          status: "available" 
        },
        {
          id: "g2",
          days: ["Saturday", "Monday", "Wednesday"],
          time: "12:00 PM",
          currentMembers: 5,
          maxMembers: 5,
          status: "full"
        }
      ],
  
      // مجموعات خاصة (Private Groups)
      privateGroups: [
        {
          id: "p1",
          days: ["Friday"],
          time: "6:00 PM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 120 // لو سعر البرايفت أعلى
        },
        {
          id: "p2",
          days: ["Sunday"],
          time: "8:00 PM",
          maxMembers: 1,
          currentMembers: 1,
          status: "full",
          price: 120
        },
        {
          id: "p3",
          days: ["Monday", "Wednesday"],
          time: "10:00 AM",
          maxMembers: 1,
          currentMembers: 0,
          status: "available",
          price: 150
        }
      ]
    }
  }
];
