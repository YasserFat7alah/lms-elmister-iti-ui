'use client'

import {
  Type,
  Image,
  Film,
  List,
  Square,
  Grid3x3,
  Columns,
  Layout,
  FileText,
  Quote,
  Heading2,
  PanelRight,
  Box,
  HelpCircle
} from 'lucide-react'

const ELEMENT_TYPES = [
{ id: 'title', name: 'Title', icon: Type, color: 'text-blue-500', category: 'Text' },
{ id: 'subtitle', name: 'Subtitle', icon: Heading2, color: 'text-blue-400', category: 'Text' },
{ id: 'paragraph', name: 'Text Paragraph', icon: FileText, color: 'text-gray-500', category: 'Text' },
{ id: 'quote', name: 'Quote', icon: Quote, color: 'text-purple-500', category: 'Text' },
{ id: 'image', name: 'Image', icon: Image, color: 'text-green-500', category: 'Media' },
{ id: 'button', name: 'Button', icon: Square, color: 'text-orange-500', category: 'Interactive' },
{ id: 'list', name: 'List', icon: List, color: 'text-indigo-500', category: 'Text' },
{ id: 'card', name: 'Card', icon: Layout, color: 'text-teal-500', category: 'Layout' },
{ id: 'section', name: 'Section', icon: PanelRight, color: 'text-cyan-500', category: 'Layout' },
{ id: 'columns', name: 'Columns', icon: Columns, color: 'text-pink-500', category: 'Layout' },
{ id: 'grid', name: 'Grid', icon: Grid3x3, color: 'text-rose-500', category: 'Layout' },
{ id: 'quiz', name: 'Quiz', icon: HelpCircle, color: 'text-red-500', category: 'Interactive' },
]
export default function ElementsPanel({ onAddElement }) {
  const categories = [...new Set(ELEMENT_TYPES.map(item => item.category))]

  return (
    <div className="w-64 bg-white border-r overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">📦  Elements Library</h3>
        <p className="text-sm text-gray-500"> Drag or click to add </p>
      </div>

      <div className="p-3">
        {categories.map(category => (
          <div key={category} className="mb-6">
            <h4 className="font-medium text-sm text-gray-700 mb-2 px-2">{category}</h4>
            <div className="grid grid-cols-2 gap-2">
              {ELEMENT_TYPES.filter(item => item.category === category).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onAddElement(item.id)}
                  className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-300 group"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('elementType', item.id)
                    e.dataTransfer.setData('text/plain', item.name)
                  }}
                >
                  <item.icon className={`w-6 h-6 mb-1.5 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium text-center">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* قوالب سريعة */}
      {/* <div className="p-4 border-t">
        <h4 className="font-medium mb-3 text-sm">⚡ قوالب سريعة</h4>
        <div className="space-y-2">
          {[
            { name: 'درس تعليمي', desc: 'قالب متكامل للدروس' },
            { name: 'اختبار', desc: 'قالب للأسئلة والاختبارات' },
            { name: 'عرض تقديمي', desc: 'قالب للعروض التقديمية' },
            { name: 'بطاقة تعليمية', desc: 'قالب للمعلومات المختصرة' }
          ].map((template) => (
            <button
              key={template.name}
              className="w-full text-right p-2 bg-gray-50 hover:bg-gray-100 rounded text-sm flex items-center justify-between"
              onClick={() => {
                // إضافة عناصر القالب السريع
                const elements = getQuickTemplate(template.name)
                // هنا ستحتاج لدالة لتحديث العناصر جميعها
                console.log('تحميل قالب:', template.name)
                alert(`سيتم تحميل قالب ${template.name}`)
              }}
            >
              <span>{template.name}</span>
              <span className="text-xs text-gray-400">{template.desc}</span>
            </button>
          ))}
        </div>
      </div> */}

      {/* تعليمات */}
      {/* <div className="p-4 border-t bg-blue-50">
        <h4 className="font-medium mb-2 text-sm text-blue-700">💡 نصائح سريعة</h4>
        <ul className="text-xs text-blue-600 space-y-1">
          <li>• انقر على العنصر لإضافته</li>
          <li>• اسحب العنصر إلى منطقة التصميم</li>
          <li>• انقر نقرًا مزدوجًا للتعديل المباشر</li>
          <li>• استخدم Ctrl+Z للتراجع</li>
        </ul>
      </div> */}
    </div>
  )
}

// دالة مساعدة للحصول على قوالب سريعة
const getQuickTemplate = (templateName) => {
  const templates = {
    'درس تعليمي': [
      { type: 'title', content: 'عنوان الدرس' },
      { type: 'subtitle', content: 'الأهداف التعليمية' },
      { type: 'list', content: 'الهدف الأول\nالهدف الثاني\nالهدف الثالث' },
      { type: 'subtitle', content: 'المحتوى الرئيسي' },
      { type: 'paragraph', content: 'اكتب محتوى الدرس هنا...' },
      { type: 'subtitle', content: 'الخلاصة' },
      { type: 'paragraph', content: 'اكتب ملخص الدرس هنا...' }
    ],
    'اختبار': [
      { type: 'title', content: 'الاختبار' },
      { type: 'paragraph', content: 'اقرأ الأسئلة بعناية وأجب عليها جميعًا' },
      { type: 'subtitle', content: 'السؤال الأول' },
      { type: 'paragraph', content: '...اكتب السؤال هنا' },
      { type: 'subtitle', content: 'السؤال الثاني' },
      { type: 'paragraph', content: '...اكتب السؤال هنا' }
    ]
  }

  return templates[templateName] || []
}