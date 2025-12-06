'use client'
import { useState, useEffect, useCallback } from 'react'
import { 
  createDefaultTemplate, 
  validateTemplate, 
  createHistoryManager 
} from '@/lib/templateUtils'

export default function useTemplate(initialTemplate = null) {
  const [template, setTemplate] = useState(initialTemplate || createDefaultTemplate())
  const [history] = useState(() => createHistoryManager())
  const [errors, setErrors] = useState([])
  const [isDirty, setIsDirty] = useState(false)

  // Initialize history
  useEffect(() => {
    history.add(template)
  }, [])

  // Update template
  const updateTemplate = useCallback((updates) => {
    setTemplate(prev => {
      const newTemplate = typeof updates === 'function' 
        ? updates(prev) 
        : { ...prev, ...updates, updatedAt: new Date().toISOString() }
      
      history.add(newTemplate)
      setIsDirty(true)
      return newTemplate
    })
  }, [history])

  // Update specific element
  const updateElement = useCallback((elementId, updates) => {
    updateTemplate(prev => ({
      ...prev,
      elements: prev.elements.map(element => 
        element.id === elementId 
          ? { ...element, ...updates }
          : element
      )
    }))
  }, [updateTemplate])

  // Add new element
  const addElement = useCallback((type, content = '', customStyles = {}) => {
    const newElement = createElement(type, content, customStyles)
    
    updateTemplate(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }))
    
    return newElement.id
  }, [updateTemplate])

  // Delete element
  const deleteElement = useCallback((elementId) => {
    updateTemplate(prev => ({
      ...prev,
      elements: prev.elements.filter(element => element.id !== elementId)
    }))
  }, [updateTemplate])

  // Duplicate element
  const duplicateElement = useCallback((elementId) => {
    updateTemplate(prev => {
      const element = prev.elements.find(el => el.id === elementId)
      if (!element) return prev

      const newElement = {
        ...element,
        id: `elem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content: element.content + ' (نسخة)'
      }

      const index = prev.elements.findIndex(el => el.id === elementId)
      const newElements = [
        ...prev.elements.slice(0, index + 1),
        newElement,
        ...prev.elements.slice(index + 1)
      ]

      return { ...prev, elements: newElements }
    })
  }, [updateTemplate])

  // Move element
  const moveElement = useCallback((elementId, direction) => {
    updateTemplate(prev => {
      const index = prev.elements.findIndex(el => el.id === elementId)
      if (index === -1) return prev

      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= prev.elements.length) return prev

      const newElements = [...prev.elements]
      ;[newElements[index], newElements[newIndex]] = [newElements[newIndex], newElements[index]]

      return { ...prev, elements: newElements }
    })
  }, [updateTemplate])

  // Undo/Redo
  const undo = useCallback(() => {
    const prevState = history.undo()
    if (prevState) {
      setTemplate(prevState)
      setIsDirty(true)
    }
  }, [history])

  const redo = useCallback(() => {
    const nextState = history.redo()
    if (nextState) {
      setTemplate(nextState)
      setIsDirty(true)
    }
  }, [history])

  // Save template
  const saveTemplate = useCallback(async () => {
    const validationErrors = validateTemplate(template)
    setErrors(validationErrors)

    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '))
    }

    try {
      // هنا يمكن إضافة حفظ في قاعدة البيانات
      localStorage.setItem('saved_template', JSON.stringify(template))
      setIsDirty(false)
      return { success: true, template }
    } catch (error) {
      throw error
    }
  }, [template])

  // Load template
  const loadTemplate = useCallback((newTemplate) => {
    const validationErrors = validateTemplate(newTemplate)
    setErrors(validationErrors)

    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '))
    }

    setTemplate(newTemplate)
    history.clear()
    history.add(newTemplate)
    setIsDirty(false)
  }, [history])

  // Reset template
  const resetTemplate = useCallback(() => {
    setTemplate(createDefaultTemplate())
    history.clear()
    history.add(template)
    setIsDirty(false)
  }, [history, template])

  // Export template
  const exportTemplate = useCallback((format = 'json') => {
    return exportTemplate(template, format)
  }, [template])

  return {
    template,
    errors,
    isDirty,
    canUndo: history.canUndo(),
    canRedo: history.canRedo(),
    updateTemplate,
    updateElement,
    addElement,
    deleteElement,
    duplicateElement,
    moveElement,
    undo,
    redo,
    saveTemplate,
    loadTemplate,
    resetTemplate,
    exportTemplate
  }
}