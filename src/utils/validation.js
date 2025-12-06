import { ELEMENT_TYPES, ERROR_CODES } from '@/lib/constants'

/**
 * التحقق من صحة القالب
 */
export const validateTemplate = (template) => {
  const errors = []

  if (!template || typeof template !== 'object') {
    errors.push({ code: ERROR_CODES.INVALID_TEMPLATE, message: 'القالب غير صالح' })
    return errors
  }

  // التحقق من الحقول المطلوبة
  const requiredFields = ['name', 'elements']
  requiredFields.forEach(field => {
    if (!template[field]) {
      errors.push({ 
        code: ERROR_CODES.VALIDATION_FAILED, 
        message: `الحقل ${field} مطلوب` 
      })
    }
  })

  // التحقق من صحة العناصر
  if (template.elements && Array.isArray(template.elements)) {
    template.elements.forEach((element, index) => {
      const elementErrors = validateElement(element, index)
      errors.push(...elementErrors)
    })
  } else {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'يجب أن تكون العناصر مصفوفة' 
    })
  }

  // التحقق من صحة الإعدادات
  if (template.settings) {
    const settingsErrors = validateSettings(template.settings)
    errors.push(...settingsErrors)
  }

  return errors
}

/**
 * التحقق من صحة العنصر
 */
export const validateElement = (element, index = 0) => {
  const errors = []

  if (!element || typeof element !== 'object') {
    errors.push({ 
      code: ERROR_CODES.INVALID_TEMPLATE, 
      message: `العنصر ${index + 1} غير صالح` 
    })
    return errors
  }

  // التحقق من الحقول المطلوبة
  const requiredFields = ['id', 'type']
  requiredFields.forEach(field => {
    if (!element[field]) {
      errors.push({ 
        code: ERROR_CODES.VALIDATION_FAILED, 
        message: `العنصر ${index + 1}: الحقل ${field} مطلوب` 
      })
    }
  })

  // التحقق من صحة النوع
  if (element.type && !Object.values(ELEMENT_TYPES).find(t => t.id === element.type)) {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: `العنصر ${index + 1}: النوع غير معروف: ${element.type}` 
    })
  }

  // التحقق من صحة المعرف
  if (element.id && typeof element.id !== 'string') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: `العنصر ${index + 1}: المعرف يجب أن يكون نصًا` 
    })
  }

  // التحقق من صحة المحتوى
  if (element.content !== undefined && typeof element.content !== 'string') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: `العنصر ${index + 1}: المحتوى يجب أن يكون نصًا` 
    })
  }

  // التحقق من صحة الأنماط
  if (element.styles) {
    const stylesErrors = validateStyles(element.styles, index)
    errors.push(...stylesErrors)
  }

  // التحقق من صحة البيانات الوصفية
  if (element.metadata) {
    const metadataErrors = validateMetadata(element.metadata, index)
    errors.push(...metadataErrors)
  }

  return errors
}

/**
 * التحقق من صحة الأنماط
 */
export const validateStyles = (styles, elementIndex = 0) => {
  const errors = []

  if (!styles || typeof styles !== 'object') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: `العنصر ${elementIndex + 1}: الأنماط يجب أن تكون كائنًا` 
    })
    return errors
  }

  // قائمة بالخصائص المسموح بها
  const allowedProperties = [
    'fontSize', 'fontWeight', 'textAlign', 'color', 'backgroundColor',
    'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
    'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
    'borderRadius', 'borderWidth', 'borderColor', 'boxShadow',
    'width', 'height', 'maxWidth', 'minWidth', 'maxHeight', 'minHeight',
    'display', 'flexDirection', 'justifyContent', 'alignItems',
    'lineHeight', 'letterSpacing', 'textTransform',
    'opacity', 'gap', 'custom'
  ]

  // التحقق من الخصائص غير المعروفة
  Object.keys(styles).forEach(property => {
    if (!allowedProperties.includes(property)) {
      errors.push({ 
        code: ERROR_CODES.VALIDATION_FAILED, 
        message: `العنصر ${elementIndex + 1}: خاصية النمط غير معروفة: ${property}` 
      })
    }
  })

  // التحقق من القيم المسموح بها
  Object.entries(styles).forEach(([property, value]) => {
    if (value === null || value === undefined) {
      errors.push({ 
        code: ERROR_CODES.VALIDATION_FAILED, 
        message: `العنصر ${elementIndex + 1}: قيمة ${property} غير صالحة` 
      })
    }
  })

  return errors
}

/**
 * التحقق من صحة الإعدادات
 */
export const validateSettings = (settings) => {
  const errors = []

  if (!settings || typeof settings !== 'object') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'الإعدادات يجب أن تكون كائنًا' 
    })
    return errors
  }

  // التحقق من صحة الثيم
  if (settings.theme && !['light', 'dark', 'auto'].includes(settings.theme)) {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'الثيم غير صالح' 
    })
  }

  // التحقق من صحة الاتجاه
  if (settings.direction && !['rtl', 'ltr'].includes(settings.direction)) {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'الاتجاه غير صالح' 
    })
  }

  // التحقق من صحة اللغة
  if (settings.language && typeof settings.language !== 'string') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'اللغة يجب أن تكون نصًا' 
    })
  }

  return errors
}

