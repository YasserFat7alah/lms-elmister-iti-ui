// File: app/student/lessons/page.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { lessonsStore } from '@/lib/lessonsStore'
import {
  BookOpen,
  Clock,
  User,
  Star,
  Filter,
  Search,
  Grid,
  List
} from 'lucide-react'

export default function StudentLessonsPage({ studentId }) {
  const [lessons, setLessons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, enrolled, completed, in-progress
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    loadLessons()
  }, [studentId])

  const loadLessons = () => {
    // الحصول على جميع الدروس المنشورة
    const allLessons = lessonsStore.lessons.filter(lesson => lesson.published)
    
    // إضافة معلومات التقدم للطالب
    const lessonsWithProgress = allLessons.map(lesson => {
      const progress = lessonsStore.studentProgress.find(
        p => p.studentId === studentId && p.lessonId === lesson.id
      )
      
      return {
        ...lesson,
        progress: progress || null,
        isEnrolled: lessonsStore.enrollments.some(
          e => e.studentId === studentId && e.courseId === lesson.courseId
        )
      }
    })
    
    setLessons(lessonsWithProgress)
  }

  const filteredLessons = lessons.filter(lesson => {
    // البحث
    if (searchTerm && !lesson.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    // التصفية
    switch (filter) {
      case 'enrolled':
        return lesson.isEnrolled
      case 'completed':
        return lesson.progress?.completed
      case 'in-progress':
        return lesson.progress && !lesson.progress.completed
      default:
        return true
    }
  })

  const handleEnroll = (courseId) => {
    if (lessonsStore.enrollStudent(studentId, courseId)) {
      alert('✅ تم التسجيل في الكورس بنجاح')
      loadLessons() // إعادة تحميل الدروس
    } else {
      alert('⚠️ أنت مسجل بالفعل في هذا الكورس')
    }
  }

  const getProgressColor = (progress) => {
    if (!progress) return 'bg-gray-200'
    if (progress.completed) return 'bg-green-500'
    return 'bg-blue-500'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📚 مكتبة الدروس</h1>
        <p className="text-gray-600">استكشف وادرس الدروس المتاحة</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن درس..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-4 pr-12 border rounded-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-3 border rounded-lg"
            >
              <option value="all">جميع الدروس</option>
              <option value="enrolled">المسجل بها</option>
              <option value="in-progress">قيد الدراسة</option>
              <option value="completed">مكتملة</option>
            </select>

            {/* View Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              studentId={studentId}
              onEnroll={handleEnroll}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLessons.map(lesson => (
            <LessonListItem
              key={lesson.id}
              lesson={lesson}
              studentId={studentId}
              onEnroll={handleEnroll}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">لا توجد دروس</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'لم يتم العثور على دروس تطابق بحثك'
              : 'لا توجد درروس متاحة حالياً'}
          </p>
        </div>
      )}
    </div>
  )
}

// مكون البطاقة
function LessonCard({ lesson, studentId, onEnroll }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      {/* Progress Bar */}
      <div className="h-2">
        <div 
          className={`h-full ${getProgressColor(lesson.progress)} transition-all duration-500`}
          style={{ width: `${lesson.progress?.percentage || 0}%` }}
        />
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{lesson.title}</h3>
              <p className="text-sm text-gray-500">مدة: {lesson.metadata?.duration || 'غير محدد'}</p>
            </div>
          </div>
          
          {lesson.progress?.completed && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              مكتمل
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {lesson.description || 'لا يوجد وصف'}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {lesson.metadata?.elementCount || 0} عنصر
            </span>
            <span className="flex items-center gap-1">
              <User size={14} />
              {lesson.views || 0} مشاهدة
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400" />
            <span>4.5</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {lesson.isEnrolled ? (
            <Link
              href={`/student/lessons/${lesson.id}`}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
            >
              {lesson.progress ? 'استمر في الدراسة' : 'ابدأ الدراسة'}
            </Link>
          ) : (
            <button
              onClick={() => onEnroll(lesson.courseId)}
              className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              سجل في الكورس
            </button>
          )}
          
          <Link
            href={`/student/lessons/${lesson.id}/preview`}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            معاينة
          </Link>
        </div>
      </div>
    </div>
  )
}

// مكون قائمة الدروس
function LessonListItem({ lesson, studentId, onEnroll }) {
  return (
    <div className="bg-white rounded-xl p-4 border flex items-center justify-between hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold">{lesson.title}</h3>
            {lesson.progress?.completed && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                مكتمل
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>المعلم: {lesson.teacherName || 'غير معروف'}</span>
            <span>{lesson.metadata?.elementCount || 0} عنصر</span>
            <span>{lesson.views || 0} مشاهدة</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-32 mx-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>التقدم</span>
          <span>{lesson.progress?.percentage || 0}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressColor(lesson.progress)} transition-all duration-500`}
            style={{ width: `${lesson.progress?.percentage || 0}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {lesson.isEnrolled ? (
          <Link
            href={`/student/lessons/${lesson.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {lesson.progress ? 'استمر' : 'ابدأ'}
          </Link>
        ) : (
          <button
            onClick={() => onEnroll(lesson.courseId)}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            سجل
          </button>
        )}
      </div>
    </div>
  )
}