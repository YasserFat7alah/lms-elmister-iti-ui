import { COLORS, FONT_SIZES, FONT_WEIGHTS, TEXT_ALIGNMENTS, SPACING, BORDER_RADIUS, SHADOWS } from '@/lib/constants'

/**
 * تحويل الأنماط إلى كلاسات Tailwind CSS
 */
export const stylesToClasses = (styles) => {
  if (!styles || typeof styles !== 'object') {
    return ''
  }

  const classes = []

  // تحويل الأنماط الأساسية
  Object.entries(styles).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    switch (key) {
      // النصوص
      case 'fontSize':
        const fontSize = FONT_SIZES.find(f => f.value === value)
        if (fontSize) classes.push(`text-${value}`)
        break

      case 'fontWeight':
        const fontWeight = FONT_WEIGHTS.find(f => f.value === value)
        if (fontWeight) classes.push(`font-${value}`)
        break

      case 'textAlign':
        const alignment = TEXT_ALIGNMENTS.find(a => a.value === value)
        if (alignment) classes.push(`text-${value}`)
        break

      case 'color':
        if (value.startsWith('#')) {
          // لون مخصص - سنستخدم style مباشرة
          return
        } else if (COLORS[value]) {
          classes.push(`text-${value}-600`)
        } else {
          // تحقق إذا كان لون tailwind
          const colorMatch = value.match(/^(gray|primary|success|warning|danger)-(\d+)$/)
          if (colorMatch) {
            classes.push(`text-${value}`)
          }
        }
        break

      // الخلفيات
      case 'backgroundColor':
        if (value.startsWith('#')) {
          return
        } else {
          const bgColorMatch = value.match(/^(gray|primary|success|warning|danger)-(\d+)$/)
          if (bgColorMatch) {
            classes.push(`bg-${value}`)
          }
        }
        break

      // الهوامش
      case 'margin':
      case 'marginTop':
      case 'marginBottom':
      case 'marginLeft':
      case 'marginRight':
        const marginValue = SPACING.find(s => s.value === value)
        if (marginValue) {
          const prefix = key === 'margin' ? 'm' :
                       key === 'marginTop' ? 'mt' :
                       key === 'marginBottom' ? 'mb' :
                       key === 'marginLeft' ? 'ml' : 'mr'
          classes.push(`${prefix}-${value}`)
        }
        break

      case 'padding':
      case 'paddingTop':
      case 'paddingBottom':
      case 'paddingLeft':
      case 'paddingRight':
        const paddingValue = SPACING.find(s => s.value === value)
        if (paddingValue) {
          const prefix = key === 'padding' ? 'p' :
                       key === 'paddingTop' ? 'pt' :
                       key === 'paddingBottom' ? 'pb' :
                       key === 'paddingLeft' ? 'pl' : 'pr'
          classes.push(`${prefix}-${value}`)
        }
        break

      // الحدود
      case 'borderRadius':
        const borderRadius = BORDER_RADIUS.find(b => b.value === value)
        if (borderRadius && value !== 'none') {
          classes.push(`rounded-${value}`)
        }
        break

      case 'borderWidth':
        classes.push(`border-${value}`)
        break

      case 'borderColor':
        if (value.startsWith('#')) {
          return
        } else {
          const borderColorMatch = value.match(/^(gray|primary|success|warning|danger)-(\d+)$/)
          if (borderColorMatch) {
            classes.push(`border-${value}`)
          }
        }
        break

      // الظلال
      case 'boxShadow':
        const shadow = SHADOWS.find(s => s.value === value)
        if (shadow && value !== 'none') {
          classes.push(`shadow-${value}`)
        }
        break

      // الأبعاد
      case 'width':
        if (typeof value === 'string') {
          if (value === 'full') classes.push('w-full')
          else if (value === 'auto') classes.push('w-auto')
          else if (value.includes('%')) return // سيتم معالجته في inline style
          else if (value.includes('px') || value.includes('rem')) return
          else classes.push(`w-${value}`)
        }
        break

      case 'height':
        if (typeof value === 'string') {
          if (value === 'full') classes.push('h-full')
          else if (value === 'auto') classes.push('h-auto')
          else classes.push(`h-${value}`)
        }
        break

      // العرض
      case 'display':
        classes.push(value === 'flex' ? 'flex' :
                    value === 'inline-flex' ? 'inline-flex' :
                    value === 'block' ? 'block' :
                    value === 'inline-block' ? 'inline-block' :
                    value === 'hidden' ? 'hidden' : '')
        break

      case 'flexDirection':
        classes.push(value === 'row' ? 'flex-row' :
                    value === 'column' ? 'flex-col' :
                    value === 'row-reverse' ? 'flex-row-reverse' :
                    'flex-col-reverse')
        break

      case 'justifyContent':
        classes.push(value === 'start' ? 'justify-start' :
                    value === 'center' ? 'justify-center' :
                    value === 'end' ? 'justify-end' :
                    value === 'between' ? 'justify-between' :
                    'justify-around')
        break

      case 'alignItems':
        classes.push(value === 'start' ? 'items-start' :
                    value === 'center' ? 'items-center' :
                    value === 'end' ? 'items-end' :
                    'items-stretch')
        break

      // النص
      case 'lineHeight':
        classes.push(`leading-${value}`)
        break

      case 'letterSpacing':
        classes.push(`tracking-${value}`)
        break

      case 'textTransform':
        classes.push(value === 'uppercase' ? 'uppercase' :
                    value === 'lowercase' ? 'lowercase' :
                    value === 'capitalize' ? 'capitalize' : '')
        break

      // تأثيرات
      case 'opacity':
        classes.push(`opacity-${Math.round(value * 100)}`)
        break

      // خاص
      case 'gap':
        classes.push(`gap-${value}`)
        break
    }
  })

  return classes.filter(Boolean).join(' ')
}

