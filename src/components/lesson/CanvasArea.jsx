'use client'

import { useState, useRef } from 'react'
import {
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Plus
} from 'lucide-react'

export default function CanvasArea({
  elements = [],
  selectedElement,
  onSelect,
  onElementUpdate,
  onReorder,
  onAdd,
  onDelete,
  onDuplicate,
  onMove
}) {
  const [draggedElement, setDraggedElement] = useState(null)
  const [dropPosition, setDropPosition] = useState(null)
  const [editingElement, setEditingElement] = useState(null)
  const containerRef = useRef(null)

  const handleDragStart = (e, elementId) => {
    e.dataTransfer.setData('elementId', elementId)
    e.dataTransfer.effectAllowed = 'move'
    setDraggedElement(elementId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const y = e.clientY - rect.top

    let closestIndex = 0
    let closestPosition = 'before'
    let closestDistance = Infinity

    const elementDivs = container.querySelectorAll('[data-element]')
    elementDivs.forEach((div, index) => {
      const divRect = div.getBoundingClientRect()
      const divTop = divRect.top - rect.top
      const divBottom = divRect.bottom - rect.top

      const distanceToTop = Math.abs(y - divTop)
      if (distanceToTop < closestDistance) {
        closestDistance = distanceToTop
        closestIndex = index
        closestPosition = 'before'
      }

      const distanceToBottom = Math.abs(y - divBottom)
      if (distanceToBottom < closestDistance) {
        closestDistance = distanceToBottom
        closestIndex = index
        closestPosition = 'after'
      }
    })

    if (y > rect.height - 50) {
      closestIndex = elements.length
      closestPosition = 'after'
    }

    setDropPosition({ index: closestIndex, position: closestPosition })
  }

  const handleDrop = (e) => {
    e.preventDefault()

    const draggedId = e.dataTransfer.getData('elementId')
    const elementType = e.dataTransfer.getData('elementType')

    if (draggedId && dropPosition) {
      const draggedIndex = elements.findIndex(el => el.id === draggedId)
      if (draggedIndex === -1) return

      const newElements = [...elements]
      const [dragged] = newElements.splice(draggedIndex, 1)

      const insertIndex = dropPosition.position === 'before'
        ? dropPosition.index
        : dropPosition.index + 1

      const finalIndex = (draggedIndex < insertIndex) ? insertIndex - 1 : insertIndex

      newElements.splice(finalIndex, 0, dragged)

      onReorder && onReorder(newElements)
    } else if (elementType && onAdd) {
      onAdd(elementType)
    }

    setDraggedElement(null)
    setDropPosition(null)
  }

  const handleDragEnd = () => {
    setDraggedElement(null)
    setDropPosition(null)
  }

  const handleDoubleClick = (elementId) => {
    setEditingElement(elementId)
  }

  const renderElementContent = (element) => {
    const isEditing = editingElement === element.id
    const isSelected = selectedElement === element.id

    const baseClasses = `
      p-4 rounded-lg border-2 transition-all cursor-pointer
      ${isSelected ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-white hover:border-gray-300'}
    `

    const styleClasses = `
      ${element.styles?.fontSize ? `text-${element.styles.fontSize}` : ''}
      ${element.styles?.color || ''}
      ${element.styles?.align ? `text-${element.styles.align}` : ''}
      ${element.styles?.fontWeight === 'bold' ? 'font-bold' : ''}
      ${element.styles?.fontStyle === 'italic' ? 'italic' : ''}
      ${element.styles?.textDecoration === 'underline' ? 'underline' : ''}
      ${element.styles?.backgroundColor || ''}
      ${element.styles?.borderRadius ? `rounded-${element.styles.borderRadius}` : ''}
      ${element.styles?.marginTop ? `mt-${element.styles.marginTop}` : ''}
      ${element.styles?.marginBottom ? `mb-${element.styles.marginBottom}` : ''}
    `

    switch (element.type) {
      case 'title':
        return (
          <div className={`${baseClasses} ${styleClasses}`} onDoubleClick={() => handleDoubleClick(element.id)}>
            {isEditing ? (
              <input
                type="text"
                value={element.content}
                onChange={(e) => onElementUpdate(element.id, { content: e.target.value })}
                onBlur={() => setEditingElement(null)}
                className="w-full bg-transparent border-b-2 border-blue-400 outline-none text-3xl font-bold"
                autoFocus
              />
            ) : (
              <h1 className="text-3xl font-bold">{element.content || 'عنوان رئيسي'}</h1>
            )}
          </div>
        )

      case 'subtitle':
        return (
          <div className={`${baseClasses} ${styleClasses}`} onDoubleClick={() => handleDoubleClick(element.id)}>
            {isEditing ? (
              <input
                type="text"
                value={element.content}
                onChange={(e) => onElementUpdate(element.id, { content: e.target.value })}
                onBlur={() => setEditingElement(null)}
                className="w-full bg-transparent border-b-2 border-blue-400 outline-none text-2xl font-semibold"
                autoFocus
              />
            ) : (
              <h2 className="text-2xl font-semibold">{element.content || 'عنوان فرعي'}</h2>
            )}
          </div>
        )

      case 'paragraph':
        return (
          <div className={`${baseClasses} ${styleClasses}`} onDoubleClick={() => handleDoubleClick(element.id)}>
            {isEditing ? (
              <textarea
                value={element.content}
                onChange={(e) => onElementUpdate(element.id, { content: e.target.value })}
                onBlur={() => setEditingElement(null)}
                className="w-full bg-transparent border-2 border-blue-400 outline-none p-2 rounded min-h-[100px]"
                autoFocus
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{element.content || 'فقرة نصية...'}</p>
            )}
          </div>
        )

      case 'image':
        return (
          <div className={`${baseClasses} ${styleClasses}`}>
            {element.content ? (
              <img src={element.content} alt="صورة" className="w-full h-auto rounded" />
            ) : (
              <div className="bg-gray-100 h-48 flex items-center justify-center rounded">
                <span className="text-gray-400">🖼️ صورة</span>
              </div>
            )}
          </div>
        )

      case 'button':
        return (
          <div className={`${baseClasses} ${styleClasses}`} onDoubleClick={() => handleDoubleClick(element.id)}>
            {isEditing ? (
              <input
                type="text"
                value={element.content}
                onChange={(e) => onElementUpdate(element.id, { content: e.target.value })}
                onBlur={() => setEditingElement(null)}
                className="w-full bg-transparent border-b-2 border-blue-400 outline-none text-center"
                autoFocus
              />
            ) : (
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                {element.content || 'زر'}
              </button>
            )}
          </div>
        )

      case 'list':
        const items = element.content ? element.content.split('\n').filter(item => item.trim()) : []
        return (
          <div className={`${baseClasses} ${styleClasses}`}>
            <ul className="list-disc list-inside space-y-2">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))
              ) : (
                <li className="text-gray-400">قائمة فارغة</li>
              )}
            </ul>
          </div>
        )

      case 'quiz':
        const quizContent = typeof element.content === 'object' && element.content !== null
          ? element.content
          : { title: 'اختبار جديد', questions: [] }

        return (
          <div className={`${baseClasses} ${styleClasses} p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                <span>📝</span>
                <span onDoubleClick={() => handleDoubleClick(element.id)}>
                  {quizContent.title || 'عنوان الاختبار'}
                </span>
              </h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {quizContent.questions?.length || 0} أسئلة
              </span>
            </div>

            <div className="space-y-4">
              {quizContent.questions?.map((question, qIndex) => (
                <div key={question.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <label className="text-xs font-medium text-gray-600">السؤال {qIndex + 1}: {question.text}</label>
                    <button
                      onClick={() => {
                        const newQuestions = quizContent.questions.filter((_, i) => i !== qIndex)
                        onElementUpdate(element.id, { content: { ...quizContent, questions: newQuestions } })
                      }}
                      className="text-red-500 hover:bg-red-50 p-1 rounded text-xs"
                      title="حذف السؤال"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="space-y-1 pr-3">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name={`q-${element.id}-${question.id}`}
                          checked={question.correctAnswer === oIndex}
                          readOnly
                          className="w-3 h-3"
                        />
                        <span className={question.correctAnswer === oIndex ? 'text-green-700 font-medium' : 'text-gray-600'}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {quizContent.questions?.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                لا توجد أسئلة. استخدم لوحة الخصائص لإضافة أسئلة.
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className={`${baseClasses} ${styleClasses}`}>
            <p className="text-gray-500">عنصر غير معروف: {element.type}</p>
          </div>
        )
    }
  }

  const renderDropIndicator = () => {
    if (!dropPosition || !containerRef.current) return null

    const container = containerRef.current
    const elementDivs = container.querySelectorAll('[data-element]')

    let topPosition = 0

    if (dropPosition.index === elements.length) {
      const lastElement = elementDivs[elementDivs.length - 1]
      topPosition = lastElement
        ? lastElement.getBoundingClientRect().bottom - container.getBoundingClientRect().top + 20
        : 20
    } else {
      const targetElement = elementDivs[dropPosition.index]
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        topPosition = dropPosition.position === 'before'
          ? rect.top - containerRect.top - 2
          : rect.bottom - containerRect.top + 2
      }
    }

    return (
      <div
        className="absolute left-0 right-0 h-1 bg-blue-500 z-10 transition-all"
        style={{ top: `${topPosition}px` }}
      >
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b p-4 mb-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">🏗️ منطقة التصميم</h2>
            <p className="text-sm text-gray-500">اسحب وأفلت العناصر هنا أو انقر نقرتين للتعديل</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-gray-100 rounded">
              {elements.length} عناصر
            </span>
            {selectedElement && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                ⭐ محدد
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-gray-50 relative rounded-lg p-4 custom-scrollbar"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragEnd}
        onDragEnd={handleDragEnd}
      >
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <div className="text-gray-400 text-5xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">ابدأ في إنشاء درسك</h3>
              <p className="text-gray-500 mb-6">اسحب العناصر من الشريط الجانبي أو انقر لإضافة عنصر جديد</p>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white/50">
                <div className="text-gray-400 text-3xl mb-3">👇</div>
                <p className="text-gray-600">اسحب وأفلت العناصر هنا</p>
                <p className="text-sm text-gray-400 mt-1">أو استخدم الأزرار في الشريط الجانبي</p>
              </div>
            </div>
          </div>
        )}

        <div className="min-h-full pb-20">
          {elements.map((element, index) => (
            <div
              key={element.id}
              data-element={element.id}
              draggable
              onDragStart={(e) => handleDragStart(e, element.id)}
              className="mb-4 relative group"
            >
              <div className="absolute -top-8 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-white shadow-md rounded-lg p-1 border">
                <button
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                  title="اسحب لإعادة الترتيب"
                >
                  <GripVertical size={14} />
                </button>

                <div className="w-px bg-gray-200 mx-1"></div>

                <button
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-600 disabled:opacity-50"
                  onClick={() => onMove && onMove(element.id, 'up')}
                  title="تحريك للأعلى"
                  disabled={index === 0}
                >
                  <ArrowUp size={14} />
                </button>

                <button
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-600 disabled:opacity-50"
                  onClick={() => onMove && onMove(element.id, 'down')}
                  title="تحريك للأسفل"
                  disabled={index === elements.length - 1}
                >
                  <ArrowDown size={14} />
                </button>

                <div className="w-px bg-gray-200 mx-1"></div>

                <button
                  className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                  onClick={() => onDuplicate && onDuplicate(element.id)}
                  title="نسخ"
                >
                  <Copy size={14} />
                </button>

                <button
                  className="p-1.5 hover:bg-red-50 rounded text-red-600"
                  onClick={() => onDelete && onDelete(element.id)}
                  title="حذف"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div onClick={() => onSelect && onSelect(element.id)}>
                {renderElementContent(element)}
              </div>

              <div className="absolute top-2 right-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white/90 border rounded px-2 py-0.5 shadow-sm">
                  <span className="capitalize">{element.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {renderDropIndicator()}
      </div>

      <div className="bg-white border-t p-3 mt-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-500"></span>
              <span>محدد</span>
            </div>
            <div className="flex items-center gap-1">
              <GripVertical size={14} />
              <span>اسحب لإعادة الترتيب</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              onClick={() => onAdd && onAdd('paragraph')}
            >
              <Plus size={16} />
              <span>إضافة فقرة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}