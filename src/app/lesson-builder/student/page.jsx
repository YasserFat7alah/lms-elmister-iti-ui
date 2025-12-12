'use client'

import { useState, useEffect, useRef } from 'react'
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  Bookmark,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  Download,
  Printer,
  Share2,
  ChevronRight,
  ChevronLeft,
  Home,
  Menu,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function StudentLessonView({ lessonId }) {
  const router = useRouter()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showSidebar, setShowSidebar] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState([])
  const [showControls, setShowControls] = useState(true)

  const lessonRef = useRef(null)
  const audioRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  // تحميل الدرس
  useEffect(() => {
    const loadLesson = async () => {
      try {
        // محاكاة تحميل الدرس من API
        const savedLesson = localStorage.getItem(`lesson_${lessonId}`)
        if (savedLesson) {
          setLesson(JSON.parse(savedLesson))
        } else {
          // بيانات وهمية للدرس
          const mockLesson = {
            id: lessonId,
            title: 'Introduction to Web Development',
            teacher: 'Ahmed Mohamed',
            subject: 'Computer Science',
            grade: '10th Grade',
            duration: '45 minutes',
            createdAt: '2024-01-15',
            lastUpdated: '2024-01-20',
            difficulty: 'Intermediate',
            tags: ['HTML', 'CSS', 'JavaScript', 'Beginner'],
            description: 'Learn the basics of web development including HTML, CSS, and JavaScript fundamentals.',
            elements: generateMockElements(),
            objectives: [
              'Understand HTML structure and elements',
              'Learn CSS styling basics',
              'Write simple JavaScript functions',
              'Create a basic webpage'
            ],
            resources: [
              { name: 'HTML Cheat Sheet', type: 'pdf', url: '#' },
              { name: 'CSS Tutorial', type: 'video', url: '#' },
              { name: 'Practice Exercises', type: 'doc', url: '#' }
            ],
            quiz: {
              title: 'Web Development Quiz',
              questions: [
                {
                  id: 1,
                  text: 'What does HTML stand for?',
                  options: [
                    'Hyper Text Markup Language',
                    'High Tech Modern Language',
                    'Hyper Transfer Markup Language',
                    'Home Tool Markup Language'
                  ],
                  correctAnswer: 0
                },
                {
                  id: 2,
                  text: 'Which CSS property is used to change text color?',
                  options: ['font-color', 'text-color', 'color', 'background-color'],
                  correctAnswer: 2
                },
                {
                  id: 3,
                  text: 'Which keyword is used to declare variables in JavaScript?',
                  options: ['var', 'let', 'const', 'All of the above'],
                  correctAnswer: 3
                }
              ]
            }
          }
          setLesson(mockLesson)
          localStorage.setItem(`lesson_${lessonId}`, JSON.stringify(mockLesson))
        }

        // تحميل حالة التقدم
        const savedProgress = localStorage.getItem(`progress_${lessonId}`)
        if (savedProgress) {
          const { bookmarked, completed, progress } = JSON.parse(savedProgress)
          setBookmarked(bookmarked)
          setCompleted(completed)
          setProgress(progress)
        }

        // تحميل الملاحظات
        const savedNotes = localStorage.getItem(`notes_${lessonId}`)
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes))
        }
      } catch (error) {
        console.error('Error loading lesson:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLesson()
  }, [lessonId])

  // حفظ التقدم
  useEffect(() => {
    if (lesson) {
      const progressData = { bookmarked, completed, progress }
      localStorage.setItem(`progress_${lessonId}`, JSON.stringify(progressData))
    }
  }, [bookmarked, completed, progress, lessonId, lesson])

  // إخفاء التحكم بعد 3 ثواني
  useEffect(() => {
    if (fullscreen) {
      const handleMouseMove = () => {
        setShowControls(true)
        
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
        
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }

      document.addEventListener('mousemove', handleMouseMove)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
      }
    }
  }, [fullscreen])

  const generateMockElements = () => {
    return [
      {
        id: '1',
        type: 'title',
        content: 'Introduction to Web Development',
        styles: { fontSize: '3xl', color: 'text-blue-600', align: 'center' }
      },
      {
        id: '2',
        type: 'subtitle',
        content: 'What is Web Development?',
        styles: { fontSize: '2xl', color: 'text-gray-800' }
      },
      {
        id: '3',
        type: 'paragraph',
        content: 'Web development refers to the building, creating, and maintaining of websites. It includes aspects such as web design, web publishing, web programming, and database management.',
        styles: { fontSize: 'base', marginBottom: 4 }
      },
      {
        id: '4',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
        styles: { borderRadius: 'lg' }
      },
      {
        id: '5',
        type: 'subtitle',
        content: 'HTML Basics',
        styles: { fontSize: 'xl', color: 'text-green-600' }
      },
      {
        id: '6',
        type: 'paragraph',
        content: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.',
        styles: { fontSize: 'base' }
      },
      {
        id: '7',
        type: 'list',
        content: 'HTML Elements\nHTML Attributes\nHTML Headings\nHTML Paragraphs\nHTML Links',
        styles: { backgroundColor: 'bg-gray-50', padding: 4 }
      },
      {
        id: '8',
        type: 'subtitle',
        content: 'CSS Styling',
        styles: { fontSize: 'xl', color: 'text-purple-600' }
      },
      {
        id: '9',
        type: 'paragraph',
        content: 'CSS (Cascading Style Sheets) is used to style and layout web pages — for example, to alter the font, color, size, and spacing of your content.',
        styles: { fontSize: 'base' }
      },
      {
        id: '10',
        type: 'card',
        content: '💡 Tip: Always separate your HTML structure from your CSS styling for better maintainability.',
        styles: { backgroundColor: 'bg-blue-50', border: 'border-blue-200' }
      }
    ]
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  const handleComplete = () => {
    setCompleted(!completed)
    if (!completed) {
      setProgress(100)
    }
  }

  const handleProgressUpdate = (value) => {
    const newProgress = Math.max(0, Math.min(100, value))
    setProgress(newProgress)
    if (newProgress === 100) {
      setCompleted(true)
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(lesson?.elements.length / 3) - 1) {
      setCurrentPage(prev => prev + 1)
      handleProgressUpdate(progress + 10)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleSubmitQuiz = () => {
    if (!lesson?.quiz) return

    let score = 0
    lesson.quiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        score++
      }
    })

    const percentage = Math.round((score / lesson.quiz.questions.length) * 100)
    setQuizScore(percentage)
    setQuizSubmitted(true)
    
    if (percentage >= 70) {
      handleComplete()
    }
  }

  const handleAddNote = () => {
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteText,
        timestamp: new Date().toLocaleTimeString(),
        page: currentPage + 1
      }
      setNotes([...notes, newNote])
      setNoteText('')
      localStorage.setItem(`notes_${lessonId}`, JSON.stringify([...notes, newNote]))
    }
  }

  const handleToggleFullscreen = () => {
    if (!fullscreen) {
      if (lessonRef.current.requestFullscreen) {
        lessonRef.current.requestFullscreen()
      } else if (lessonRef.current.webkitRequestFullscreen) {
        lessonRef.current.webkitRequestFullscreen()
      }
      setFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
      setFullscreen(false)
    }
  }

  const renderElement = (element) => {
    switch (element.type) {
      case 'title':
        return (
          <h1 className={`text-3xl font-bold mb-6 text-center ${element.styles?.color || 'text-gray-900'}`}>
            {element.content}
          </h1>
        )
      case 'subtitle':
        return (
          <h2 className={`text-2xl font-semibold mb-4 ${element.styles?.color || 'text-gray-800'}`}>
            {element.content}
          </h2>
        )
      case 'paragraph':
        return (
          <p className={`text-gray-700 mb-4 leading-relaxed ${element.styles?.fontSize ? `text-${element.styles.fontSize}` : 'text-base'}`}>
            {element.content}
          </p>
        )
      case 'image':
        return (
          <div className="mb-6">
            <img
              src={element.content}
              alt="Lesson"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )
      case 'list':
        return (
          <ul className={`list-disc pl-6 mb-4 space-y-2 ${element.styles?.backgroundColor || ''} ${element.styles?.padding ? `p-${element.styles.padding}` : ''}`}>
            {element.content.split('\n').map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        )
      case 'card':
        return (
          <div className={`p-4 rounded-lg border mb-4 ${element.styles?.backgroundColor || 'bg-gray-50'} ${element.styles?.border || 'border-gray-200'}`}>
            <p className="text-gray-700">{element.content}</p>
          </div>
        )
      default:
        return (
          <div className="mb-4">
            {element.content}
          </div>
        )
    }
  }

  const getCurrentElements = () => {
    if (!lesson?.elements) return []
    const start = currentPage * 3
    return lesson.elements.slice(start, start + 3)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lesson.title,
        text: 'Check out this lesson!',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-xl font-semibold mb-2">Lesson not found</h2>
          <p className="text-gray-600 mb-6">The lesson you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={lessonRef}
      className={`min-h-screen bg-gray-50 transition-all ${fullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}
    >
      {/* Top Navigation */}
      <div className={`bg-white shadow-sm sticky top-0 z-40 transition-all duration-300 ${fullscreen && !showControls ? 'opacity-0' : 'opacity-100'}`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Home"
              >
                <Home size={20} />
              </button>
              
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
              >
                {showSidebar ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div>
                <h1 className="text-lg font-semibold truncate max-w-xs md:max-w-md">
                  {lesson.title}
                </h1>
                <p className="text-sm text-gray-500">{lesson.subject} • {lesson.grade}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFullscreen}
                className="p-2 rounded-lg hover:bg-gray-100"
                title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {fullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Print"
              >
                <Printer size={20} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Share"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        {showSidebar && (
          <div className={`w-64 md:w-80 bg-white border-r overflow-y-auto transition-all duration-300 ${fullscreen && !showControls ? 'opacity-0' : 'opacity-100'}`}>
            <div className="p-4">
              {/* Lesson Info */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{lesson.title}</h2>
                    <p className="text-sm text-gray-500">By {lesson.teacher}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-gray-400" />
                    <span>Duration: {lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    <span>Last updated: {lesson.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-gray-400" />
                    <span>Difficulty: {lesson.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Your Progress</h3>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleBookmark}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${bookmarked ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <Bookmark size={16} />
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button
                    onClick={handleComplete}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${completed ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <CheckCircle size={16} />
                    {completed ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Table of Contents</h3>
                <div className="space-y-2">
                  {lesson.objectives?.map((objective, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer ${currentPage === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                      onClick={() => setCurrentPage(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${currentPage === index ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                          {index + 1}
                        </div>
                        <span className="text-sm">{objective}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Resources</h3>
                <div className="space-y-2">
                  {lesson.resources?.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm">{resource.name}</span>
                      <Download size={16} className="text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">My Notes</h3>
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showNotes ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showNotes && (
                  <>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add a note..."
                      className="w-full p-3 border rounded-lg mb-2 text-sm"
                      rows={3}
                    />
                    <button
                      onClick={handleAddNote}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Add Note
                    </button>
                    
                    <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                      {notes.map((note) => (
                        <div key={note.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-sm">{note.text}</p>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Page {note.page}</span>
                            <span>{note.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Quiz Button */}
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 font-semibold"
              >
                Take Quiz
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Page Content */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
              <div className="prose prose-lg max-w-none">
                {getCurrentElements().map((element) => (
                  <div key={element.id} className="mb-6">
                    {renderElement(element)}
                  </div>
                ))}
              </div>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 flex items-center gap-2"
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {[...Array(Math.ceil(lesson.elements.length / 3))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === index ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage >= Math.ceil(lesson.elements.length / 3) - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 flex items-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Progress Controls */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">Update Your Progress</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => handleProgressUpdate(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="font-semibold">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{lesson.quiz?.title || 'Quiz'}</h2>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {quizSubmitted ? (
                <div className="text-center py-12">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${quizScore >= 70 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <span className={`text-3xl font-bold ${quizScore >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                      {quizScore}%
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {quizScore >= 70 ? '🎉 Congratulations!' : '📝 Keep Practicing!'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You scored {quizScore}% on this quiz
                    {quizScore >= 70 && '. Lesson marked as completed!'}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setShowQuiz(false)
                        setQuizSubmitted(false)
                        setQuizAnswers({})
                        setQuizScore(null)
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false)
                        setQuizAnswers({})
                        setQuizScore(null)
                      }}
                      className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                    >
                      Retry Quiz
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {lesson.quiz?.questions.map((question, index) => (
                      <div key={question.id} className="border rounded-xl p-4">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="font-semibold text-lg flex-1">{question.text}</div>
                        </div>
                        
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleQuizAnswer(question.id, optionIndex)}
                              className={`w-full text-left p-3 rounded-lg border ${quizAnswers[question.id] === optionIndex
                                  ? 'bg-blue-50 border-blue-500'
                                  : 'hover:bg-gray-50'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded border flex items-center justify-center ${quizAnswers[question.id] === optionIndex
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'border-gray-300'
                                  }`}>
                                  {quizAnswers[question.id] === optionIndex && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                <span>{option}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(quizAnswers).length !== lesson.quiz?.questions.length}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 disabled:opacity-40 font-semibold"
                    >
                      Submit Quiz
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}