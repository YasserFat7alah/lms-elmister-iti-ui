'use client';

import { useState } from 'react';

export default function WhiteboardTools({
    tool,
    color,
    brushSize,
    onToolChange,
    onColorChange,
    onBrushSizeChange,
    onClear
}) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showBrushSizes, setShowBrushSizes] = useState(false);

    const tools = [
        { id: 'pen', label: 'قلم', icon: '✏️' },
        { id: 'line', label: 'خط', icon: '📏' },
        { id: 'rectangle', label: 'مستطيل', icon: '⬜' },
        { id: 'circle', label: 'دائرة', icon: '⭕' },
        { id: 'text', label: 'نص', icon: '📝' },
        { id: 'arrow', label: 'سهم', icon: '➡️' },
        { id: 'highlight', label: 'تظليل', icon: '🖍️' },
        { id: 'eraser', label: 'ممحاة', icon: '🧽' },
        { id: 'select', label: 'تحديد', icon: '👆' }
    ];

    const colors = [
        '#000000', '#FF3B30', '#4CD964', '#007AFF',
        '#5856D6', '#FF9500', '#FFCC00', '#8E8E93',
        '#EFEFF4', '#C7C7CC', '#5AC8FA', '#34C759'
    ];

    const brushSizes = [
        { size: 1, label: 'رفيع' },
        { size: 3, label: 'متوسط' },
        { size: 5, label: 'عريض' },
        { size: 10, label: 'سميك' },
        { size: 20, label: 'ثقيل' }
    ];

    return (
        <div className="flex flex-col items-center space-y-6">
            {/* الأدوات */}
            <div className="space-y-2">
                {tools.map(t => (
                    <button
                        key={t.id}
                        onClick={() => onToolChange(t.id)}
                        className={`p-3 rounded-lg transition-all ${tool === t.id
                                ? 'bg-primary text-white shadow-lg transform scale-105'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                        title={t.label}
                    >
                        <span className="text-xl">{t.icon}</span>
                    </button>
                ))}
            </div>

            {/* الفاصل */}
            <div className="w-8 border-t border-gray-300"></div>

            {/* الألوان */}
            <div className="relative">
                <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200"
                    title="اختيار اللون"
                >
                    <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                    ></div>
                </button>

                {showColorPicker && (
                    <div className="absolute right-full top-0 mr-2 bg-white shadow-xl rounded-lg p-3 z-10">
                        <div className="grid grid-cols-4 gap-2">
                            {colors.map(c => (
                                <button
                                    key={c}
                                    onClick={() => {
                                        onColorChange(c);
                                        setShowColorPicker(false);
                                    }}
                                    className={`w-8 h-8 rounded-full border ${color === c ? 'border-2 border-gray-800' : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: c }}
                                    title={c}
                                />
                            ))}
                        </div>

                        <div className="mt-3">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => onColorChange(e.target.value)}
                                className="w-full cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* حجم الفرشاة */}
            <div className="relative">
                <button
                    onClick={() => setShowBrushSizes(!showBrushSizes)}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200"
                    title="حجم الفرشاة"
                >
                    <div className="text-center">
                        <div
                            className="mx-auto rounded-full bg-gray-800"
                            style={{ width: brushSize * 2, height: brushSize * 2 }}
                        ></div>
                        <div className="text-xs mt-1">{brushSize}px</div>
                    </div>
                </button>

                {showBrushSizes && (
                    <div className="absolute right-full top-0 mr-2 bg-white shadow-xl rounded-lg p-3 z-10 w-48">
                        <div className="space-y-3">
                            {brushSizes.map(brush => (
                                <button
                                    key={brush.size}
                                    onClick={() => {
                                        onBrushSizeChange(brush.size);
                                        setShowBrushSizes(false);
                                    }}
                                    className={`flex items-center justify-between w-full p-2 rounded ${brushSize === brush.size ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className="rounded-full bg-gray-800 ml-3"
                                            style={{ width: brush.size * 2, height: brush.size * 2 }}
                                        ></div>
                                        <span>{brush.label}</span>
                                    </div>
                                    <span className="text-gray-600">{brush.size}px</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-3 pt-3 border-t">
                            <input
                                type="range"
                                min="1"
                                max="30"
                                value={brushSize}
                                onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* الفاصل */}
            <div className="w-8 border-t border-gray-300"></div>

            {/* أدوات إضافية */}
            <div className="space-y-2">
                <button
                    onClick={onClear}
                    className="p-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                    title="مسح الكل"
                >
                    🗑️
                </button>

                <button
                    onClick={() => {
                        // تراجع
                        console.log('Undo');
                    }}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200"
                    title="تراجع"
                >
                    ↩️
                </button>

                <button
                    onClick={() => {
                        // إعادة
                        console.log('Redo');
                    }}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200"
                    title="إعادة"
                >
                    ↪️
                </button>

                <button
                    onClick={() => {
                        // طباعة
                        window.print();
                    }}
                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200"
                    title="طباعة"
                >
                    🖨️
                </button>
            </div>

            {/* الفاصل */}
            <div className="w-8 border-t border-gray-300"></div>

            {/* شاشة كاملة */}
            <button
                onClick={() => {
                    const elem = document.documentElement;
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    }
                }}
                className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200"
                title="شاشة كاملة"
            >
                ⛶
            </button>
        </div>
    );
}