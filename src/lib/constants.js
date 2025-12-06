// أنواع العناصر المتاحة
export const ELEMENT_TYPES = {
  TEXT: {
    id: 'text',
    name: 'نص',
    icon: '📝',
    category: 'content'
  },
  TITLE: {
    id: 'title',
    name: 'عنوان',
    icon: '🔤',
    category: 'content',
    defaultContent: 'عنوان جديد'
  },
  PARAGRAPH: {
    id: 'paragraph',
    name: 'فقرة',
    icon: '📄',
    category: 'content',
    defaultContent: 'اكتب محتوى الفقرة هنا...'
  },
  IMAGE: {
    id: 'image',
    name: 'صورة',
    icon: '🖼️',
    category: 'media',
    defaultContent: ''
  },
  VIDEO: {
    id: 'video',
    name: 'فيديو',
    icon: '🎥',
    category: 'media',
    defaultContent: ''
  },
  BUTTON: {
    id: 'button',
    name: 'زر',
    icon: '🔘',
    category: 'interactive',
    defaultContent: 'انقر هنا'
  },
  CARD: {
    id: 'card',
    name: 'بطاقة',
    icon: '🃏',
    category: 'layout',
    defaultContent: ''
  },
  SECTION: {
    id: 'section',
    name: 'قسم',
    icon: '📦',
    category: 'layout',
    defaultContent: ''
  },
  COLUMNS: {
    id: 'columns',
    name: 'أعمدة',
    icon: '📊',
    category: 'layout',
    defaultContent: ''
  },
  GRID: {
    id: 'grid',
    name: 'شبكة',
    icon: '🔲',
    category: 'layout',
    defaultContent: ''
  },
  LIST: {
    id: 'list',
    name: 'قائمة',
    icon: '📋',
    category: 'content',
    defaultContent: 'عنصر 1\nعنصر 2\nعنصر 3'
  },
  QUOTE: {
    id: 'quote',
    name: 'اقتباس',
    icon: '💬',
    category: 'content',
    defaultContent: 'اكتب الاقتباس هنا...'
  },
  DIVIDER: {
    id: 'divider',
    name: 'فاصل',
    icon: '➖',
    category: 'layout',
    defaultContent: ''
  }
}

// فئات العناصر
export const ELEMENT_CATEGORIES = {
  content: { name: 'المحتوى', color: 'blue', icon: '📝' },
  media: { name: 'الوسائط', color: 'green', icon: '🖼️' },
  layout: { name: 'التخطيط', color: 'purple', icon: '📐' },
  interactive: { name: 'تفاعلي', color: 'orange', icon: '🔄' }
}

// أحجام الخطوط
export const FONT_SIZES = [
  { value: 'xs', label: 'صغير جداً', size: '0.75rem' },
  { value: 'sm', label: 'صغير', size: '0.875rem' },
  { value: 'base', label: 'عادي', size: '1rem' },
  { value: 'lg', label: 'كبير', size: '1.125rem' },
  { value: 'xl', label: 'كبير جداً', size: '1.25rem' },
  { value: '2xl', label: 'ضخم', size: '1.5rem' },
  { value: '3xl', label: 'ضخم جداً', size: '1.875rem' },
  { value: '4xl', label: 'عملاق', size: '2.25rem' }
]

// أوزان الخطوط
export const FONT_WEIGHTS = [
  { value: 'normal', label: 'عادي' },
  { value: 'medium', label: 'متوسط' },
  { value: 'semibold', label: 'شبه غامق' },
  { value: 'bold', label: 'غامق' },
  { value: 'extrabold', label: 'غامق جداً' }
]

// محاذاة النص
export const TEXT_ALIGNMENTS = [
  { value: 'right', label: 'يمين', icon: 'align-right' },
  { value: 'center', label: 'وسط', icon: 'align-center' },
  { value: 'left', label: 'يسار', icon: 'align-left' },
  { value: 'justify', label: 'مضبوط', icon: 'align-justify' }
]

// ألوان
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },
  success: {
    500: '#10b981',
    600: '#059669'
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706'
  },
  danger: {
    500: '#ef4444',
    600: '#dc2626'
  }
}

// هوامش
export const SPACING = [
  { value: 0, label: 'لا شيء' },
  { value: 1, label: 'صغير' },
  { value: 2, label: 'صغير جداً' },
  { value: 3, label: 'متوسط' },
  { value: 4, label: 'كبير' },
  { value: 5, label: 'كبير جداً' },
  { value: 6, label: 'ضخم' },
  { value: 8, label: 'ضخم جداً' },
  { value: 10, label: 'عملاق' },
  { value: 12, label: 'عملاق جداً' }
]

// أنماط الحدود
export const BORDER_RADIUS = [
  { value: 'none', label: 'بدون' },
  { value: 'sm', label: 'صغير' },
  { value: 'md', label: 'متوسط' },
  { value: 'lg', label: 'كبير' },
  { value: 'xl', label: 'كبير جداً' },
  { value: '2xl', label: 'ضخم' },
  { value: 'full', label: 'كامل' }
]

// أنماط الظل
export const SHADOWS = [
  { value: 'none', label: 'بدون ظل' },
  { value: 'sm', label: 'ظل صغير' },
  { value: 'md', label: 'ظل متوسط' },
  { value: 'lg', label: 'ظل كبير' },
  { value: 'xl', label: 'ظل كبير جداً' },
  { value: '2xl', label: 'ظل ضخم' }
]

