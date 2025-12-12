// File: app/lesson-builder/student/lesson/[lessonId]/Preview/page.js
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { lessonsStore } from '@/lib/lessonsStore'
import {
  ArrowLeft,
  BookOpen,
  User,
  Clock,
  Calendar,
  CheckCircle,
  PlayCircle,
  Download,
  Printer,
  Share2,
  Eye,
  Bookmark,
  Home,
  Star,
  Users,
  ChevronRight,
  MessageSquare
} from 'lucide-react'

export default function StudentLessonPreviewPage() {
  const router = useRouter()
  const { lessonId } = useParams()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [notes, setNotes] = useState('')
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)

  useEffect(() => {
    loadLesson()
  }, [lessonId])

  const loadLesson = () => {
    setLoading(true)
    
    console.log('Loading lesson with ID:', lessonId)
    
    // 1. المحاولة من المتجر الرسمي أولاً
    let foundLesson = lessonsStore.getLesson(lessonId)
    console.log('From lessonsStore:', foundLesson)
    
    if (!foundLesson) {
      // 2. البحث في localStorage للمسودات
      const savedLesson = localStorage.getItem(`lesson_${lessonId}`)
      console.log('From localStorage (lesson_):', savedLesson)
      if (savedLesson) {
        try {
          foundLesson = JSON.parse(savedLesson)
          foundLesson.from = 'localStorage_lesson'
        } catch (error) {
          console.error('Error parsing localStorage lesson:', error)
        }
      }
    } else {
      foundLesson.from = 'lessonsStore'
    }
    
    if (!foundLesson) {
      // 3. البحث في preview_template
      const previewTemplate = localStorage.getItem('preview_template')
      console.log('From preview_template:', previewTemplate)
      if (previewTemplate) {
        try {
          const template = JSON.parse(previewTemplate)
          foundLesson = {
            ...template,
            id: lessonId,
            title: template.name || 'معاينة الدرس',
            from: 'preview_template'
          }
        } catch (error) {
          console.error('Error parsing preview_template:', error)
        }
      }
    }
    
    if (!foundLesson) {
      // 4. إنشاء درس تجريبي للعرض
      console.log('Creating demo lesson')
      foundLesson = createDemoLesson()
      foundLesson.from = 'demo_lesson'
    }
    
    if (foundLesson) {
      // زيادة عدد المشاهدات
      foundLesson.views = (foundLesson.views || 0) + 1
      
      // تحميل الملاحظات المحفوظة
      try {
        const savedNotes = JSON.parse(localStorage.getItem('lesson_notes') || '{}')
        setNotes(savedNotes[lessonId] || '')
      } catch (error) {
        console.error('Error loading notes:', error)
      }
      
      setLesson(foundLesson)
      console.log('Lesson loaded:', foundLesson)
    }
    
    setLoading(false)
  }

  const createDemoLesson = () => {
    return {
      id: lessonId,
      title: 'درس تجريبي - مقدمة في علوم الحاسب',
      description: 'هذا درس تعليمي تجريبي يوضح كيفية عرض المحتوى التعليمي',
      teacherId: 'teacher_ahmed',
      teacherName: 'أحمد محمد',
      courseId: 'course_1', // تأكد من وجود courseId هنا
      courseName: 'مقدمة في البرمجة',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 1,
      published: true,
      elements: [
        {
          id: '1',
          type: 'title',
          content: 'مقدمة في علوم الحاسب',
          styles: { fontSize: '3xl', color: 'text-blue-600' }
        },
        {
          id: '2',
          type: 'subtitle',
          content: 'ما هو الحاسب الآلي؟',
          styles: { fontSize: '2xl', color: 'text-gray-800' }
        },
        {
          id: '3',
          type: 'paragraph',
          content: 'الحاسب الآلي هو جهاز إلكتروني قادر على استقبال البيانات ومعالجتها إلى معلومات ذات قيمة.',
          styles: { fontSize: 'base', marginBottom: 4 }
        }
      ],
      metadata: {
        elementCount: 3,
        hasQuiz: false,
        hasImages: false,
        difficulty: 'مبتدئ',
        duration: '30 دقيقة',
        level: 'الصف العاشر'
      }
    }
  }

  const getCourseInfo = () => {
    if (!lesson || !lesson.courseId) {
      return null
    }
    return lessonsStore.courses.find(c => c.id === lesson.courseId)
  }

  const renderElement = (element) => {
    if (!element) return null

    const baseClasses = "w-full mb-6"

    switch (element.type) {
      case 'title':
        return (
          <h1 className={`${baseClasses} text-3xl md:text-4xl font-bold text-center text-blue-600`}>
            {element.content}
          </h1>
        )
      case 'subtitle':
        return (
          <h2 className={`${baseClasses} text-2xl md:text-3xl font-semibold text-gray-800 border-r-4 border-blue-500 pr-4`}>
            {element.content}
          </h2>
        )
      case 'paragraph':
        return (
          <p className={`${baseClasses} text-gray-700 leading-relaxed text-lg`}>
            {element.content}
          </p>
        )
      case 'image':
        return (
          <div className={`${baseClasses}`}>
            <img
              src={element.content || 'https://via.placeholder.com/800x400'}
              alt="صورة الدرس"
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'
              }}
            />
          </div>
        )
      case 'list':
        return (
          <ul className={`${baseClasses} list-disc pr-8 space-y-3 bg-gray-50 p-6 rounded-xl`}>
            {element.content?.split('\n').map((item, index) => (
              <li key={index} className="text-gray-700 text-lg">{item}</li>
            ))}
          </ul>
        )
      case 'card':
        return (
          <div className={`${baseClasses} p-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-sm`}>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                <Star size={14} className="text-white" />
              </div>
              <p className="text-gray-800 text-lg flex-1">{element.content}</p>
            </div>
          </div>
        )
      case 'quiz':
        const quizData = element.content || { title: 'اختبار', questions: [] }
        return (
          <div className={`${baseClasses} border-2 border-blue-200 rounded-xl p-6 bg-white shadow-sm`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700">{quizData.title}</h3>
                <p className="text-gray-500">{quizData.questions?.length || 0} أسئلة</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {quizData.questions?.map((question, qIndex) => (
                <div key={question.id || qIndex} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {qIndex + 1}
                    </div>
                    <p className="text-lg font-medium text-gray-800 flex-1">{question.text}</p>
                  </div>
                  
                  <div className="space-y-3 pr-8">
                    {question.options?.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          question.correctAnswer === oIndex 
                            ? 'border-green-500 bg-green-100' 
                            : 'border-gray-300'
                        }`}>
                          {question.correctAnswer === oIndex && (
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <span className={`text-gray-700 ${
                          question.correctAnswer === oIndex ? 'font-semibold text-green-700' : ''
                        }`}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className={`${baseClasses} p-4 bg-gray-50 rounded-lg border border-gray-200`}>
            <p className="text-gray-700">{element.content || 'عنصر تعليمي'}</p>
          </div>
        )
    }
  }

  const handleStartLesson = () => {
    if (!lesson) return
    
    // التحقق إذا كان الطالب مسجل في الكورس
    const studentId = 'student_1'
    const isEnrolled = lessonsStore.enrollments.some(
      e => e.studentId === studentId && lesson.courseId && e.courseId === lesson.courseId
    )
    
    if (!isEnrolled && lesson.courseId) {
      setShowEnrollmentModal(true)
    } else {
      // حفظ الدرس للجلسة الحالية
      localStorage.setItem('current_lesson', JSON.stringify(lesson))
      
      // التوجيه لصفحة الدراسة الكاملة
      router.push(`/student/lessons/${lessonId}`)
    }
  }

  const handleEnrollAndStart = () => {
    if (!lesson || !lesson.courseId) return
    
    const studentId = 'student_1'
    
    // تسجيل الطالب في الكورس
    lessonsStore.enrollments.push({
      id: `enroll_${Date.now()}`,
      studentId,
      courseId: lesson.courseId,
      enrolledAt: new Date().toISOString(),
      status: 'active'
    })
    
    // حفظ البيانات
    lessonsStore.saveData()
    
    // إغلاق المودال
    setShowEnrollmentModal(false)
    
    // البدء في الدراسة
    localStorage.setItem('current_lesson', JSON.stringify(lesson))
    router.push(`/student/lessons/${lessonId}`)
  }

  const handleSaveNote = () => {
    if (notes.trim()) {
      try {
        const savedNotes = JSON.parse(localStorage.getItem('lesson_notes') || '{}')
        savedNotes[lessonId] = notes
        localStorage.setItem('lesson_notes', JSON.stringify(savedNotes))
        alert('✅ تم حفظ الملاحظة بنجاح')
      } catch (error) {
        console.error('Error saving note:', error)
      }
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: lesson?.title || 'درس تعليمي',
        text: 'شاهد هذا الدرس التعليمي المميز',
        url: url
      })
    } else {
      navigator.clipboard.writeText(url)
      alert('📋 تم نسخ رابط الدرس إلى الحافظة')
    }
  }

  const courseInfo = lesson ? getCourseInfo() : null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">جاري تحميل الدرس...</h2>
          <p className="text-gray-500 text-sm">معرف الدرس: {lessonId}</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="text-center max-w-md p-6">
          <div className="text-5xl mb-6">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">الدرس غير موجود</h2>
          <p className="text-gray-600 mb-4">عذراً، لم نتمكن من العثور على الدرس المطلوب.</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/student/lessons')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              تصفح الدروس المتاحة
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              الصفحة الرئيسية
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                title="رجوع"
              >
                <ArrowLeft size={24} />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <User size={16} />
                    {lesson.teacherName || 'المعلم'}
                  </span>
                  {courseInfo && (
                    <span className="flex items-center gap-1">
                      <BookOpen size={16} />
                      {courseInfo.title}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl hover:bg-gray-100"
                title="طباعة"
              >
                <Printer size={22} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-xl hover:bg-gray-100"
                title="مشاركة"
              >
                <Share2 size={22} />
              </button>
              
              <button
                onClick={handleStartLesson}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 font-semibold flex items-center gap-2"
              >
                <PlayCircle size={22} />
                ابدأ الدراسة
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Lesson Stats & Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
         
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3 text-lg">عن الدرس:</h3>
            <p className="text-gray-700">
              {lesson.description || 'درس تعليمي متكامل يهدف إلى تطوير مهارات الطلاب في المجال التعليمي.'}
            </p>
          </div>
          
          {courseInfo && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">الكورس: {courseInfo.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{courseInfo.description}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          )}
        </div>

     

        {/* Lesson Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          {lesson.elements && lesson.elements.length > 0 ? (
            <div className="space-y-8">
              {lesson.elements.map((element, index) => (
                <div key={element.id || index}>
                  {renderElement(element)}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">لا يوجد محتوى</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                هذا الدرس لا يحتوي على أي محتوى بعد. يمكن للمعلم إضافة محتوى من خلال المحرر.
              </p>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bookmark size={24} className="text-amber-600" />
            ملاحظاتك
          </h3>
          
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="اكتب ملاحظاتك هنا عن الدرس..."
            className="w-full p-4 border border-gray-300 rounded-xl mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-[120px]"
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleSaveNote}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
            >
              <Bookmark size={18} />
              حفظ الملاحظة
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">جاهز للبدء؟</h3>
          <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
            {courseInfo ? `انضم إلى ${courseInfo.studentCount || 125} طالب` : 'انضم إلى مجتمع الطلاب'} وابدأ رحلتك التعليمية مع هذا الدرس
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartLesson}
              className="px-8 py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-100 font-bold text-lg flex items-center justify-center gap-2"
            >
              <PlayCircle size={24} />
              ابدأ الدراسة الآن
            </button>
            
            {courseInfo && (
              <button
                onClick={() => router.push(`/student/courses/${courseInfo.id}`)}
                className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-semibold"
              >
                <Users size={20} className="inline ml-2" />
                جميع دروس الكورس
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollmentModal && courseInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">تسجيل في الكورس</h3>
                <p className="text-gray-600">
                  تحتاج للتسجيل في كورس {courseInfo.title} قبل البدء في الدراسة
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-medium mb-2">معلومات الكورس:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>المعلم:</span>
                      <span className="font-medium">{courseInfo.teacherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المدة:</span>
                      <span className="font-medium">{courseInfo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الطلاب المسجلين:</span>
                      <span className="font-medium">{courseInfo.studentCount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle size={20} />
                    <span className="font-medium">مجاني تماماً</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    لا توجد أي تكاليف للتسجيل أو الدراسة
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEnrollmentModal(false)}
                  className="flex-1 py-3 border rounded-xl hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleEnrollAndStart}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
                >
                  التسجيل والبدء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
          <details>
            <summary className="cursor-pointer font-medium">Debug Info</summary>
            <div className="mt-2 space-y-1">
              <div><strong>Lesson ID:</strong> {lessonId}</div>
              <div><strong>Lesson Title:</strong> {lesson.title}</div>
              <div><strong>Course ID:</strong> {lesson.courseId || 'None'}</div>
              <div><strong>Loaded From:</strong> {lesson.from}</div>
              <div><strong>Elements:</strong> {lesson.elements?.length || 0}</div>
            </div>
          </details>
        </div>
      )}
    </div>
  )
}