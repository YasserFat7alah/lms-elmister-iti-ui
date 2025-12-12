'use client'

import { useState, useEffect } from 'react'
import {
  Palette,
  Type,
  Ruler,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  Eye
} from 'lucide-react'

const COLORS = [
  { name: 'Blue', value: 'text-blue-600', bg: '#2563eb' },
  { name: 'Red', value: 'text-red-600', bg: '#dc2626' },
  { name: 'Green', value: 'text-green-600', bg: '#16a34a' },
  { name: 'Yellow', value: 'text-yellow-600', bg: '#ca8a04' },
  { name: 'Purple', value: 'text-purple-600', bg: '#9333ea' },
  { name: 'Pink', value: 'text-pink-600', bg: '#db2777' },
  { name: 'Gray', value: 'text-gray-600', bg: '#4b5563' },
  { name: 'Black', value: 'text-gray-900', bg: '#111827' }
]

const BACKGROUND_COLORS = [
  { name: 'White', value: 'bg-white' },
  { name: 'Light Gray', value: 'bg-gray-50' },
  { name: 'Light Blue', value: 'bg-blue-50' },
  { name: 'Light Green', value: 'bg-green-50' },
  { name: 'Light Yellow', value: 'bg-yellow-50' },
  { name: 'Light Pink', value: 'bg-pink-50' },
  { name: 'Transparent', value: 'bg-transparent' }
]