/**
 * استخراج الأنماط المضمنة من كائن الأنماط
 */
export const extractInlineStyles = (styles) => {
  if (!styles || typeof styles !== 'object') {
    return {}
  }

  const inlineStyles = {}

  Object.entries(styles).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    // تحويل القيم التي تحتاج إلى inline styles
    switch (key) {
      case 'color':
      case 'backgroundColor':
      case 'borderColor':
        if (value.startsWith('#')) {
          inlineStyles[key] = value
        }
        break

      case 'width':
      case 'height':
      case 'maxWidth':
      case 'minWidth':
      case 'maxHeight':
      case 'minHeight':
        if (typeof value === 'string' && 
            (value.includes('px') || value.includes('rem') || value.includes('%'))) {
          inlineStyles[key] = value
        }
        break

      case 'backgroundImage':
        if (value.startsWith('url(')) {
          inlineStyles.backgroundImage = value
        }
        break

      case 'custom':
        // معالجة الأنماط المخصصة
        if (typeof value === 'string') {
          try {
            const customStyles = JSON.parse(value)
            Object.assign(inlineStyles, customStyles)
          } catch {
            // تجاهل إذا لم يكن JSON صالح
          }
        }
        break
    }
  })

  return inlineStyles
}

/**
 * تطبيق الأنماط على عنصر
 */
export const applyStyles = (element, styles) => {
  if (!element || !styles) return element

  const tailwindClasses = stylesToClasses(styles)
  const inlineStyles = extractInlineStyles(styles)

  return {
    ...element,
    className: element.className 
      ? `${element.className} ${tailwindClasses}` 
      : tailwindClasses,
    style: { ...element.style, ...inlineStyles }
  }
}

/**
 * إنشاء كائن أنماط افتراضي لنوع العنصر
 */
export const getDefaultStyles = (elementType) => {
  const defaults = {
    // النصوص
    title: {
      fontSize: '2xl',
      fontWeight: 'bold',
      color: 'gray-900',
      textAlign: 'right',
      marginBottom: 4
    },
    subtitle: {
      fontSize: 'xl',
      fontWeight: 'semibold',
      color: 'gray-700',
      textAlign: 'right',
      marginTop: 2,
      marginBottom: 3
    },
    paragraph: {
      fontSize: 'base',
      fontWeight: 'normal',
      color: 'gray-600',
      textAlign: 'right',
      lineHeight: 'relaxed',
      marginBottom: 4
    },
    // الوسائط
    image: {
      width: 'full',
      borderRadius: 'lg',
      marginTop: 4,
      marginBottom: 4
    },
    video: {
      width: 'full',
      borderRadius: 'lg',
      marginTop: 4,
      marginBottom: 4
    },
    // التفاعلية
    button: {
      backgroundColor: 'primary-500',
      color: 'white',
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: 'md',
      fontSize: 'base',
      fontWeight: 'medium',
      display: 'inline-block',
      textAlign: 'center'
    },
    // التخطيط
    card: {
      backgroundColor: 'white',
      padding: 6,
      borderRadius: 'xl',
      boxShadow: 'md',
      borderWidth: 1,
      borderColor: 'gray-200'
    },
    section: {
      paddingTop: 8,
      paddingBottom: 8,
      backgroundColor: 'transparent'
    },
    columns: {
      display: 'flex',
      flexDirection: 'row',
      gap: 6
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 4
    },
    // خاصة
    list: {
      paddingRight: 4,
      marginBottom: 4
    },
    quote: {
      borderLeftWidth: 4,
      borderLeftColor: 'primary-500',
      paddingLeft: 4,
      fontStyle: 'italic',
      color: 'gray-700'
    }
  }

  return defaults[elementType] || {}
}

