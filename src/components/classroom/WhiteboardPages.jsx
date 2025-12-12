'use client';

import { useState } from 'react';

export default function WhiteboardPages({
    pages,
    currentPage,
    onPageChange,
    onAddPage,
    onDeletePage,
    onRenamePage
}) {
    const [renamingPage, setRenamingPage] = useState(null);
    const [newPageName, setNewPageName] = useState('');

    const handleRenameStart = (pageId, currentName) => {
        setRenamingPage(pageId);
        setNewPageName(currentName);
    };

    const handleRenameSubmit = (pageId) => {
        if (newPageName.trim()) {
            onRenamePage(pageId, newPageName.trim());
        }
        setRenamingPage(null);
        setNewPageName('');
    };

    const handleKeyDown = (e, pageId) => {
        if (e.key === 'Enter') {
            handleRenameSubmit(pageId);
        } else if (e.key === 'Escape') {
            setRenamingPage(null);
            setNewPageName('');
        }
    };

    return (
        <div className="flex items-center space-x-3 space-x-reverse overflow-x-auto">
            {/* إضافة صفحة */}
            <button
                onClick={onAddPage}
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-primary-dark"
                title="إضافة صفحة جديدة"
            >
                +
            </button>

            {/* الصفحات */}
            {pages.map(page => (
                <div
                    key={page.id}
                    className={`flex-shrink-0 relative group ${currentPage === page.id ? 'ring-2 ring-primary ring-offset-2' : ''
                        }`}
                >
                    {/* زر الصفحة */}
                    <button
                        onClick={() => onPageChange(page.id)}
                        className="w-32 h-20 bg-white border rounded-lg overflow-hidden hover:shadow-md transition"
                    >
                        {/* معاينة الصفحة (محاكاة) */}
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl">📄</div>
                                {renamingPage === page.id ? (
                                    <input
                                        type="text"
                                        value={newPageName}
                                        onChange={(e) => setNewPageName(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, page.id)}
                                        onBlur={() => handleRenameSubmit(page.id)}
                                        className="w-full text-center bg-transparent border-none outline-none text-sm"
                                        autoFocus
                                    />
                                ) : (
                                    <div className="text-sm font-medium truncate px-2">
                                        {page.title}
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>

                    {/* الإجراءات */}
                    <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-1 space-x-reverse">
                            <button
                                onClick={() => handleRenameStart(page.id, page.title)}
                                className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-xs hover:bg-gray-100"
                                title="تغيير الاسم"
                            >
                                ✏️
                            </button>

                            {pages.length > 1 && (
                                <button
                                    onClick={() => onDeletePage(page.id)}
                                    className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-xs hover:bg-red-100 text-red-600"
                                    title="حذف الصفحة"
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                    </div>

                    {/* رقم الصفحة */}
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {page.id}
                    </div>
                </div>
            ))}

            {/* إحصائيات الصفحات */}
            <div className="flex-shrink-0 text-sm text-gray-600">
                <div>الصفحة {currentPage} من {pages.length}</div>
                <div className="text-xs">٪{Math.round((currentPage / pages.length) * 100)} مكتمل</div>
            </div>
        </div>
    );
}