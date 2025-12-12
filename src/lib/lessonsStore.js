export const lessonsStore = {
  lessons: [],
  courses: [ {
      id: 'course_1',
      title: 'مقدمة في البرمجة',
      description: 'تعلم أساسيات البرمجة مع لغة Python للمبتدئين',
      subject: 'علوم الحاسب',
      grade: 'الصف العاشر',
      teacherId: 'teacher_ahmed',
      teacherName: 'أحمد محمد',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      level: 'مبتدئ',
      duration: '30 ساعة',
      studentCount: 125,
      lessonCount: 12,
      rating: 4.8,
      price: 0, // مجاني
      status: 'active',
      tags: ['برمجة', 'بايثون', 'مبتدئين', 'تكنولوجيا'],
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-01-20T10:30:00Z',
      objectives: [
        'فهم أساسيات البرمجة',
        'كتابة برامج بسيطة بلغة Python',
        'حل المشكلات البرمجية',
        'بناء مشروع عملي'
      ]
    },
    {
      id: 'course_2',
      title: 'الرياضيات للثانوية العامة',
      description: 'دورة شاملة في الرياضيات للصف الثالث الثانوي',
      subject: 'الرياضيات',
      grade: 'الصف الثالث الثانوي',
      teacherId: 'teacher_sara',
      teacherName: 'سارة أحمد',
      coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      level: 'متقدم',
      duration: '40 ساعة',
      studentCount: 320,
      lessonCount: 20,
      rating: 4.9,
      price: 0,
      status: 'active',
      tags: ['رياضيات', 'ثانوية عامة', 'توجيهي', 'علمي'],
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-25T14:20:00Z',
      objectives: [
        'إتقان حل مسائل التفاضل والتكامل',
        'فهم الهندسة التحليلية',
        'تحليل البيانات والإحصاء',
        'التحضير للامتحانات'
      ]
    }],
  studentProgress: [],
  enrollments: [],

  loadData() {
    if (typeof window !== 'undefined') {
      this.lessons = JSON.parse(localStorage.getItem('edu_lessons') || '[]')
      this.courses = JSON.parse(localStorage.getItem('edu_courses') || '[]')
      this.studentProgress = JSON.parse(localStorage.getItem('edu_student_progress') || '[]')
      this.enrollments = JSON.parse(localStorage.getItem('edu_enrollments') || '[]')
    }
  },

  saveData() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('edu_lessons', JSON.stringify(this.lessons))
      localStorage.setItem('edu_courses', JSON.stringify(this.courses))
      localStorage.setItem('edu_student_progress', JSON.stringify(this.studentProgress))
      localStorage.setItem('edu_enrollments', JSON.stringify(this.enrollments))
    }
  },

  getLesson(lessonId) {
    return this.lessons.find(lesson => lesson.id === lessonId)
  },

  saveLesson(lessonData) {
    const existingIndex = this.lessons.findIndex(l => l.id === lessonData.id)
    
    if (existingIndex >= 0) {
      this.lessons[existingIndex] = {
        ...this.lessons[existingIndex],
        ...lessonData,
        updatedAt: new Date().toISOString()
      }
    } else {
      this.lessons.push({
        ...lessonData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0
      })
    }
    
    this.saveData()
    return lessonData.id
  },

  publishLesson(lessonId) {
    const lesson = this.getLesson(lessonId)
    if (lesson) {
      lesson.published = true
      lesson.publishedAt = new Date().toISOString()
      lesson.status = 'published'
      this.saveData()
    }
  },

  getCourseLessons(courseId) {
    return this.lessons.filter(lesson => lesson.courseId === courseId)
  },

  getTeacherLessons(teacherId) {
    return this.lessons.filter(lesson => lesson.teacherId === teacherId)
  },

  updateStudentProgress(studentId, lessonId, progressData) {
    const existingIndex = this.studentProgress.findIndex(
      p => p.studentId === studentId && p.lessonId === lessonId
    )
    
    if (existingIndex >= 0) {
      this.studentProgress[existingIndex] = {
        ...this.studentProgress[existingIndex],
        ...progressData,
        lastAccessed: new Date().toISOString()
      }
    } else {
      this.studentProgress.push({
        id: `progress_${Date.now()}`,
        studentId,
        lessonId,
        ...progressData,
        startedAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString()
      })
    }
    
    this.saveData()
  }
}

// تهيئة المتجر
if (typeof window !== 'undefined') {
  lessonsStore.loadData()
}
// في lessonsStore.js، بعد تعريف المتجر
if (typeof window !== 'undefined') {
  lessonsStore.loadData()
  
  // إضافة درس تجريبي إذا لم يكن موجوداً
  if (lessonsStore.lessons.length === 0) {
    lessonsStore.saveLesson({
      id: 'lesson_demo_1',
      title: 'درس تجريبي - البرمجة للمبتدئين',
      description: 'تعلم أساسيات البرمجة مع هذا الدرس التجريبي',
      elements: [
        {
          id: '1',
          type: 'title',
          content: 'مقدمة في البرمجة',
          styles: { fontSize: '3xl', color: 'text-blue-600' }
        },
        {
          id: '2',
          type: 'paragraph',
          content: 'البرمجة هي لغة التحدث مع الحواسيب...'
        }
      ],
      teacherId: 'teacher_ahmed',
      courseId: 'course_1',
      published: true
    })
  }
}