/**
 * تحويل كائن الأنماط إلى سلسلة CSS
 */
export const stylesToCss = (styles, selector = '.element') => {
  if (!styles || typeof styles !== 'object') {
    return ''
  }

  const cssRules = []

  Object.entries(styles).forEach(([property, value]) => {
    if (value === undefined || value === null) return

    let cssValue = value
    let cssProperty = property

    // تحويل أسماء الخصائص إلى CSS
    switch (property) {
      case 'fontSize':
        const fontSize = FONT_SIZES.find(f => f.value === value)
        if (fontSize) cssValue = fontSize.size
        break

      case 'textAlign':
        cssProperty = 'text-align'
        break

      case 'backgroundColor':
        cssProperty = 'background-color'
        break

      case 'marginTop':
        cssProperty = 'margin-top'
        break

      case 'marginBottom':
        cssProperty = 'margin-bottom'
        break

      case 'marginLeft':
        cssProperty = 'margin-left'
        break

      case 'marginRight':
        cssProperty = 'margin-right'
        break

      case 'paddingTop':
        cssProperty = 'padding-top'
        break

      case 'paddingBottom':
        cssProperty = 'padding-bottom'
        break

      case 'paddingLeft':
        cssProperty = 'padding-left'
        break

      case 'paddingRight':
        cssProperty = 'padding-right'
        break

      case 'borderRadius':
        cssProperty = 'border-radius'
        break

      case 'borderWidth':
        cssProperty = 'border-width'
        break

      case 'borderColor':
        cssProperty = 'border-color'
        break

      case 'boxShadow':
        cssProperty = 'box-shadow'
        break

      case 'flexDirection':
        cssProperty = 'flex-direction'
        break

      case 'justifyContent':
        cssProperty = 'justify-content'
        break

      case 'alignItems':
        cssProperty = 'align-items'
        break

      case 'lineHeight':
        cssProperty = 'line-height'
        break

      case 'letterSpacing':
        cssProperty = 'letter-spacing'
        break

      case 'textTransform':
        cssProperty = 'text-transform'
        break
    }

    // تحويل قيم tailwind إلى قيم CSS فعلية
    if (typeof cssValue === 'string') {
      // التعامل مع الألوان
      if (cssValue.startsWith('gray-')) {
        const shade = cssValue.split('-')[1]
        cssValue = COLORS.gray[shade] || cssValue
      } else if (cssValue.startsWith('primary-')) {
        const shade = cssValue.split('-')[1]
        cssValue = COLORS.primary[shade] || cssValue
      }
      
      // التعامل مع وحدات القياس
      if (cssValue === 'full') {
        cssValue = '100%'
      }
    }

    cssRules.push(`${cssProperty}: ${cssValue};`)
  })

  return `${selector} { ${cssRules.join(' ')} }`
}

/**
 * دمج أنماط متعددة
 */
export const mergeStyles = (...styleObjects) => {
  return styleObjects.reduce((merged, current) => {
    if (!current || typeof current !== 'object') return merged
    return { ...merged, ...current }
  }, {})
}

/**
 * إعادة تعيين الأنماط إلى الافتراضيات
 */
export const resetStyles = (elementType) => {
  return getDefaultStyles(elementType)
}

/**
 * التحقق من صحة الأنماط
 */
export const validateStyles = (styles) => {
  const errors = []

  if (!styles || typeof styles !== 'object') {
    errors.push('الأنماط يجب أن تكون كائنًا')
    return errors
  }

  // التحقق من القيم المسموح بها
  Object.entries(styles).forEach(([key, value]) => {
    switch (key) {
      case 'fontSize':
        if (!FONT_SIZES.find(f => f.value === value)) {
          errors.push(`حجم الخط غير صالح: ${value}`)
        }
        break

      case 'fontWeight':
        if (!FONT_WEIGHTS.find(f => f.value === value)) {
          errors.push(`وزن الخط غير صالح: ${value}`)
        }
        break

      case 'textAlign':
        if (!TEXT_ALIGNMENTS.find(a => a.value === value)) {
          errors.push(`المحاذاة غير صالحة: ${value}`)
        }
        break
    }
  })

  return errors
}