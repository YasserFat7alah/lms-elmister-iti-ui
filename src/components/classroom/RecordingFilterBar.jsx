'use client';

export default function RecordingFilterBar({ filter, onFilterChange, searchTerm, onSearchChange }) {
    const filters = [
        { id: 'all', label: 'الكل', icon: '📋' },
        { id: 'recent', label: 'الأحدث', icon: '🕒' },
        { id: 'popular', label: 'الأكثر مشاهدة', icon: '👁️' },
        { id: 'mine', label: 'تسجيلاتي', icon: '⭐' },
        { id: 'long', label: 'الأطول', icon: '⏱️' },
        { id: 'short', label: 'الأقصر', icon: '⚡' }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* البحث */}
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ابحث في التسجيلات..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                </div>

                {/* الفلاتر */}
                <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                        {filters.map(filterItem => (
                            <button
                                key={filterItem.id}
                                onClick={() => onFilterChange(filterItem.id)}
                                className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition ${filter === filterItem.id
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="ml-1.5">{filterItem.icon}</span>
                                {filterItem.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* خيارات التصفية المتقدمة */}
                <div className="flex space-x-3 space-x-reverse">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">جميع المواد</option>
                        <option value="math">رياضيات</option>
                        <option value="science">علوم</option>
                        <option value="arabic">لغة عربية</option>
                        <option value="english">لغة إنجليزية</option>
                    </select>

                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">كل التواريخ</option>
                        <option value="week">أسبوع</option>
                        <option value="month">شهر</option>
                        <option value="year">سنة</option>
                    </select>
                </div>
            </div>

            {/* خيارات إضافية */}
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                <label className="flex items-center text-sm">
                    <input type="checkbox" className="ml-2" />
                    <span>تشمل التسجيلات مع الترجمات</span>
                </label>

                <label className="flex items-center text-sm">
                    <input type="checkbox" className="ml-2" defaultChecked />
                    <span>تشمل التسجيلات مع الصوت</span>
                </label>

                <label className="flex items-center text-sm">
                    <input type="checkbox" className="ml-2" />
                    <span>فقط التسجيلات عالية الجودة</span>
                </label>
            </div>

            {/* إحصائيات سريعة */}
            <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">24</div>
                        <div className="text-xs text-gray-600">تسجيل هذا الشهر</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-green-600">156</div>
                        <div className="text-xs text-gray-600">إجمالي المشاهدات</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">45</div>
                        <div className="text-xs text-gray-600">ساعة مشاهدة</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">3.2</div>
                        <div className="text-xs text-gray-600">جيجابايت محجوزة</div>
                    </div>
                </div>
            </div>
        </div>
    );
}