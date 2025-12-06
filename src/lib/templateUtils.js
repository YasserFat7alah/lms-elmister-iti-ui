/**
 * أدوات مساعدة للتعامل مع القوالب
 */

// دالة لإنشاء عنصر جديد
export const createElement = (type, content = '', customStyles = {}) => {
  const baseStyles = getDefaultStyles(type)
  
  return {
    id: `elem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    content,
    styles: { ...baseStyles, ...customStyles },
    createdAt: new Date().toISOString(),
    metadata: {
      order: 0,
      parent: null,
      locked: false
    }
  }
}

// الحصول على الأنماط الافتراضية لكل نوع
export const getDefaultStyles = (type) => {
  const styles = {
    title: {
      fontSize: '2xl',
      fontWeight: 'bold',
      color: 'text-gray-900',
      align: 'right',
      marginTop: 4,
      marginBottom: 2,
      lineHeight: 'tight'
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
      fontWeight: 'normal',
      color: 'text-gray-600',
      align: 'right',
      lineHeight: 'relaxed',
      marginBottom: 4,
      backgroundColor: 'bg-transparent'
    },
    image: {
      width: 'full',
      maxWidth: 'full',
      borderRadius: 'lg',
      marginY: 4,
      objectFit: 'cover',
      aspectRatio: 'auto'
    },
    button: {
      backgroundColor: 'bg-blue-600',
      textColor: 'text-white',
      paddingX: 6,
      paddingY: 2.5,
      borderRadius: 'md',
      fontSize: 'base',
      fontWeight: 'medium',
      display: 'inline-block'
    },
    card: {
      backgroundColor: 'bg-white',
      padding: 6,
      borderRadius: 'xl',
      shadow: 'md',
      borderWidth: 1,
      borderColor: 'border-gray-200'
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
    }
  }
  
  return styles[type] || {}
}

// حفظ القالب
export const saveTemplate = async (template) => {
  try {
    // حفظ في localStorage
    localStorage.setItem('lesson_template', JSON.stringify(template))
    
    // يمكن إضافة حفظ في قاعدة البيانات هنا
    // const response = await fetch('/api/templates', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(template)
    // })
    
    return { 
      success: true, 
      template,
      message: 'تم الحفظ بنجاح'
    }
  } catch (error) {
    throw new Error(`فشل في الحفظ: ${error.message}`)
  }
}

// تحميل القالب
export const loadTemplate = () => {
  try {
    const saved = localStorage.getItem('lesson_template')
    if (saved) {
      return JSON.parse(saved)
    }
    return null
  } catch (error) {
    console.error('خطأ في تحميل القالب:', error)
    return null
  }
}

// تصدير القالب
export const exportTemplate = (template, format = 'json') => {
  try {
    const cleanTemplate = {
      ...template,
      elements: template.elements.map(({ id, metadata, ...rest }) => rest)
    }
    
    switch (format) {
      case 'json':
        return JSON.stringify(cleanTemplate, null, 2)
      
      case 'html':
        return generateHTML(cleanTemplate)
      
      case 'markdown':
        return generateMarkdown(cleanTemplate)
      
      default:
        return JSON.stringify(cleanTemplate)
    }
  } catch (error) {
    throw new Error(`خطأ في التصدير: ${error.message}`)
  }
}

// توليد HTML
const generateHTML = (template) => {
  const { elements } = template
  
  const elementHTML = elements.map(element => {
    const classes = stylesToClasses(element.styles)
    
    switch (element.type) {
      case 'title':
        return `<h1 class="${classes}">${element.content}</h1>`
      
      case 'paragraph':
        return `<p class="${classes}">${element.content}</p>`
      
      case 'image':
        return `<img src="${element.content}" class="${classes}" alt="" />`
      
      case 'button':
        return `<button class="${classes}">${element.content}</button>`
      
      default:
        return `<div class="${classes}">${element.content}</div>`
    }
  }).join('\n')
  
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-6">
  <div class="max-w-4xl mx-auto">
    ${elementHTML}
  </div>
</body>
</html>`
}

// توليد Markdown
const generateMarkdown = (template) => {
  const { elements } = template
  
  return elements.map(element => {
    switch (element.type) {
      case 'title':
        return `# ${element.content}\n\n`
      
      case 'subtitle':
        return `## ${element.content}\n\n`
      
      case 'paragraph':
        return `${element.content}\n\n`
      
      case 'image':
        return `![صورة](${element.content})\n\n`
      
      case 'list':
        const items = element.content.split('\n').filter(Boolean)
        return items.map(item => `- ${item}`).join('\n') + '\n\n'
      
      default:
        return `${element.content}\n\n`
    }
  }).join('')
}

// تحويل الأنماط إلى كلاسات
const stylesToClasses = (styles) => {
  const classes = []
  
  Object.entries(styles).forEach(([key, value]) => {
    if (!value) return
    
    switch (key) {
      case 'fontSize':
        classes.push(`text-${value}`)
        break
      
      case 'fontWeight':
        classes.push(`font-${value}`)
        break
      
      case 'color':
        if (value.startsWith('text-')) {
          classes.push(value)
        }
        break
      
      case 'backgroundColor':
        if (value.startsWith('bg-')) {
          classes.push(value)
        }
        break
      
      case 'marginTop':
        classes.push(`mt-${value}`)
        break
      
      case 'marginBottom':
        classes.push(`mb-${value}`)
        break
      
      case 'padding':
        classes.push(`p-${value}`)
        break
      
      case 'borderRadius':
        classes.push(`rounded-${value}`)
        break
      
      case 'shadow':
        classes.push(`shadow-${value}`)
        break
      
      case 'align':
        classes.push(`text-${value}`)
        break
    }
  })
  
  return classes.join(' ')
}