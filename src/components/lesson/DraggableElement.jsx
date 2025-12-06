'use client'

import { useRef, useState } from 'react'
import { GripVertical, X, Copy, Settings } from 'lucide-react'

export default function DraggableElement({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  index,
  total
}) {
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef(null)

  const handleDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.setData('elementId', element.id)
    e.dataTransfer.setData('elementType', element.type)
    e.dataTransfer.effectAllowed = 'move'

    if (dragRef.current) {
      e.dataTransfer.setDragImage(dragRef.current, 20, 20)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const getElementIcon = () => {
    switch (element.type) {
      case 'title': return '📝'
      case 'paragraph': return '📄'
      case 'image': return '🖼️'
      case 'video': return '🎥'
      case 'button': return '🔘'
      case 'list': return '📋'
      case 'card': return '🃏'
      case 'quiz': return '❓'
      case 'columns': return '📊'
      case 'grid': return '🔲'
      default: return '📦'
    }
  }

  const getContentPreview = () => {
    if (typeof element.content === 'string') {
      return element.content || 'محتوى فارغ'
    }
    if (element.type === 'quiz' && element.content && typeof element.content === 'object') {
      return `${element.content.title || 'اختبار'} (${element.content.questions?.length || 0} أسئلة)`
    }
    return 'محتوى معقد'
  }

  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        relative group
        ${isSelected ? 'ring-2 ring-primary-500 ring-offset-2 z-10' : ''}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        transition-all duration-200
      `}
    >
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <GripVertical size={14} className="cursor-move" />
            <span>{getElementIcon()}</span>
            <span className="capitalize">{element.type}</span>
          </div>

          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
            {index + 1}/{total}
          </span>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate(element.id)
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="نسخ"
          >
            <Copy size={14} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect(element.id)
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="تعديل"
          >
            <Settings size={14} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(element.id)
            }}
            className="p-1 hover:bg-red-100 text-red-600 rounded"
            title="حذف"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div
        onClick={() => onSelect(element.id)}
        className={`
          cursor-pointer
          bg-white border rounded-lg p-4
          hover:border-primary-300 transition-colors
          ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}
        `}
      >
        {element.type === 'title' && (
          <div className="text-lg font-bold truncate">
            {typeof element.content === 'string' ? (element.content || 'عنوان فارغ') : 'عنوان'}
          </div>
        )}

        {element.type === 'paragraph' && (
          <div className="text-sm text-gray-600 line-clamp-2">
            {typeof element.content === 'string' ? (element.content || 'فقرة نصية فارغة...') : 'فقرة'}
          </div>
        )}

        {element.type === 'image' && (
          <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
            {element.content && typeof element.content === 'string' ? (
              <img
                src={element.content}
                alt=""
                className="max-h-32 object-cover rounded"
              />
            ) : (
              <span className="text-gray-400">🖼️ صورة</span>
            )}
          </div>
        )}

        {element.type === 'button' && (
          <div className="inline-block px-4 py-2 bg-primary-500 text-white rounded">
            {typeof element.content === 'string' ? (element.content || 'زر') : 'زر'}
          </div>
        )}

        {element.type === 'quiz' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">❓</span>
              <div>
                <div className="font-semibold text-sm">
                  {element.content && typeof element.content === 'object' && element.content.title
                    ? element.content.title
                    : 'اختبار جديد'}
                </div>
                <div className="text-xs text-gray-500">
                  {element.content && typeof element.content === 'object' && element.content.questions
                    ? `${element.content.questions.length} أسئلة`
                    : '0 أسئلة'}
                </div>
              </div>
            </div>
          </div>
        )}

        {element.type === 'card' && (
          <div className="border rounded p-3">
            <div className="font-semibold mb-1">بطاقة</div>
            <div className="text-sm text-gray-600">محتوى البطاقة...</div>
          </div>
        )}

        {!['title', 'paragraph', 'image', 'button', 'quiz', 'card'].includes(element.type) && (
          <div className="text-sm text-gray-600">
            {getContentPreview()}
          </div>
        )}

        <div className="mt-2 flex flex-wrap gap-1">
          {Object.entries(element.styles || {}).slice(0, 3).map(([key, value]) => (
            <span
              key={key}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              {key}: {String(value)}
            </span>
          ))}

          {Object.keys(element.styles || {}).length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              +{Object.keys(element.styles || {}).length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center cursor-move">
          <GripVertical size={14} className="text-white" />
        </div>
      </div>
    </div>
  )
}
