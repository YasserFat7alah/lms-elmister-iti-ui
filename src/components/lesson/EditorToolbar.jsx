'use client'

import { useState } from 'react'
import {
  Save, 
  Eye, 
  Download, 
  Undo, 
  Redo, 
  Settings,
  Upload,
  Grid3x3,
  LayoutGrid,
  Smartphone,
  Monitor,
  Tablet,
  Maximize2,
  Minus,
  Plus,
  Code,
  EyeOff,
  Bold,
  Italic,
  Underline
} from 'lucide-react'

export default function EditorToolbar({ 
  onSave, 
  onPreview, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onExport,
  onImport
}) {
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [deviceSize, setDeviceSize] = useState('desktop')
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(true)
  const [showGuides, setShowGuides] = useState(true)

  const handleExport = (format) => {
    if (onExport) {
      onExport(format)
    }
    setShowExportMenu(false)
  }

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 10)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 10)
    }
  }

  const handleZoomReset = () => {
    setZoom(100)
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="px-4 py-2">
        {/* الصف الأول */}
        <div className="flex items-center justify-between mb-3">
          {/* اليسار */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
              title="حفظ (Ctrl+S)"
            >
              <Save size={18} />
              <span className="hidden md:inline">حفظ</span>
            </button>
            
            <button
              onClick={onPreview}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
              title="معاينة (Ctrl+P)"
            >
              <Eye size={18} />
              <span className="hidden md:inline">معاينة</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
              title="تراجع (Ctrl+Z)"
            >
              <Undo size={18} />
            </button>
            
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
              title="إعادة (Ctrl+Y)"
            >
              <Redo size={18} />
            </button>
          </div>

          {/* الوسط */}
          <div className="flex items-center gap-4">
            {/* نمط العرض */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                className="px-3 py-1.5 rounded flex items-center gap-2 bg-white shadow-md text-blue-600"
                title="وضع التصميم"
              >
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">تصميم</span>
              </button>
              <button
                className="px-3 py-1.5 rounded flex items-center gap-2 text-gray-600 hover:text-gray-900"
                title="وضع الكود"
              >
                <Code size={16} />
                <span className="hidden sm:inline">كود</span>
              </button>
            </div>

            {/* حجم الجهاز */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDeviceSize('mobile')}
                className={`p-2 rounded ${deviceSize === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
                title="جوال (375px)"
              >
                <Smartphone size={16} />
              </button>
              <button
                onClick={() => setDeviceSize('tablet')}
                className={`p-2 rounded ${deviceSize === 'tablet' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
                title="تابلت (768px)"
              >
                <Tablet size={16} />
              </button>
              <button
                onClick={() => setDeviceSize('desktop')}
                className={`p-2 rounded ${deviceSize === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
                title="كمبيوتر (100%)"
              >
                <Monitor size={16} />
              </button>
            </div>
          </div>

          {/* اليمين */}
          <div className="flex items-center gap-2">
            {/* زر الاستيراد */}
            <button
              onClick={onImport}
              className="px-3 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              title="استيراد قالب"
            >
              <Upload size={18} />
              <span className="hidden sm:inline">استيراد</span>
            </button>
            
            {/* قائمة التصدير */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-3 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                title="تصدير القالب"
              >
                <Download size={18} />
                <span className="hidden sm:inline">تصدير</span>
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-2 py-1">اختر صيغة التصدير:</div>
                    {['JSON', 'HTML', 'Markdown'].map((format) => (
                      <button
                        key={format}
                        onClick={() => handleExport(format.toLowerCase())}
                        className="w-full text-right px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center justify-between"
                      >
                        <span>{format}</span>
                        <span className="text-xs text-gray-400">.{format.toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* الصف الثاني */}
        <div className="flex items-center justify-between">
          {/* اليسار */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 rounded ${showGrid ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title={showGrid ? "إخفاء الشبكة" : "إظهار الشبكة"}
            >
              <Grid3x3 size={16} />
            </button>
            
            <button
              onClick={() => setShowGuides(!showGuides)}
              className={`p-1.5 rounded ${showGuides ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title={showGuides ? "إخفاء خطوط الإرشاد" : "إظهار خطوط الإرشاد"}
            >
              <EyeOff size={16} />
            </button>
          </div>

          {/* الوسط */}
          <div className="flex items-center gap-4">
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
                  onChange={(e) => setZoom(parseInt(e.target.value))}
                  className="appearance-none bg-white border rounded px-3 py-1.5 text-sm pr-8 min-w-20"
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

          {/* اليمين */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded" title="عريض (Ctrl+B)">
              <Bold size={16} />
            </button>
            
            <button className="p-1.5 hover:bg-gray-100 rounded" title="مائل (Ctrl+I)">
              <Italic size={16} />
            </button>
            
            <button className="p-1.5 hover:bg-gray-100 rounded" title="تحته خط (Ctrl+U)">
              <Underline size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}