// أنماط العرض
export const VIEW_MODES = {
  DESIGN: 'design',
  SPLIT: 'split',
  CODE: 'code',
  PREVIEW: 'preview'
}

// أحجام الأجهزة
export const DEVICE_SIZES = {
  MOBILE: { id: 'mobile', name: 'جوال', width: 375, icon: '📱' },
  TABLET: { id: 'tablet', name: 'تابلت', width: 768, icon: '📱' },
  DESKTOP: { id: 'desktop', name: 'كمبيوتر', width: 1024, icon: '💻' },
  WIDE: { id: 'wide', name: 'واسع', width: 1440, icon: '🖥️' }
}

// تنسيقات التصدير
export const EXPORT_FORMATS = {
  JSON: 'json',
  HTML: 'html',
  MARKDOWN: 'markdown',
  PDF: 'pdf',
  PNG: 'png'
}

// إعدادات الافتراضية
export const DEFAULT_SETTINGS = {
  theme: 'light',
  direction: 'rtl',
  language: 'ar',
  autoSave: true,
  autoSaveInterval: 30000, // 30 ثانية
  gridSize: 20,
  showGrid: true,
  showGuides: true,
  snapToGrid: true,
  defaultFontFamily: 'system-ui',
  defaultFontSize: 'base',
  defaultSpacingUnit: 'rem'
}

// رموز الأخطاء
export const ERROR_CODES = {
  INVALID_TEMPLATE: 'INVALID_TEMPLATE',
  ELEMENT_NOT_FOUND: 'ELEMENT_NOT_FOUND',
  SAVE_FAILED: 'SAVE_FAILED',
  LOAD_FAILED: 'LOAD_FAILED',
  VALIDATION_FAILED: 'VALIDATION_FAILED'
}

// رسائل الأخطاء
export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_TEMPLATE]: 'القالب غير صالح',
  [ERROR_CODES.ELEMENT_NOT_FOUND]: 'العنصر غير موجود',
  [ERROR_CODES.SAVE_FAILED]: 'فشل حفظ التغييرات',
  [ERROR_CODES.LOAD_FAILED]: 'فشل تحميل البيانات',
  [ERROR_CODES.VALIDATION_FAILED]: 'التحقق من البيانات فشل'
}

// اختصارات لوحة المفاتيح
export const KEYBOARD_SHORTCUTS = {
  SAVE: { key: 's', ctrl: true, label: 'حفظ' },
  UNDO: { key: 'z', ctrl: true, label: 'تراجع' },
  REDO: { key: 'y', ctrl: true, label: 'إعادة' },
  PREVIEW: { key: 'p', ctrl: true, label: 'معاينة' },
  DELETE: { key: 'Delete', label: 'حذف' },
  DUPLICATE: { key: 'd', ctrl: true, label: 'نسخ' },
  SELECT_ALL: { key: 'a', ctrl: true, label: 'تحديد الكل' },
  DESELECT: { key: 'Escape', label: 'إلغاء التحديد' },
  ZOOM_IN: { key: '+', ctrl: true, label: 'تكبير' },
  ZOOM_OUT: { key: '-', ctrl: true, label: 'تصغير' },
  ZOOM_RESET: { key: '0', ctrl: true, label: 'إعادة الضبط' }
}

// قوالب سريعة
export const QUICK_TEMPLATES = [
  {
    id: 'lesson',
    name: 'قالب درس',
    description: 'قالب مخصص للدروس التعليمية',
    elements: [
      { type: 'title', content: 'عنوان الدرس' },
      { type: 'paragraph', content: 'مقدمة الدرس' },
      { type: 'subtitle', content: 'الأهداف التعليمية' },
      { type: 'list', content: 'الهدف الأول\nالهدف الثاني\nالهدف الثالث' },
      { type: 'subtitle', content: 'المحتوى الرئيسي' },
      { type: 'paragraph', content: 'محتوى الدرس' }
    ]
  },
  {
    id: 'quiz',
    name: 'قالب اختبار',
    description: 'قالب مخصص للاختبارات',
    elements: [
      { type: 'title', content: 'الاختبار' },
      { type: 'paragraph', content: 'تعليمات الاختبار' },
      { type: 'subtitle', content: 'الأسئلة' }
    ]
  },
  {
    id: 'presentation',
    name: 'قالب عرض تقديمي',
    description: 'قالب مخصص للعروض التقديمية',
    elements: [
      { type: 'title', content: 'العرض التقديمي' },
      { type: 'subtitle', content: 'النقاط الرئيسية' },
      { type: 'list', content: 'النقطة الأولى\nالنقطة الثانية\nالنقطة الثالثة' }
    ]
  }
]

// أصناف الدروس
export const LESSON_CATEGORIES = [
  { id: 'math', name: 'رياضيات', color: 'blue', icon: '➕' },
  { id: 'science', name: 'علوم', color: 'green', icon: '🔬' },
  { id: 'arabic', name: 'لغة عربية', color: 'red', icon: '📚' },
  { id: 'english', name: 'لغة إنجليزية', color: 'purple', icon: '🔤' },
  { id: 'history', name: 'تاريخ', color: 'yellow', icon: '📜' },
  { id: 'art', name: 'فن', color: 'pink', icon: '🎨' },
  { id: 'technology', name: 'تكنولوجيا', color: 'indigo', icon: '💻' },
  { id: 'other', name: 'أخرى', color: 'gray', icon: '📦' }
]