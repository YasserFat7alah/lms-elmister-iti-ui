'use client'

import { useState } from 'react'
import {
  Save, 
  Eye, 
  Download, 
  Undo, 
  Redo, 
  Settings,
  Layers,
  Grid3x3,
  Palette,
  LayoutGrid,
  Smartphone,
  Monitor,
  Tablet,
  Maximize2,
  Minus,
  Plus,
  Code,
  EyeOff,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline
} from 'lucide-react'

// استيراد المكونات مباشرة بدون Tooltip مؤقتاً
import Button from './Button'
import Modal from './Modal'

export default function EditorToolbar({ 
  onSave, 
  onPreview, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onExport,
  onSettings,
  viewMode = 'design',
  onViewModeChange,
  deviceSize = 'desktop',
  onDeviceSizeChange,
  zoom = 100,
  onZoomChange,
  showGrid = true,
  onToggleGrid,
  showGuides = true,
  onToggleGuides,
  formatting = {},
  onFormattingChange
}) {
  const [showExportModal, setShowExportModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  // استخدام أيقونة بسيطة للمنقسم (يمكن تغييرها لاحقاً)
  const SplitIcon = LayoutGrid // استخدام أيقونة مؤقتة

  const viewModes = [
    { id: 'design', label: 'تصميم', icon: LayoutGrid },
    { id: 'split', label: 'منقسم', icon: SplitIcon },
    { id: 'code', label: 'الكود', icon: Code }
  ]

  const deviceSizes = [
    { id: 'mobile', label: 'جوال', icon: Smartphone, width: '375px' },
    { id: 'tablet', label: 'تابلت', icon: Tablet, width: '768px' },
    { id: 'desktop', label: 'كمبيوتر', icon: Monitor, width: '100%' }
  ]

  const handleExport = (format) => {
    if (onExport) {
      onExport(format)
    }
    setShowExportModal(false)
  }

  const handleZoomIn = () => {
    if (onZoomChange && zoom < 200) {
      onZoomChange(zoom + 10)
    }
  }

  const handleZoomOut = () => {
    if (onZoomChange && zoom > 50) {
      onZoomChange(zoom - 10)
    }
  }

  const handleZoomReset = () => {
    if (onZoomChange) {
      onZoomChange(100)
    }
  }

  return (
    <>
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="px-4 py-2">
          {/* الصف الأول: الأدوات الرئيسية */}
          <div className="flex items-center justify-between mb-3">
            {/* اليسار: التحكم في الحفظ */}
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                icon={Save}
                onClick={onSave}
              >
                حفظ
              </Button>
              
              <Button
                variant="success"
                size="md"
                icon={Eye}
                onClick={onPreview}
              >
                معاينة
              </Button>
              
              <div className="h-6 w-px bg-gray-300 mx-2"></div>
              
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className={`p-2 rounded-lg ${canUndo ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
                title="تراجع (Ctrl+Z)"
              >
                <Undo size={18} />
              </button>
              
              <button
                onClick={onRedo}
                disabled={!canRedo}
                className={`p-2 rounded-lg ${canRedo ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
                title="إعادة (Ctrl+Y)"
              >
                <Redo size={18} />
              </button>
            </div>

            {/* الوسط: نمط العرض */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {viewModes.map((mode) => {
                const Icon = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => onViewModeChange?.(mode.id)}
                    className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${
                      viewMode === mode.id 
                        ? 'bg-white shadow-md text-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title={mode.label}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                )
              })}
            </div>

            {/* اليمين: أدوات إضافية */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="لوحة الألوان">
                <Palette size={18} />
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="طبقات التصميم">
                <Layers size={18} />
              </button>
              
              <div className="h-6 w-px bg-gray-300 mx-2"></div>
              
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={() => setShowExportModal(true)}
              >
                <span className="hidden sm:inline">تصدير</span>
              </Button>
              
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="الإعدادات"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* الصف الثاني: أدوات ثانوية */}
          <div className="flex items-center justify-between">
            {/* اليسار: التحكم في حجم الشاشة */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">الحجم:</span>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                {deviceSizes.map((device) => {
                  const Icon = device.icon
                  return (
                    <button
                      key={device.id}
                      onClick={() => onDeviceSizeChange?.(device.id)}
                      className={`p-2 rounded ${
                        deviceSize === device.id 
                          ? 'bg-white shadow text-blue-600' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      title={`${device.label} (${device.width})`}
                    >
                      <Icon size={16} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* الوسط: أدوات التنسيق */}
            <div className="flex items-center gap-4">
              {/* التحكم في التكبير */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 hover:bg-gray-100 rounded"
                  title="تصغير (Ctrl+-)"
                >
                  <Minus size={16} />
                </button>
                
                <div className="relative">
                  <select
                    value={zoom}
                    onChange={(e) => onZoomChange?.(parseInt(e.target.value))}
                    className="appearance-none bg-white border rounded px-3 py-1.5 text-sm pr-8"
                  >
                    {[50, 75, 100, 125, 150, 175, 200].map((value) => (
                      <option key={value} value={value}>
                        {value}%
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Maximize2 size={14} />
                  </div>
                </div>
                
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-gray-100 rounded"
                  title="تكبير (Ctrl++)"
                >
                  <Plus size={16} />
                </button>
                
                <button
                  onClick={handleZoomReset}
                  className="px-2 py-1 text-sm hover:bg-gray-100 rounded"
                  title="إعادة الضبط (Ctrl+0)"
                >
                  100%
                </button>
              </div>
            </div>

            {/* اليمين: أدوات العرض */}
            <div className="flex items-center gap-4">
              <button
                onClick={onToggleGrid}
                className={`p-1.5 rounded ${showGrid ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                title={showGrid ? "إخفاء الشبكة" : "إظهار الشبكة"}
              >
                <Grid3x3 size={16} />
              </button>
              
              <button
                onClick={onToggleGuides}
                className={`p-1.5 rounded ${showGuides ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                title={showGuides ? "إخفاء خطوط الإرشاد" : "إظهار خطوط الإرشاد"}
              >
                <EyeOff size={16} />
              </button>
              
              {/* أدوات محاذاة النص */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onFormattingChange?.({ align: 'left' })}
                  className={`p-1.5 rounded ${formatting.align === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="محاذاة لليسار"
                >
                  <AlignLeft size={16} />
                </button>
                
                <button
                  onClick={() => onFormattingChange?.({ align: 'center' })}
                  className={`p-1.5 rounded ${formatting.align === 'center' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="محاذاة للوسط"
                >
                  <AlignCenter size={16} />
                </button>
                
                <button
                  onClick={() => onFormattingChange?.({ align: 'right' })}
                  className={`p-1.5 rounded ${formatting.align === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="محاذاة لليمين"
                >
                  <AlignRight size={16} />
                </button>
              </div>
              
              {/* أدوات تنسيق النص */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onFormattingChange?.({ bold: !formatting.bold })}
                  className={`p-1.5 rounded ${formatting.bold ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="عريض (Ctrl+B)"
                >
                  <Bold size={16} />
                </button>
                
                <button
                  onClick={() => onFormattingChange?.({ italic: !formatting.italic })}
                  className={`p-1.5 rounded ${formatting.italic ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="مائل (Ctrl+I)"
                >
                  <Italic size={16} />
                </button>
                
                <button
                  onClick={() => onFormattingChange?.({ underline: !formatting.underline })}
                  className={`p-1.5 rounded ${formatting.underline ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="تحته خط (Ctrl+U)"
                >
                  <Underline size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نافذة تصدير */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="تصدير التصميم"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">اختر صيغة التصدير:</p>
          
          <div className="grid grid-cols-2 gap-3">
            {['json', 'html', 'markdown', 'pdf'].map((format) => (
              <button
                key={format}
                onClick={() => handleExport(format)}
                className="p-4 border rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="font-medium mb-1">{format.toUpperCase()}</div>
                <div className="text-sm text-gray-500">تصدير كملف {format.toUpperCase()}</div>
              </button>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">يشمل:</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">الأنماط</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">الصور</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* نافذة الإعدادات */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="إعدادات المحرر"
        size="lg"
      >
        <div className="space-y-6">
          {/* إعدادات التصميم */}
          <div>
            <h3 className="font-medium mb-3">إعدادات التصميم</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">وحدة القياس</label>
                <select className="w-full p-2 border rounded">
                  <option value="px">بكسل (px)</option>
                  <option value="rem">ريم (rem)</option>
                  <option value="em">إم (em)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">خطوط افتراضية</label>
                <select className="w-full p-2 border rounded">
                  <option value="arabic">عربية</option>
                  <option value="system">نظام التشغيل</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">لون الخطوط الإرشادية</label>
                <input type="color" defaultValue="#3b82f6" className="w-full p-1 border rounded" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">حجم الشبكة</label>
                <input type="range" min="5" max="50" defaultValue="20" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}