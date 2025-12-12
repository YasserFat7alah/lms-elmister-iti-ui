'use client';

import { useState } from 'react';

export default function SaveWhiteboardModal({ data, onDataChange, onSave, onClose }) {
    const [format, setFormat] = useState('png');
    const [quality, setQuality] = useState('high');
    const [includeAnnotations, setIncludeAnnotations] = useState(true);
    const [includeBackground, setIncludeBackground] = useState(true);

    const formats = [
        { id: 'png', label: 'PNG', description: 'جودة عالية مع خلفية شفافة' },
        { id: 'jpg', label: 'JPG', description: 'حجم أصمع مع خلفية بيضاء' },
        { id: 'pdf', label: 'PDF', description: 'متعدد الصفحات مع نص قابل للبحث' },
        { id: 'svg', label: 'SVG', description: 'مخطط متجهي قابل للتعديل' }
    ];

    const qualities = [
        { id: 'low', label: 'منخفضة', size: '~500KB' },
        { id: 'medium', label: 'متوسطة', size: '~1MB' },
        { id: 'high', label: 'عالية', size: '~2MB' },
        { id: 'max', label: 'أعلى', size: '~5MB' }
    ];

    const handleSave = () => {
        const saveData = {
            ...data,
            format,
            quality,
            includeAnnotations,
            includeBackground,
            savedAt: new Date().toISOString()
        };

        onSave(saveData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* الهيدر */}
                <div className="border-b px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">حفظ السبورة</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* المحتوى */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="space-y-6">
                        {/* معلومات الحفظ */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                اسم السبورة *
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => onDataChange({ ...data, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="مثال: شرح الدرس الأول - رياضيات"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                الوصف
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => onDataChange({ ...data, description: e.target.value })}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="وصف مختصر للسبورة..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                المادة
                            </label>
                            <select
                                value={data.subject}
                                onChange={(e) => onDataChange({ ...data, subject: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">اختر المادة</option>
                                <option value="math">رياضيات</option>
                                <option value="science">علوم</option>
                                <option value="arabic">لغة عربية</option>
                                <option value="english">لغة إنجليزية</option>
                            </select>
                        </div>

                        {/* تنسيق الحفظ */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">تنسيق الحفظ</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {formats.map(fmt => (
                                    <button
                                        key={fmt.id}
                                        onClick={() => setFormat(fmt.id)}
                                        className={`p-4 border rounded-lg text-left transition ${format === fmt.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="font-medium mb-1">{fmt.label}</div>
                                        <div className="text-sm text-gray-600">{fmt.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* جودة الصورة */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">جودة الصورة</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {qualities.map(q => (
                                    <button
                                        key={q.id}
                                        onClick={() => setQuality(q.id)}
                                        className={`p-3 border rounded-lg text-center transition ${quality === q.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="font-medium">{q.label}</div>
                                        <div className="text-xs text-gray-500 mt-1">{q.size}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* خيارات إضافية */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">خيارات إضافية</h3>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={includeAnnotations}
                                    onChange={(e) => setIncludeAnnotations(e.target.checked)}
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="mr-2 text-gray-700">تضمين التعليقات والملاحظات</span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={includeBackground}
                                    onChange={(e) => setIncludeBackground(e.target.checked)}
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="mr-2 text-gray-700">تضمين خلفية السبورة</span>
                            </label>
                        </div>

                        {/* معاينة الحجم */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-700 mb-2">معلومات الحفظ:</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-gray-600">التنسيق:</div>
                                    <div className="font-medium">{formats.find(f => f.id === format)?.label}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600">الجودة:</div>
                                    <div className="font-medium">{qualities.find(q => q.id === quality)?.label}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600">الحجم المقدر:</div>
                                    <div className="font-medium">{qualities.find(q => q.id === quality)?.size}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600">وقت الحفظ:</div>
                                    <div className="font-medium">~3 ثواني</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* الأزرار */}
                <div className="border-t px-6 py-4">
                    <div className="flex justify-end space-x-3 space-x-reverse">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            إلغاء
                        </button>

                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                            💾 حفظ السبورة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}