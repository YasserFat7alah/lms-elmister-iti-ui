'use client'

import { useState } from 'react'
import {
  Save, 
  Eye, 
  Download, 
  Undo, 
  Redo, 
  Settings,
  Upload
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
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 10)
    }
  }

  const handleExport = (format) => {
    onExport(format)
    setShowExportMenu(false)
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="px-4 py-2">
        {/* First row */}
        <div className="flex items-center justify-between mb-3">
          {/* Left side */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
              title="Save (Ctrl+S)"
            >
              <Save size={18} />
              <span className="hidden md:inline">Save</span>
            </button>
            
            <button
              onClick={onPreview}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
              title="Preview (Ctrl+P)"
            >
              <Eye size={18} />
              <span className="hidden md:inline">Preview</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo size={18} />
            </button>
            
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo size={18} />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Import button */}
            <button
              onClick={onImport}
              className="px-3 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              title="Import template"
            >
              <Upload size={18} />
              <span className="hidden sm:inline">Import</span>
            </button>
            
            {/* Export menu */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-3 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                title="Export template"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-2 py-1">Choose export format:</div>
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
      </div>
    </div>
  )
}