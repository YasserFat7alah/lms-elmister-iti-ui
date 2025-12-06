'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import EditorToolbar from '@/components/lesson/EditorToolbar'
import ElementsPanel from '@/components/lesson/ElementsPanel'
import PropertiesPanel from '@/components/lesson/PropertiesPanel'
import { saveTemplate, loadTemplate, exportTemplate } from '@/lib/templateUtils'

// Lazy load لتحسين الأداء
const CanvasArea = dynamic(() => import('@/components/lesson/CanvasArea'), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 animate-pulse rounded-lg" />
})

export default function EditorPage() {
  const [elements, setElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // تحميل القالب المحفوظ عند بدء التشغيل
  useEffect(() => {
    const saved = loadTemplate()
    if (saved && saved.elements) {
      setElements(saved.elements)
      saveToHistory(saved.elements)
    }
  }, [])

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

  const handleSave = async () => {
    try {
      const template = {
        name: `درس ${new Date().toLocaleDateString('ar-SA')}`,
        elements,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1
      }

      const result = await saveTemplate(template)
      if (result.success) {
        alert('✅ تم الحفظ بنجاح!')
      }
    } catch (error) {
      alert(`❌ حدث خطأ أثناء الحفظ: ${error.message}`)
    }
  }

  const handleExport = async (format = 'json') => {
    try {
      const template = {
        name: `درس_${new Date().toISOString().split('T')[0]}`,
        elements,
        createdAt: new Date().toISOString(),
        version: 1
      }

      const exported = exportTemplate(template, format)

      if (format === 'json') {
        const blob = new Blob([exported], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `lesson_${Date.now()}.${format}`
        a.click()
        URL.revokeObjectURL(url)
      } else if (format === 'html') {
        const blob = new Blob([exported], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `lesson_${Date.now()}.html`
        a.click()
        URL.revokeObjectURL(url)
      } else if (format === 'markdown') {
        const blob = new Blob([exported], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `lesson_${Date.now()}.md`
        a.click()
        URL.revokeObjectURL(url)
      }

      alert(`✅ تم التصدير بصيغة ${format.toUpperCase()} بنجاح!`)
    } catch (error) {
      alert(`❌ حدث خطأ أثناء التصدير: ${error.message}`)
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
      name: `معاينة_${Date.now()}`,
      elements,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('preview_template', JSON.stringify(template))

    const previewWindow = window.open('/lesson-builder/preview', '_blank')
    if (previewWindow) {
      previewWindow.focus()
    }
  }

  const getDefaultContent = (type) => {
    const contents = {
      title: 'عنوان جديد',
      paragraph: 'اكتب محتوى الفقرة هنا...',
      subtitle: 'عنوان فرعي',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      button: 'انقر هنا',
      list: 'عنصر القائمة الأول\nعنصر القائمة الثاني\nعنصر القائمة الثالث',
      quote: '"الاقتباس هو كلمات الآخرين التي نجد فيها أنفسنا."',
      card: 'محتوى البطاقة',
      section: 'قسم المحتوى',
      columns: '',
      grid: '',
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
        : element.type === 'image'
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

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toolbar */}
      <EditorToolbar
        onSave={handleSave}
        onPreview={handlePreview}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onExport={handleExport}
        onImport={handleImport}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - العناصر */}
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

        {/* Right Panel - الخصائص */}
        <PropertiesPanel
          element={elements.find(el => el.id === selectedElement)}
          onUpdate={(updates) => handleElementUpdate(selectedElement, updates)}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t px-4 py-2 text-sm text-gray-500 flex justify-between">
        <div className="flex items-center gap-4">
          <span>عدد العناصر: {elements.length}</span>
          <span>الحالة: {selectedElement ? 'محدد' : 'جاهز'}</span>
          <span>الإصدار: {historyIndex + 1}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="import-file"
            accept=".json,.html,.md"
            onChange={handleImport}
            className="hidden"
          />
          <label
            htmlFor="import-file"
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer text-sm"
          >
            استيراد
          </label>
          <button
            onClick={() => handleExport('json')}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
          >
            تصدير JSON
          </button>
        </div>
      </div>
    </div>
  )
}