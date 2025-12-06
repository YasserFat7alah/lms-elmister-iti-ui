'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

export default function useDragDrop() {
  const [draggedItem, setDraggedItem] = useState(null)
  const [dropTarget, setDropTarget] = useState(null)
  const [dragType, setDragType] = useState(null) // 'element' | 'template' | 'component'
  const dragImageRef = useRef(null)

  // إنشاء صورة السحب
  const createDragImage = useCallback((content, type) => {
    const dragImage = document.createElement('div')
    dragImage.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      background: white;
      border: 2px dashed #3b82f6;
      border-radius: 8px;
      padding: 12px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-width: 200px;
      font-family: system-ui;
      font-size: 14px;
    `
    
    const icon = getDragIcon(type)
    dragImage.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="font-size: 20px;">${icon}</div>
        <div>
          <div style="font-weight: bold; margin-bottom: 4px;">${content}</div>
          <div style="font-size: 12px; color: #666;">اسحب للإفلات</div>
        </div>
      </div>
    `
    
    document.body.appendChild(dragImage)
    return dragImage
  }, [])

  const getDragIcon = (type) => {
    const icons = {
      title: '📝',
      paragraph: '📄',
      image: '🖼️',
      video: '🎥',
      button: '🔘',
      list: '📋',
      card: '🃏',
      columns: '📊',
      grid: '🔲',
      template: '📁',
      component: '🧩',
      section: '📦'
    }
    return icons[type] || '📌'
  }

  // بدء السحب
  const startDrag = useCallback((event, data, type = 'element') => {
    event.dataTransfer.setData('application/json', JSON.stringify(data))
    event.dataTransfer.setData('type', type)
    event.dataTransfer.effectAllowed = 'move'
    
    const dragContent = type === 'element' 
      ? `عنصر ${data.type}`
      : type === 'template'
      ? `قالب: ${data.name}`
      : `مكون: ${data.name}`

    const dragImage = createDragImage(dragContent, type)
    event.dataTransfer.setDragImage(dragImage, 20, 20)
    
    setDraggedItem(data)
    setDragType(type)
    
    // تنظيف صورة السحب بعد الانتهاء
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage)
      }
    }, 100)
  }, [createDragImage])

  // التعامل مع السحب فوق العنصر
  const handleDragOver = useCallback((event, targetData) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    
    if (targetData) {
      setDropTarget(targetData)
      
      // إضافة تأثيرات بصرية
      const element = event.currentTarget
      element.classList.add('drag-over')
      
      // إزالة التأثير بعد وقت
      setTimeout(() => {
        element.classList.remove('drag-over')
      }, 150)
    }
  }, [])

  // التعامل مع الإفلات
  const handleDrop = useCallback((event, callback) => {
    event.preventDefault()
    
    try {
      const type = event.dataTransfer.getData('type')
      const data = JSON.parse(event.dataTransfer.getData('application/json'))
      
      if (callback) {
        callback(data, type, dropTarget)
      }
      
      // إرسال حدث مخصص
      const dropEvent = new CustomEvent('elementDropped', {
        detail: { data, type, dropTarget }
      })
      window.dispatchEvent(dropEvent)
      
    } catch (error) {
      console.error('Error handling drop:', error)
    } finally {
      setDraggedItem(null)
      setDropTarget(null)
      setDragType(null)
      
      // تنظيف الفئات
      document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over')
      })
    }
  }, [dropTarget])

  // إنهاء السحب
  const handleDragEnd = useCallback(() => {
    setDraggedItem(null)
    setDropTarget(null)
    setDragType(null)
    
    // تنظيف صورة السحب إذا كانت موجودة
    const dragImages = document.querySelectorAll('[data-drag-image]')
    dragImages.forEach(img => img.remove())
  }, [])

  // إمكانية السحب
  const makeDraggable = useCallback((element, data, type = 'element') => {
    if (!element) return
    
    element.setAttribute('draggable', 'true')
    element.setAttribute('data-draggable', 'true')
    element.setAttribute('data-drag-type', type)
    
    element.ondragstart = (e) => startDrag(e, data, type)
    element.ondragend = handleDragEnd
    
    return () => {
      element.removeAttribute('draggable')
      element.removeAttribute('data-draggable')
      element.removeAttribute('data-drag-type')
      element.ondragstart = null
      element.ondragend = null
    }
  }, [startDrag, handleDragEnd])

  // إمكانية الإفلات
  const makeDroppable = useCallback((element, targetData, onDropCallback) => {
    if (!element) return
    
    element.setAttribute('data-droppable', 'true')
    element.setAttribute('data-drop-target', JSON.stringify(targetData))
    
    element.ondragover = (e) => handleDragOver(e, targetData)
    element.ondrop = (e) => handleDrop(e, onDropCallback)
    element.ondragleave = () => {
      element.classList.remove('drag-over')
    }
    
    return () => {
      element.removeAttribute('data-droppable')
      element.removeAttribute('data-drop-target')
      element.ondragover = null
      element.ondrop = null
      element.ondragleave = null
    }
  }, [handleDragOver, handleDrop])

  // تحديد مناطق الإفلات
  const calculateDropPosition = useCallback((event, elements) => {
    const container = event.currentTarget
    const rect = container.getBoundingClientRect()
    const y = event.clientY - rect.top
    
    if (!elements || elements.length === 0) {
      return { position: 'append', index: 0 }
    }
    
    let closestIndex = 0
    let closestDistance = Infinity
    let closestPosition = 'before'
    
    const elementRects = Array.from(container.querySelectorAll('[data-element-id]'))
      .map(el => {
        const elRect = el.getBoundingClientRect()
        return {
          element: el,
          top: elRect.top - rect.top,
          bottom: elRect.bottom - rect.top,
          height: elRect.height
        }
      })
    
    elementRects.forEach((elRect, index) => {
      // المسافة لبداية العنصر
      const distanceToTop = Math.abs(y - elRect.top)
      if (distanceToTop < closestDistance) {
        closestDistance = distanceToTop
        closestIndex = index
        closestPosition = 'before'
      }
      
      // المسافة لنهاية العنصر
      const distanceToBottom = Math.abs(y - elRect.bottom)
      if (distanceToBottom < closestDistance) {
        closestDistance = distanceToBottom
        closestIndex = index
        closestPosition = 'after'
      }
    })
    
    // التحقق إذا كان السحب في الربع الأخير من العنصر الأخير
    const lastElement = elementRects[elementRects.length - 1]
    if (lastElement && y > lastElement.bottom - (lastElement.height * 0.25)) {
      return { position: 'append', index: elements.length }
    }
    
    return { position: closestPosition, index: closestIndex }
  }, [])

  // تأثيرات السحب والإفلات
  const getDragEffects = useCallback(() => {
    return {
      draggedItem,
      dragType,
      dropTarget,
      isDragging: !!draggedItem,
      isOverTarget: !!dropTarget
    }
  }, [draggedItem, dragType, dropTarget])

  // CSS classes للعناصر القابلة للسحب
  const getDragClasses = useCallback((isDraggable = true, isDroppable = false) => {
    const classes = []
    
    if (isDraggable) {
      classes.push('cursor-move', 'select-none')
    }
    
    if (isDroppable) {
      classes.push('transition-all', 'duration-200')
    }
    
    return classes.join(' ')
  }, [])

  // تهيئة الإجراءات العامة
  useEffect(() => {
    const handleGlobalDragOver = (e) => {
      e.preventDefault()
    }
    
    const handleGlobalDrop = (e) => {
      e.preventDefault()
      handleDragEnd()
    }
    
    document.addEventListener('dragover', handleGlobalDragOver)
    document.addEventListener('drop', handleGlobalDrop)
    
    return () => {
      document.removeEventListener('dragover', handleGlobalDragOver)
      document.removeEventListener('drop', handleGlobalDrop)
    }
  }, [handleDragEnd])

  return {
    // الحالة
    draggedItem,
    dropTarget,
    dragType,
    isDragging: !!draggedItem,
    
    // الدوال الأساسية
    startDrag,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    
    // الدوال المساعدة
    makeDraggable,
    makeDroppable,
    calculateDropPosition,
    getDragEffects,
    getDragClasses,
    
    // التأثيرات
    createDragImage,
    getDragIcon
  }
}