export default function PropertiesPanel({ element, onUpdate }) {
  const [localStyles, setLocalStyles] = useState(element?.styles || {})
  const [localContent, setLocalContent] = useState(element?.content || '')

  useEffect(() => {
    setLocalStyles(element?.styles || {})
    setLocalContent(element?.content || '')
  }, [element])

  if (!element) {
    return (
      <div className="w-80 bg-white border-l p-6 flex flex-col items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">🎯</div>
          <p className="mb-2 font-medium">👈 Select an element</p>
          <p className="text-sm">Its properties will appear here</p>
        </div>
      </div>
    )
  }

  const handleStyleChange = (key, value) => {
    const newStyles = { ...localStyles, [key]: value }
    setLocalStyles(newStyles)
    onUpdate({ styles: newStyles })
  }

  const handleContentChange = (value) => {
    setLocalContent(value)
    onUpdate({ content: value })
  }

  const renderContentControl = () => {
    const contentType = typeof localContent

    if (element.type === 'quiz') {
      const quizData = contentType === 'object' && localContent !== null && localContent.title !== undefined
        ? localContent
        : { title: '', questions: [] }

      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Quiz Title</label>
            <input
              type="text"
              value={quizData.title || ''}
              onChange={(e) => handleContentChange({ ...quizData, title: e.target.value })}
              className="w-full p-2 border rounded text-sm"
              placeholder="Quiz title"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium">Questions</label>
            {(quizData.questions || []).map((question, qIndex) => (
              <div key={question.id} className="border p-3 rounded bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-gray-500">Question {qIndex + 1}</span>
                  <button
                    onClick={() => {
                      const newQuestions = quizData.questions.filter((_, i) => i !== qIndex)
                      handleContentChange({ ...quizData, questions: newQuestions })
                    }}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Delete
                  </button>
                </div>

                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => {
                    const newQuestions = [...quizData.questions]
                    newQuestions[qIndex].text = e.target.value
                    handleContentChange({ ...quizData, questions: newQuestions })
                  }}
                  className="w-full p-2 border rounded text-sm mb-2 bg-white"
                  placeholder="Question text"
                />

                <div className="space-y-2 pl-2 border-l-2 border-gray-200">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`prop-q-${element.id}-${question.id}`}
                        checked={question.correctAnswer === oIndex}
                        onChange={() => {
                          const newQuestions = [...quizData.questions]
                          newQuestions[qIndex].correctAnswer = oIndex
                          handleContentChange({ ...quizData, questions: newQuestions })
                        }}
                        className="cursor-pointer"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newQuestions = [...quizData.questions]
                          newQuestions[qIndex].options[oIndex] = e.target.value
                          handleContentChange({ ...quizData, questions: newQuestions })
                        }}
                        className="flex-1 p-1 border rounded text-xs"
                        placeholder={`Option ${oIndex + 1}`}
                      />
                      {question.options.length > 2 && (
                        <button
                          onClick={() => {
                            const newQuestions = [...quizData.questions]
                            newQuestions[qIndex].options = question.options.filter((_, i) => i !== oIndex)
                            if (question.correctAnswer === oIndex) newQuestions[qIndex].correctAnswer = 0
                            else if (question.correctAnswer > oIndex) newQuestions[qIndex].correctAnswer--
                            handleContentChange({ ...quizData, questions: newQuestions })
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newQuestions = [...quizData.questions]
                      newQuestions[qIndex].options.push('New option')
                      handleContentChange({ ...quizData, questions: newQuestions })
                    }}
                    className="text-xs text-blue-600 hover:underline mt-1"
                  >
                    + Add option
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                const newQuestions = [
                  ...(quizData.questions || []),
                  {
                    id: Date.now(),
                    text: 'New question',
                    options: ['Option 1', 'Option 2'],
                    correctAnswer: 0
                  }
                ]
                handleContentChange({ ...quizData, questions: newQuestions })
              }}
              className="w-full py-2 border border-dashed border-blue-300 text-blue-600 rounded text-sm hover:bg-blue-50"
            >
              + Add new question
            </button>
          </div>
        </div>
      )
    }

    // For other element types
    if (['title', 'subtitle', 'paragraph', 'button'].includes(element.type)) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Text</label>
          <textarea
            value={contentType === 'string' ? localContent : ''}
            onChange={(e) => handleContentChange(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded text-sm"
            placeholder="Write text here..."
          />
        </div>
      )
    }

    if (element.type === 'image') {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="url"
            value={contentType === 'string' ? localContent : ''}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full p-2 border rounded text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      )
    }

    if (element.type === 'list') {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">List items</label>
          <textarea
            value={contentType === 'string' ? localContent : ''}
            onChange={(e) => handleContentChange(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded text-sm"
            placeholder="Write each item on a new line..."
          />
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">Content</label>
        <textarea
          value={contentType === 'string' ? localContent : ''}
          onChange={(e) => handleContentChange(e.target.value)}
          rows={2}
          className="w-full p-2 border rounded text-sm"
          placeholder="Write content here..."
        />
      </div>
    )
  }

  const renderStyleControls = () => {
    const controls = []

    if (['title', 'subtitle', 'paragraph', 'list', 'quote'].includes(element.type)) {
      controls.push(
        <div key="text-styles" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Font Size</label>
            <div className="grid grid-cols-4 gap-1">
              {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleStyleChange('fontSize', size)}
                  className={`p-1.5 text-xs rounded ${localStyles.fontSize === size
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <div className="grid grid-cols-4 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleStyleChange('color', color.value)}
                  className={`w-8 h-8 rounded-full border-2 ${localStyles.color === color.value ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  style={{ backgroundColor: color.bg }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Alignment</label>
            <div className="flex gap-2">
              <button
                onClick={() => handleStyleChange('align', 'right')}
                className={`p-2 rounded ${localStyles.align === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <AlignRight size={16} />
              </button>
              <button
                onClick={() => handleStyleChange('align', 'center')}
                className={`p-2 rounded ${localStyles.align === 'center' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <AlignCenter size={16} />
              </button>
              <button
                onClick={() => handleStyleChange('align', 'left')}
                className={`p-2 rounded ${localStyles.align === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <AlignLeft size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Formatting</label>
            <div className="flex gap-2">
              <button
                onClick={() => handleStyleChange('fontWeight', localStyles.fontWeight === 'bold' ? 'normal' : 'bold')}
                className={`p-2 rounded ${localStyles.fontWeight === 'bold' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => handleStyleChange('fontStyle', localStyles.fontStyle === 'italic' ? 'normal' : 'italic')}
                className={`p-2 rounded ${localStyles.fontStyle === 'italic' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => handleStyleChange('textDecoration', localStyles.textDecoration === 'underline' ? 'none' : 'underline')}
                className={`p-2 rounded ${localStyles.textDecoration === 'underline' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Underline size={16} />
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (['button', 'card', 'section', 'quiz'].includes(element.type)) {
      controls.push(
        <div key="background" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <div className="grid grid-cols-4 gap-2">
              {BACKGROUND_COLORS.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => handleStyleChange('backgroundColor', bg.value)}
                  className={`w-8 h-8 rounded border ${localStyles.backgroundColor === bg.value
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-300'
                    } ${bg.value}`}
                  title={bg.name}
                />
              ))}
            </div>
          </div>
{/* 
          <div>
            <label className="block text-sm font-medium mb-2">Corners</label>
            <div className="flex gap-2">
              {['none', 'sm', 'md', 'lg', 'xl', 'full'].map((radius) => (
                <button
                  key={radius}
                  onClick={() => handleStyleChange('borderRadius', radius)}
                  className={`p-1.5 text-xs rounded ${localStyles.borderRadius === radius
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {radius === 'none' ? '✕' : radius === 'sm' ? '◡' : radius === 'md' ? '◠' : radius === 'lg' ? '◠◡' : radius === 'xl' ? '◠◡◠' : '●'}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      )
    }

    controls.push(
      <div key="spacing" className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Margins</label>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Top</span>
                <span>{localStyles.marginTop || 0}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={localStyles.marginTop || 0}
                onChange={(e) => handleStyleChange('marginTop', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Bottom</span>
                <span>{localStyles.marginBottom || 0}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={localStyles.marginBottom || 0}
                onChange={(e) => handleStyleChange('marginBottom', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    )

    return controls
  }

  const getPreviewText = () => {
    if (typeof localContent === 'string') {
      return localContent.slice(0, 50) || 'Preview will appear here...'
    }
    if (element.type === 'quiz' && localContent && typeof localContent === 'object') {
      return `Quiz: ${localContent.title || 'Untitled'} (${localContent.questions?.length || 0} questions)`
    }
    return 'Complex content preview not available'
  }

  return (
    <div className="w-80 bg-white border-l overflow-y-auto">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Element Properties</h3>
            <p className="text-sm text-gray-500 capitalize">{element.type}</p>
          </div>
          <div className="text-xs bg-gray-100 px-2 py-1 rounded">
            ID: {element.id.slice(0, 8)}...
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Content</h4>
            <span className="text-xs text-gray-500">
              {typeof localContent === 'string' ? `${localContent.length} characters` : 'Complex'}
            </span>
          </div>
          {renderContentControl()}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm">Formatting & Appearance</h4>
          {renderStyleControls()}
        </div>

        {/* <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={16} className="text-gray-500" />
            <h4 className="font-medium text-sm">Quick Preview</h4>
          </div>
          <div className="bg-gray-50 border rounded p-3 text-sm">
            <div className={`${localStyles.color || 'text-gray-700'} ${localStyles.fontSize ? `text-${localStyles.fontSize}` : ''}`}>
              {getPreviewText()}
              {typeof localContent === 'string' && localContent.length > 50 ? '...' : ''}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Applied styles: {Object.keys(localStyles).length}
            </div>
          </div>
        </div> */}

      </div>
    </div>
  )
}