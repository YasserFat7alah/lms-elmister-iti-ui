'use client'

import { useEffect, useState } from 'react'
import { Printer, Download, Share2, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Interactive Quiz Component
function InteractiveQuiz({ quizData, styleClasses }) {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState({})

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleCheckAnswer = (questionId, correctAnswer) => {
    setShowResults(prev => ({
      ...prev,
      [questionId]: true
    }))
  }

  const isCorrect = (questionId, correctAnswer) => {
    return selectedAnswers[questionId] === correctAnswer
  }

  return (
    <div className={`${styleClasses} p-6 rounded-xl shadow-lg border-2 border-blue-200 mb-6 bg-gradient-to-br from-blue-50 to-white`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
          📝
        </div>
        <div>
          <h3 className="text-2xl font-bold text-blue-900">
            {quizData.title || 'Quiz'}
          </h3>
          <p className="text-sm text-blue-600">
            {quizData.questions?.length || 0} Questions
          </p>
        </div>
      </div>

      {quizData.questions && quizData.questions.length > 0 ? (
        <div className="space-y-6">
          {quizData.questions.map((question, qIndex) => {
            const questionId = question.id || qIndex
            const hasAnswered = showResults[questionId]
            const userAnswer = selectedAnswers[questionId]
            const correct = isCorrect(questionId, question.correctAnswer)

            return (
              <div key={questionId} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {qIndex + 1}
                  </div>
                  <div className="font-semibold text-gray-900 text-lg flex-1">
                    {question.text}
                  </div>
                  {hasAnswered && (
                    <div className={`flex items-center gap-1 text-sm font-bold ${correct ? 'text-green-600' : 'text-red-600'}`}>
                      {correct ? (
                        <>
                          <CheckCircle size={20} />
                          <span>Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={20} />
                          <span>Wrong</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-3 pr-11">
                  {question.options && question.options.map((option, oIndex) => {
                    const isSelected = userAnswer === oIndex
                    const isCorrectAnswer = question.correctAnswer === oIndex
                    const showAsCorrect = hasAnswered && isCorrectAnswer
                    const showAsWrong = hasAnswered && isSelected && !isCorrectAnswer

                    return (
                      <button
                        key={oIndex}
                        onClick={() => !hasAnswered && handleAnswerSelect(questionId, oIndex)}
                        disabled={hasAnswered}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-right ${showAsCorrect
                          ? 'bg-green-100 border-2 border-green-500 shadow-sm'
                          : showAsWrong
                            ? 'bg-red-100 border-2 border-red-500'
                            : isSelected
                              ? 'bg-blue-100 border-2 border-blue-500'
                              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        } ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 ${showAsCorrect
                          ? 'border-green-600 bg-green-600 text-white'
                          : showAsWrong
                            ? 'border-red-600 bg-red-600 text-white'
                            : isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-300 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </div>
                        <span className={`flex-1 ${showAsCorrect
                          ? 'font-semibold text-green-900'
                          : showAsWrong
                            ? 'font-semibold text-red-900'
                            : isSelected
                              ? 'font-semibold text-blue-900'
                              : 'text-gray-700'
                        }`}>
                          {option}
                        </span>
                        {showAsCorrect && (
                          <CheckCircle size={20} className="text-green-700 flex-shrink-0" />
                        )}
                        {showAsWrong && (
                          <XCircle size={20} className="text-red-700 flex-shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {!hasAnswered && userAnswer !== undefined && (
                  <div className="mt-4 pr-11">
                    <button
                      onClick={() => handleCheckAnswer(questionId, question.correctAnswer)}
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                    >
                      Check Answer
                    </button>
                  </div>
                )}

                {hasAnswered && !correct && (
                  <div className="mt-4 pr-11 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <span className="font-bold">💡 Correct Answer:</span> {String.fromCharCode(65 + question.correctAnswer)} - {question.options[question.correctAnswer]}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-gray-500">No questions in this quiz</p>
        </div>
      )}
    </div>
  )
}

export default function PreviewPage() {
  const [template, setTemplate] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem('lesson_template') ||
      localStorage.getItem('preview_template')
    if (saved) {
      try {
        setTemplate(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading template:', error)
      }
    }
    setLoading(false)
  }, [])

  const renderElement = (element) => {
    const baseClasses = "w-full"
    const styleClasses = Object.entries(element.styles || {}).map(([key, value]) => {
      if (key === 'color' && value.startsWith('text-')) {
        return value
      } else if (key === 'backgroundColor' && value.startsWith('bg-')) {
        return value
      } else if (key === 'fontSize' && ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].includes(value)) {
        return `text-${value}`
      } else if (key === 'fontWeight' && ['normal', 'medium', 'semibold', 'bold', 'extrabold'].includes(value)) {
        return `font-${value}`
      } else if (key === 'align' && ['right', 'center', 'left', 'justify'].includes(value)) {
        return `text-${value}`
      } else if (key === 'marginTop' && typeof value === 'number') {
        return `mt-${value}`
      } else if (key === 'marginBottom' && typeof value === 'number') {
        return `mb-${value}`
      } else if (key === 'borderRadius' && ['sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(value)) {
        return `rounded-${value}`
      }
      return ''
    }).filter(Boolean).join(' ')

    switch (element.type) {
      case 'title':
        return (
          <h1 className={`${baseClasses} ${styleClasses} text-3xl font-bold mb-4`}>
            {typeof element.content === 'string' ? element.content : 'Title'}
          </h1>
        )

      case 'subtitle':
        return (
          <h2 className={`${baseClasses} ${styleClasses} text-2xl font-semibold mb-3`}>
            {typeof element.content === 'string' ? element.content : 'Subtitle'}
          </h2>
        )

      case 'paragraph':
        return (
          <p className={`${baseClasses} ${styleClasses} mb-4 leading-relaxed`}>
            {typeof element.content === 'string' ? element.content : 'Paragraph'}
          </p>
        )

      case 'image':
        return (
          <div className={`${baseClasses} ${styleClasses} my-4`}>
            {typeof element.content === 'string' && element.content ? (
              <img
                src={element.content}
                alt=""
                className="w-full rounded-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">🖼️ Image</span>
              </div>
            )}
          </div>
        )

      case 'button':
        return (
          <button
            className={`${baseClasses} ${styleClasses} my-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700`}
          >
            {typeof element.content === 'string' ? element.content : 'Button'}
          </button>
        )

      case 'list':
        const listContent = typeof element.content === 'string' ? element.content : ''
        return (
          <ul className={`${baseClasses} ${styleClasses} list-disc pr-6 space-y-2 mb-4`}>
            {listContent.split('\n').filter(Boolean).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )

      case 'quiz':
        const quizData = typeof element.content === 'object' && element.content !== null
          ? element.content
          : { title: 'Quiz', questions: [] }

        return <InteractiveQuiz quizData={quizData} styleClasses={`${baseClasses} ${styleClasses}`} />

      case 'card':
        return (
          <div className={`${baseClasses} ${styleClasses} p-6 rounded-xl shadow-sm border mb-4`}>
            <div>{typeof element.content === 'string' ? element.content : 'Card'}</div>
          </div>
        )

      default:
        return (
          <div className={`${baseClasses} ${styleClasses} mb-4`}>
            {typeof element.content === 'string' ? element.content : 'Content'}
          </div>
        )
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExportPDF = () => {
    alert('PDF export will be done - this feature requires additional setup')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-xl font-semibold mb-2">No Template Found</h2>
          <p className="text-gray-600 mb-6">Go back to the editor and create a lesson first</p>
          <button
            onClick={() => router.push('/lesson-builder/editor')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Editor
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/lesson-builder/editor')}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeft size={18} />
            Back to Editor
          </button>

          <div>
            <h2 className="text-xl font-semibold">{template.name}</h2>
            <p className="text-gray-500 text-sm">Preview</p>
          </div>
        </div>

        {/* <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Download size={18} />
            Export PDF
          </button>

          <button
            onClick={() => alert('Link will be shared')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Share2 size={18} />
            Share
          </button>
        </div> */}
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 my-8">
          <div className="prose prose-lg max-w-none">
            {template.elements.map((element, index) => (
              <div key={element.id || index} className="mb-6">
                {renderElement(element)}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{template.elements.length}</div>
              <div className="text-sm text-gray-600">Elements Count</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{template.version}</div>
              <div className="text-sm text-gray-600">Version</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Last Update</div>
              <div className="text-sm font-medium">
                {new Date(template.updatedAt || template.createdAt).toLocaleDateString('en-US')}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Status</div>
              <div className="text-sm font-medium text-green-600">Ready</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