/**
 * التحقق من صحة البيانات الوصفية
 */
export const validateMetadata = (metadata, elementIndex = 0) => {
  const errors = []

  if (!metadata || typeof metadata !== 'object') {
    return errors
  }

  // التحقق من صحة الترتيب
  if (metadata.order !== undefined && typeof metadata.order !== 'number') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: `العنصر ${elementIndex + 1}: الترتيب يجب أن يكون رقمًا` 
    })
  }

  // التحقق من صحة حالة القفل
  if (metadata.locked !== undefined && typeof metadata.locked !== 'boolean') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: `العنصر ${elementIndex + 1}: حالة القفل يجب أن تكون منطقية` 
    })
  }

  return errors
}

/**
 * التحقق من صحة معرف العنصر
 */
export const validateElementId = (id, existingElements = []) => {
  const errors = []

  if (!id || typeof id !== 'string') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'المعرف يجب أن يكون نصًا غير فارغ' 
    })
  }

  // التحقق من التكرار
  const duplicate = existingElements.find(element => element.id === id)
  if (duplicate) {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'المعرف مستخدم مسبقًا' 
    })
  }

  return errors
}

/**
 * التحقق من صحة اسم القالب
 */
export const validateTemplateName = (name) => {
  const errors = []

  if (!name || typeof name !== 'string') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'اسم القالب مطلوب' 
    })
  } else if (name.trim().length === 0) {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'اسم القالب لا يمكن أن يكون فارغًا' 
    })
  } else if (name.length > 100) {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'اسم القالب طويل جدًا (الحد الأقصى 100 حرف)' 
    })
  }

  return errors
}

/**
 * تنظيف القالب قبل الحفظ
 */
export const sanitizeTemplate = (template) => {
  if (!template || typeof template !== 'object') {
    return null
  }

  const sanitized = { ...template }

  // تنظيف الحقول
  if (sanitized.name) {
    sanitized.name = sanitized.name.trim()
  }

  // تنظيف العناصر
  if (Array.isArray(sanitized.elements)) {
    sanitized.elements = sanitized.elements.map(sanitizeElement)
  }

  // إضافة الطوابع الزمنية
  sanitized.updatedAt = new Date().toISOString()
  if (!sanitized.createdAt) {
    sanitized.createdAt = new Date().toISOString()
  }

  // إضافة الإصدار
  sanitized.version = sanitized.version || 1

  return sanitized
}

/**
 * تنظيف العنصر
 */
export const sanitizeElement = (element) => {
  if (!element || typeof element !== 'object') {
    return null
  }

  const sanitized = { ...element }

  // تنظيف المحتوى
  if (sanitized.content !== undefined) {
    sanitized.content = String(sanitized.content).trim()
  }

  // تنظيف الأنماط
  if (sanitized.styles && typeof sanitized.styles === 'object') {
    // إزالة الخصائص الفارغة
    Object.keys(sanitized.styles).forEach(key => {
      if (sanitized.styles[key] === null || sanitized.styles[key] === undefined) {
        delete sanitized.styles[key]
      }
    })
  }

  // إضافة البيانات الوصفية الافتراضية
  if (!sanitized.metadata) {
    sanitized.metadata = {}
  }

  return sanitized
}

/**
 * التحقق من صحة البيانات المستوردة
 */
export const validateImportedData = (data) => {
  const errors = []

  if (!data) {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'البيانات فارغة' 
    })
    return errors
  }

  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data
    
    // التحقق من البنية الأساسية
    if (!parsed || typeof parsed !== 'object') {
      errors.push({ 
        code: ERROR_CODES.INVALID_TEMPLATE, 
        message: 'البيانات غير صالحة' 
      })
    }

    // التحقق من إصدار التنسيق
    if (parsed.version && (typeof parsed.version !== 'number' || parsed.version > 2)) {
      errors.push({ 
        code: ERROR_CODES.VALIDATION_FAILED, 
        message: 'إصدار التنسيق غير مدعوم' 
      })
    }

  } catch (error) {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'البيانات ليست JSON صالح' 
    })
  }

  return errors
}

/**
 * التحقق من صلاحيات العنصر
 */
export const validateElementPermissions = (element, action = 'edit') => {
  const errors = []

  if (!element || typeof element !== 'object') {
    errors.push({ 
      code: ERROR_CODES.ELEMENT_NOT_FOUND, 
      message: 'العنصر غير موجود' 
    })
    return errors
  }

  // التحقق من حالة القفل
  if (element.metadata?.locked && action !== 'view') {
    errors.push({ 
      code: ERROR_CODES.VALIDATION_FAILED, 
      message: 'العنصر مقفل ولا يمكن تعديله' 
    })
  }

  return errors
}

/**
 * توليد رسائل الأخطاء بلغة مفهومة
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error
  
  if (error?.code && error?.message) {
    return `${error.message} (${error.code})`
  }
  
  if (error?.message) {
    return error.message
  }
  
  return 'حدث خطأ غير معروف'
}

/**
 * تسوية الأخطاء لعرضها
 */
export const flattenErrors = (errors) => {
  if (!Array.isArray(errors)) return []
  
  return errors.map(error => getErrorMessage(error))
}