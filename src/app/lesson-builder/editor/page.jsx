'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import EditorToolbar from '@/components/lesson/EditorToolbar'
import ElementsPanel from '@/components/lesson/ElementsPanel'
import PropertiesPanel from '@/components/lesson/PropertiesPanel'
import { lessonsStore } from '@/lib/lessonsStore' // المتجر الجديد

// Lazy load to improve performance
const CanvasArea = dynamic(() => import('@/components/lesson/CanvasArea'), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 animate-pulse rounded-lg" />
})

export default function EditorPage() {
  const router = useRouter()
  const [elements, setElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  // بيانات إضافية للربط مع الطلاب
  const [currentTeacherId] = useState('teacher_123') // تأتي من نظام تسجيل الدخول
  const [selectedCourseId, setSelectedCourseId] = ["esam" , 8]//useState('')
  const [lessonTitle, setLessonTitle] = useState('')
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveMode, setSaveMode] = useState('draft') // 'draft' or 'publish'
  const [courses, setCourses] = useState([])

  // تحميل الكورسات الخاصة بالمعلم
  useEffect(() => {
    loadTeacherCourses()
    
    // تحميل درس سابق إذا كان هناك ID في الرابط
    const urlParams = new URLSearchParams(window.location.search)
    const editLessonId = urlParams.get('edit')
    
    if (editLessonId) {
      loadLessonForEditing(editLessonId)
    }
  }, [])

  const loadTeacherCourses = () => {
    // محاكاة جلب الكورسات من API
    const savedCourses = JSON.parse(localStorage.getItem(`teacher_${currentTeacherId}_courses`) || '[]')
    setCourses(savedCourses)
    
    if (savedCourses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(savedCourses[0].id)
    }
  }

  const loadLessonForEditing = (lessonId) => {
    const lesson = lessonsStore.getLesson(lessonId)
    if (lesson && lesson.teacherId === currentTeacherId) {
      setElements(lesson.elements || [])
      setLessonTitle(lesson.title || '')
      setSelectedCourseId(lesson.courseId || '')
      saveToHistory(lesson.elements || [])
    }
  }

  const handleAddElement = (type) => {
    const newElement = {
      id: `elem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type)
    }

    const newElements = [...elements, newElement]
    setElements(newElements)
    setSelectedElement(newElement.id)
    saveToHistory(newElements)
    return newElement
  }

  const handleElementUpdate = (id, updates) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, ...updates } : el
    )
    setElements(newElements)
    saveToHistory(newElements)
  }

  const handleReorder = (newElements) => {
    setElements(newElements)
    saveToHistory(newElements)
  }

  const saveToHistory = (newElements) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newElements]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setElements(history[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setElements(history[historyIndex + 1])
    }
  }

  const handleSave = async (saveMode = 'draft') => {
    try {
      // التحقق من المدخلات
      if (!lessonTitle.trim()) {
        alert('⚠️ الرجاء إدخال عنوان للدرس')
        return
      }

      if (!selectedCourseId) {
        alert('⚠️ الرجاء اختيار كورس')
        return
      }

      // إنشاء أو تحديث بيانات الدرس
      const urlParams = new URLSearchParams(window.location.search)
      const editLessonId = urlParams.get('edit')
      const lessonId = editLessonId || `lesson_${Date.now()}`
      
      const lessonData = {
        id: lessonId,
        title: lessonTitle,
        description: `درس تم إنشاؤه بواسطة ${currentTeacherId}`,
        elements,
        teacherId: currentTeacherId,
        teacherName: 'المعلم أحمد محمد', // من بيانات المستخدم
        courseId: selectedCourseId,
        courseName: courses.find(c => c.id === selectedCourseId)?.title || 'كورس',
        metadata: {
          elementCount: elements.length,
          hasQuiz: elements.some(el => el.type === 'quiz'),
          hasImages: elements.some(el => el.type === 'image'),
          hasVideo: elements.some(el => el.type === 'video'),
          estimatedTime: calculateEstimatedTime(elements),
          difficulty: 'متوسط'
        },
        version: editLessonId ? 2 : 1,
        status: saveMode === 'publish' ? 'published' : 'draft',
        published: saveMode === 'publish',
        views: 0
      }

      // حفظ في المتجر المركزي
      lessonsStore.saveLesson(lessonData)
      
      // إذا كان نشر للطلاب
      if (saveMode === 'publish') {
        lessonsStore.publishLesson(lessonId)
        
        // إنشاء رابط الدرس للطلاب
        const studentLessonUrl = `${window.location.origin}/student/lessons/${lessonId}`
        
        // حفظ في قائمة الدروس المنشورة
        const publishedLessons = JSON.parse(localStorage.getItem('published_lessons') || '[]')
        publishedLessons.unshift({
          id: lessonId,
          title: lessonTitle,
          publishedAt: new Date().toISOString(),
          url: studentLessonUrl
        })
        localStorage.setItem('published_lessons', JSON.stringify(publishedLessons.slice(0, 50)))
        
        alert(`✅ تم نشر الدرس بنجاح!\n\n🔗 رابط الدرس للطلاب:\n${studentLessonUrl}\n\nيمكنك نسخ الرابط ومشاركته مع طلابك.`)
      } else {
        alert('✅ تم حفظ المسودة بنجاح')
      }

      // حفظ في localStorage للنسخ الاحتياطي
      localStorage.setItem(`lesson_${lessonId}`, JSON.stringify(lessonData))
      
      // تحديث قائمة الدروس الأخيرة
      updateRecentLessons(lessonId, lessonTitle, saveMode)
      
      // إغلاق المودال إذا كان مفتوحاً
      setShowSaveModal(false)
      
      return lessonId
    } catch (error) {
      alert(`❌ خطأ في الحفظ: ${error.message}`)
    }
  }

  const calculateEstimatedTime = (elements) => {
    let time = 0
    elements.forEach(el => {
      switch(el.type) {
        case 'title': case 'subtitle': time += 0.5; break
        case 'paragraph': time += 2; break
        case 'image': time += 1; break
        case 'list': time += 3; break
        case 'quiz': time += 10; break
        case 'video': time += 5; break
        default: time += 1
      }
    })
    return `${Math.ceil(time)} دقائق`
  }

  const updateRecentLessons = (lessonId, title, saveMode) => {
    const recentLessons = JSON.parse(localStorage.getItem('recent_lessons') || '[]')
    recentLessons.unshift({
      id: lessonId,
      title,
      savedAt: new Date().toISOString(),
      mode: saveMode,
      elementCount: elements.length
    })
    localStorage.setItem('recent_lessons', JSON.stringify(recentLessons.slice(0, 20)))
  }

  const handleExport = async (format = 'json') => {
    try {
      const template = {
        name: lessonTitle || `Lesson_${new Date().toISOString().split('T')[0]}`,
        title: lessonTitle,
        elements,
        teacherId: currentTeacherId,
        courseId: selectedCourseId,
        createdAt: new Date().toISOString(),
        version: 1
      }

      const exported = format === 'json' 
        ? JSON.stringify(template, null, 2)
        : exportTemplate(template, format)

      if (format === 'json') {
        const blob = new Blob([exported], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${lessonTitle.replace(/\s+/g, '_')}_${Date.now()}.${format}`
        a.click()
        URL.revokeObjectURL(url)
      } else if (format === 'html') {
        const blob = new Blob([exported], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${lessonTitle.replace(/\s+/g, '_')}_${Date.now()}.html`
        a.click()
        URL.revokeObjectURL(url)
      } else if (format === 'markdown') {
        const blob = new Blob([exported], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${lessonTitle.replace(/\s+/g, '_')}_${Date.now()}.md`
        a.click()
        URL.revokeObjectURL(url)
      }

      alert(`✅ تم التصدير كـ ${format.toUpperCase()} بنجاح!`)
    } catch (error) {
      alert(`❌ خطأ في التصدير: ${error.message}`)
    }
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target.result
        const template = JSON.parse(content)

        if (template.elements && Array.isArray(template.elements)) {
          setElements(template.elements)
          if (template.title) setLessonTitle(template.title)
          if (template.courseId) setSelectedCourseId(template.courseId)
          saveToHistory(template.elements)
          alert('✅ تم استيراد القالب بنجاح!')
        } else {
          throw new Error('الملف لا يحتوي على قالب صالح')
        }
      } catch (error) {
        alert(`❌ خطأ في استيراد الملف: ${error.message}`)
      }
    }
    reader.readAsText(file)
  }

  const handlePreview = () => {
    const template = {
      name: lessonTitle || `Preview_${Date.now()}`,
      title: lessonTitle,
      elements,
      teacherId: currentTeacherId,
      courseId: selectedCourseId,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('preview_template', JSON.stringify(template))

    const previewWindow = window.open('/lesson-builder/preview', '_blank')
    if (previewWindow) {
      previewWindow.focus()
    }
  }

  const handlePreviewAsStudent = () => {
    // إنشاء نسخة مؤقتة للدرس
    const tempLessonId = `preview_${Date.now()}`
    const tempLessonData = {
      id: tempLessonId,
      title: lessonTitle || 'معاينة الدرس',
      elements,
      teacherId: currentTeacherId,
      courseId: selectedCourseId,
      published: true, // لجعلها مرئية في صفحة الطالب
      isPreview: true
    }
    
    // حفظ نسخة مؤقتة
    localStorage.setItem(`lesson_${tempLessonId}`, JSON.stringify(tempLessonData))
    
    // فتح صفحة الطالب في نافذة جديدة
    const studentWindow = window.open(`/student/lessons/${tempLessonId}?preview=true`, '_blank')
    if (studentWindow) {
      studentWindow.focus()
    }
  }

  const getDefaultContent = (type) => {
    const contents = {
      title: 'عنوان جديد',
      paragraph: 'اكتب محتوى الفقرة هنا...',
      subtitle: 'عنوان فرعي',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      button: 'انقر هنا',
      list: 'العنصر الأول\nالعنصر الثاني\nالعنصر الثالث',
      quote: '"الاقتباس هو كلمات الآخرين التي نجد فيها أنفسنا."',
      card: 'محتوى البطاقة',
      section: 'محتوى القسم',
      columns: '',
      grid: '',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      quiz: {
        title: 'اختبار جديد',
        questions: [
          {
            id: 1,
            text: 'السؤال الأول؟',
            options: ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'],
            correctAnswer: 0
          }
        ]
      }
    }
    return contents[type] || ''
  }

  const getDefaultStyles = (type) => {
    const defaults = {
      title: {
        fontSize: '2xl',
        fontWeight: 'bold',
        color: 'text-gray-900',
        align: 'right',
        marginTop: 4,
        marginBottom: 2
      },
      subtitle: {
        fontSize: 'xl',
        fontWeight: 'semibold',
        color: 'text-gray-700',
        align: 'right',
        marginTop: 2,
        marginBottom: 3
      },
      paragraph: {
        fontSize: 'base',
        lineHeight: 'relaxed',
        color: 'text-gray-600',
        align: 'right',
        marginBottom: 4,
        backgroundColor: 'bg-transparent'
      },
      image: {
        width: 'full',
        maxWidth: 'full',
        borderRadius: 'lg',
        marginY: 4,
        objectFit: 'cover'
      },
      button: {
        backgroundColor: 'bg-blue-600',
        textColor: 'text-white',
        paddingX: 6,
        paddingY: 2,
        borderRadius: 'md',
        fontSize: 'base',
        fontWeight: 'medium',
        display: 'inline-block'
      },
      list: {
        type: 'ul',
        spacing: 2,
        color: 'text-gray-600',
        paddingRight: 4
      },
      quote: {
        borderRightWidth: 4,
        borderRightColor: 'border-blue-500',
        paddingRight: 4,
        fontSize: 'lg',
        fontStyle: 'italic',
        color: 'text-gray-700'
      },
      card: {
        backgroundColor: 'bg-white',
        padding: 6,
        borderRadius: 'xl',
        shadow: 'md',
        borderWidth: 1,
        borderColor: 'border-gray-200'
      },
      section: {
        paddingY: 8,
        backgroundColor: 'bg-transparent'
      },
      columns: {
        count: 2,
        gap: 6,
        backgroundColor: 'bg-transparent'
      },
      grid: {
        cols: 3,
        gap: 4,
        backgroundColor: 'bg-transparent'
      },
      video: {
        width: 'full',
        aspectRatio: '16/9',
        borderRadius: 'lg',
        marginY: 4
      },
      quiz: {
        backgroundColor: 'bg-white',
        padding: 6,
        borderRadius: 'xl',
        shadow: 'md',
        borderWidth: 1,
        borderColor: 'border-blue-200'
      }
    }
    return defaults[type] || {}
  }

  const handleDeleteElement = (id) => {
    if (confirm('هل تريد حذف هذا العنصر؟')) {
      const newElements = elements.filter(el => el.id !== id)
      setElements(newElements)
      saveToHistory(newElements)
      if (selectedElement === id) {
        setSelectedElement(null)
      }
    }
  }

  const handleDuplicateElement = (id) => {
    const element = elements.find(el => el.id === id)
    if (!element) return

    const newElement = {
      ...element,
      id: `elem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: element.type === 'quiz'
        ? { ...element.content, title: `${element.content.title} (نسخة)` }
        : element.type === 'image' || element.type === 'video'
          ? element.content
          : `${element.content} (نسخة)`
    }

    const index = elements.findIndex(el => el.id === id)
    const newElements = [
      ...elements.slice(0, index + 1),
      newElement,
      ...elements.slice(index + 1)
    ]

    setElements(newElements)
    setSelectedElement(newElement.id)
    saveToHistory(newElements)
  }

  const handleMoveElement = (id, direction) => {
    const index = elements.findIndex(el => el.id === id)
    if (index === -1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= elements.length) return

    const newElements = [...elements]
    ;[newElements[index], newElements[newIndex]] = [newElements[newIndex], newElements[index]]

    setElements(newElements)
    saveToHistory(newElements)
  }

  const openSaveModal = (mode = 'draft') => {
    setSaveMode(mode)
    setShowSaveModal(true)
  }

  const renderSaveModal = () => {
    if (!showSaveModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {saveMode === 'publish' ? '📤 نشر الدرس' : '💾 حفظ الدرس'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">عنوان الدرس *</label>
                <input
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="أدخل عنوان الدرس"
                  className="w-full p-3 border rounded-lg"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">الكورس *</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">اختر كورس</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">معلومات الدرس:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>عدد العناصر:</span>
                    <span className="font-medium">{elements.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الوقت المقدر:</span>
                    <span className="font-medium">{calculateEstimatedTime(elements)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الحالة:</span>
                    <span className="font-medium">{saveMode === 'publish' ? 'منشور للطلاب' : 'مسودة'}</span>
                  </div>
                </div>
              </div>
              
              {saveMode === 'publish' && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-700 mb-1">⚠️ ملاحظة هامة:</h4>
                  <p className="text-sm text-blue-600">
                    سيصبح الدرس مرئياً لجميع الطلاب المسجلين في الكورس بعد النشر.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleSave(saveMode)}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {saveMode === 'publish' ? 'نشر الدرس' : 'حفظ كمسودة'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toolbar المعدل */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">
                {lessonTitle || 'محرر الدروس'}
              </h2>
              <span className="text-sm text-gray-500">
                {elements.length} عناصر
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => openSaveModal('draft')}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                💾 حفظ مسودة
              </button>
              
              <button
                onClick={() => openSaveModal('publish')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                📤 نشر للطلاب
              </button>
              
              <button
                onClick={handlePreviewAsStudent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                👁️ معاينة كطالب
              </button>
            </div>
          </div>
        </div>
        
        {/* EditorToolbar الأساسي */}
        <EditorToolbar
          onSave={() => openSaveModal('draft')}
          onPreview={handlePreview}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onExport={handleExport}
          onImport={handleImport}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Elements */}
        <ElementsPanel onAddElement={handleAddElement} />

        {/* Middle - Canvas */}
        <div className="flex-1 overflow-auto p-4">
          <CanvasArea
            elements={elements}
            selectedElement={selectedElement}
            onSelect={setSelectedElement}
            onElementUpdate={handleElementUpdate}
            onReorder={handleReorder}
            onAdd={handleAddElement}
            onDelete={handleDeleteElement}
            onDuplicate={handleDuplicateElement}
            onMove={handleMoveElement}
          />
        </div>

        {/* Right Panel - Properties */}
        <PropertiesPanel
          element={elements.find(el => el.id === selectedElement)}
          onUpdate={(updates) => handleElementUpdate(selectedElement, updates)}
        />
      </div>

      {/* Status Bar المحدث */}
      <div className="bg-white border-t px-4 py-2 text-sm text-gray-500 flex justify-between">
        <div className="flex items-center gap-4">
          <span>عدد العناصر: {elements.length}</span>
          <span>الحالة: {selectedElement ? 'محدد' : 'جاهز'}</span>
          <span>الإصدار: {historyIndex + 1}</span>
          <span>المعلم: {currentTeacherId}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/teacher/dashboard')}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            لوحة التحكم
          </button>
          <button
            onClick={() => router.push('/teacher/lessons')}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
          >
            جميع الدروس
          </button>
        </div>
      </div>

      {/* Modal حفظ/نشر */}
      {renderSaveModal()}
    </div>
  )
}