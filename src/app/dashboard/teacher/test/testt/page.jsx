"use client"

import { useState } from 'react'
import { Video, MapPin, Clock, Play, CheckCircle, XCircle, Calendar, ArrowLeft } from 'lucide-react'

// مكونات UI المبسطة
function Card({ children, className = "" }) {
  return <div className={`rounded-xl border bg-white shadow ${className}`}>{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    destructive: "bg-red-100 text-red-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700 bg-white"
  }
  
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

function Button({ children, variant = "default", size = "default", className = "", onClick }) {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
  }
  
  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-6 py-3 text-base"
  }
  
  return (
    <button 
      className={`rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// مكون LessonCard الرئيسي
function LessonCard({ lesson, showCourse = true, compact = false, onJoin }) {
  const { format, isToday, isTomorrow, isPast, isFuture, differenceInMinutes } = require('date-fns')
  const { ar } = require('date-fns/locale')
  
  const scheduledDate = new Date(lesson.scheduledAt)
  const endDate = new Date(scheduledDate.getTime() + (lesson.durationMinutes || 60) * 60000)
  const now = new Date()
  
  const isLive = lesson.status === "live" || (now >= scheduledDate && now <= endDate && lesson.status === "scheduled")
  const isCompleted = lesson.status === "completed" || isPast(endDate)
  const isUpcoming = isFuture(scheduledDate)
  
  const minutesUntil = differenceInMinutes(scheduledDate, now)
  const isStartingSoon = minutesUntil > 0 && minutesUntil <= 30

  const getDateLabel = () => {
    if (isToday(scheduledDate)) return "اليوم"
    if (isTomorrow(scheduledDate)) return "غداً"
    return format(scheduledDate, "EEEE، d MMMM", { locale: ar })
  }

  const getTimeLabel = () => {
    return format(scheduledDate, "h:mm a", { locale: ar })
  }

  const getStatusBadge = () => {
    if (isLive) {
      return (
        <Badge variant="destructive" className="animate-pulse gap-1">
          <span className="w-2 h-2 rounded-full bg-white"></span>
          مباشر
        </Badge>
      )
    }
    if (isStartingSoon) {
      return (
        <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
          يبدأ قريباً
        </Badge>
      )
    }
    if (isCompleted) {
      return (
        <Badge variant="secondary" className="gap-1">
          <CheckCircle className="w-3 h-3" />
          مكتمل
        </Badge>
      )
    }
    if (lesson.status === "cancelled") {
      return (
        <Badge variant="outline" className="gap-1 text-gray-500">
          <XCircle className="w-3 h-3" />
          ملغي
        </Badge>
      )
    }
    return null
  }

  const DeliveryIcon = lesson.deliveryType === "online" ? Video : MapPin

  const handleClick = () => {
    if (onJoin) {
      onJoin(lesson.id)
    } else {
      alert(`الدخول إلى الدرس: ${lesson.title}`)
    }
  }

  if (compact) {
    return (
      <div 
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 hover:shadow transition-all cursor-pointer border"
        onClick={handleClick}
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isLive ? "bg-red-100 text-red-600" : 
          isUpcoming ? "bg-blue-100 text-blue-600" : 
          "bg-gray-100 text-gray-600"
        }`}>
          {isLive ? (
            <Play className="w-4 h-4" />
          ) : (
            <Calendar className="w-4 h-4" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{lesson.title}</p>
          <p className="text-xs text-gray-500">
            {getDateLabel()} • {getTimeLabel()}
          </p>
        </div>
        {getStatusBadge()}
      </div>
    )
  }

  return (
    <Card className="group overflow-visible hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            isLive ? "bg-red-600 text-white" : 
            isUpcoming ? "bg-blue-100 text-blue-600" : 
            "bg-gray-100 text-gray-600"
          }`}>
            {isLive ? (
              <Play className="w-5 h-5" />
            ) : isCompleted ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Calendar className="w-5 h-5" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold leading-tight text-gray-900">
                {lesson.title}
              </h3>
              {getStatusBadge()}
            </div>
            
            {lesson.course && showCourse && (
              <p className="text-sm text-gray-600 mb-2">
                {lesson.course.title}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{getDateLabel()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{getTimeLabel()}</span>
              </div>
              <div className="flex items-center gap-1">
                <DeliveryIcon className="w-3.5 h-3.5" />
                <span>{lesson.deliveryType === "online" ? "أونلاين" : "حضوري"}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <span>{lesson.durationMinutes} دقيقة</span>
              </div>
            </div>
          </div>
          
          <div className="shrink-0">
            <Button 
              variant={isLive ? "default" : "secondary"} 
              size="sm" 
              className="gap-1.5"
              onClick={handleClick}
            >
              {isLive ? (
                <>
                  <Play className="w-3.5 h-3.5" />
                  انضم الآن
                </>
              ) : (
                <>
                  عرض
                  <ArrowLeft className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// الصفحة الرئيسية
export default function HomePage() {
  const [viewMode, setViewMode] = useState('full')
  const [selectedStatus, setSelectedStatus] = useState('live')
  const [deliveryType, setDeliveryType] = useState('online')
  const [showCourse, setShowCourse] = useState(true)

  // بيانات تجريبية
  const courses = [
    { id: 1, title: "الرياضيات للمستوى المتقدم" },
    { id: 2, title: "الفيزياء الأساسية" },
    { id: 3, title: "الإنجليزية للمحادثة" },
    { id: 4, title: "برمجة متقدمة" },
  ]

  const sampleLessons = [
    {
      id: 1,
      title: "الرياضيات المتقدمة - الجبر الخطي",
      scheduledAt: new Date(),
      durationMinutes: 60,
      deliveryType: deliveryType,
      status: selectedStatus,
      courseId: 1,
      course: courses[0]
    },
    {
      id: 2,
      title: "الفيزياء - الديناميكا الحرارية",
      scheduledAt: new Date(Date.now() + 15 * 60000),
      durationMinutes: 90,
      deliveryType: "in-person",
      status: "scheduled",
      courseId: 2,
      course: courses[1]
    },
    {
      id: 3,
      title: "اللغة الإنجليزية - المحادثة",
      scheduledAt: new Date(Date.now() + 24 * 60 * 60000),
      durationMinutes: 45,
      deliveryType: "online",
      status: "scheduled",
      courseId: 3,
      course: courses[2]
    },
    {
      id: 4,
      title: "البرمجة - هياكل البيانات",
      scheduledAt: new Date(Date.now() - 2 * 60 * 60000),
      durationMinutes: 120,
      deliveryType: "online",
      status: "completed",
      courseId: 4,
      course: courses[3]
    },
    {
      id: 5,
      title: "التاريخ - العصر العباسي",
      scheduledAt: new Date(Date.now() + 48 * 60 * 60000),
      durationMinutes: 75,
      deliveryType: "in-person",
      status: "cancelled",
      courseId: 5,
      course: { id: 5, title: "التاريخ الإسلامي" }
    }
  ]

  const customLesson = {
    ...sampleLessons[0],
    status: selectedStatus,
    deliveryType: deliveryType,
    title: selectedStatus === "live" ? "الرياضيات - درس مباشر" :
           selectedStatus === "scheduled" ? "الفيزياء - درس قادم" :
           selectedStatus === "completed" ? "التاريخ - درس مكتمل" :
           "الأدب - درس ملغي"
  }

  const handleJoinLesson = (lessonId) => {
    alert(`الدخول إلى الدرس رقم: ${lessonId}`)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'live': return 'bg-red-100 text-red-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'live': return 'مباشر'
      case 'scheduled': return 'قادم'
      case 'completed': return 'مكتمل'
      case 'cancelled': return 'ملغى'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">نظام إدارة الدروس التعليمية</h1>
        <p className="text-gray-600 mt-2">عرض تفاعلي لمكون بطاقة الدرس - Next.js مع JavaScript</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg mb-4 text-gray-800">إعدادات العرض</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نمط العرض</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('full')}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${viewMode === 'full' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      كامل
                    </button>
                    <button
                      onClick={() => setViewMode('compact')}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${viewMode === 'compact' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      مضغوط
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حالة الدرس</label>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="live">مباشر</option>
                    <option value="scheduled">قادم</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع التوصيل</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeliveryType('online')}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${deliveryType === 'online' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      أونلاين
                    </button>
                    <button
                      onClick={() => setDeliveryType('in-person')}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${deliveryType === 'in-person' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      حضوري
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showCourse}
                      onChange={(e) => setShowCourse(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">عرض اسم المادة</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Info */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg mb-4 text-gray-800">معلومات الدرس</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">عنوان الدرس:</span>
                  <span className="text-gray-700 text-sm">{customLesson.title}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">الحالة:</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(selectedStatus)}`}>
                    {getStatusText(selectedStatus)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">نوع التوصيل:</span>
                  <span className="text-gray-700">
                    {deliveryType === 'online' ? 'أونلاين' : 'حضوري'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">المدة:</span>
                  <span className="text-gray-700">{customLesson.durationMinutes} دقيقة</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg mb-4 text-gray-800">معاينة بطاقة الدرس</h2>
              <p className="text-sm text-gray-600 mb-4">تغيير الإعدادات على اليمين لرؤية التغييرات مباشرة</p>
              <div className="space-y-4">
                <LessonCard 
                  lesson={customLesson}
                  showCourse={showCourse}
                  compact={viewMode === 'compact'}
                  onJoin={handleJoinLesson}
                />
              </div>
            </CardContent>
          </Card>

          {/* Multiple Lessons */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg mb-4 text-gray-800">قائمة الدروس</h2>
              <p className="text-sm text-gray-600 mb-4">نماذج متعددة لأنواع مختلفة من الدروس</p>
              <div className="space-y-4">
                {sampleLessons.map((lesson) => (
                  <LessonCard 
                    key={lesson.id}
                    lesson={lesson}
                    showCourse={true}
                    compact={false}
                    onJoin={handleJoinLesson}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg mb-4 text-gray-800">كيفية الاستخدام</h2>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>
{`<LessonCard 
  lesson={{
    id: 1,
    title: "الرياضيات المتقدمة",
    scheduledAt: new Date(),
    durationMinutes: 60,
    deliveryType: "online",
    status: "live",
    courseId: 1,
    course: { title: "الرياضيات المتقدمة" }
  }}
  showCourse={true}
  compact={false}
  onJoin={(id) => console.log('Join lesson:', id)}
/>`}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center text-gray-600 text-sm">
          <p>مكون LessonCard - مصمم ليكون سهل التكامل مع Next.js</p>
          <p className="mt-1">يعمل مع React 18+ ويدعم العربية بالكامل</p>
        </div>
      </footer>
    </div>
  )
}