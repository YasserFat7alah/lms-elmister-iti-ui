'use client';

import { useState, useRef, useEffect } from 'react';
import WhiteboardCanvas from '@/components/classroom/WhiteboardCanvas';
import WhiteboardTools from '@/components/classroom/WhiteboardTools';
import WhiteboardPages from '@/components/classroom/WhiteboardPages';
import CollaborativeUsers from '@/components/classroom/CollaborativeUsers';
import SaveWhiteboardModal from '@/components/classroom/SaveWhiteboardModal';
import { useRouter } from 'next/navigation';

export default function WhiteboardPage() {
    const router = useRouter();
    const canvasRef = useRef(null);
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(3);
    const [pages, setPages] = useState([{ id: 1, title: 'الصفحة 1' }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [collaborativeUsers, setCollaborativeUsers] = useState([
        { id: 1, name: 'أحمد محمد', color: '#3B82F6' },
        { id: 2, name: 'سارة علي', color: '#10B981' },
        { id: 3, name: 'محمد خالد', color: '#8B5CF6' }
    ]);
    const [isCollaborative, setIsCollaborative] = useState(true);
    const [whiteboardData, setWhiteboardData] = useState({
        title: 'سبورة جديدة',
        subject: 'رياضيات',
        description: ''
    });

    useEffect(() => {
        // محاكاة اتصال WebSocket للتعاون
        const simulateCollaboration = () => {
            const interval = setInterval(() => {
                // محاكاة تحديثات من مستخدمين آخرين
                if (isCollaborative && Math.random() > 0.7) {
                    const randomUser = collaborativeUsers[
                        Math.floor(Math.random() * collaborativeUsers.length)
                    ];
                    console.log(`تحديث من ${randomUser.name}`);
                }
            }, 5000);

            return () => clearInterval(interval);
        };

        const cleanup = simulateCollaboration();
        return cleanup;
    }, [isCollaborative, collaborativeUsers]);

    const handleSave = async () => {
        try {
            // حفظ البيانات
            const data = {
                ...whiteboardData,
                pages: pages,
                createdAt: new Date().toISOString()
            };

            await fetch('/api/whiteboard/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            setShowSaveModal(false);
            alert('تم حفظ السبورة بنجاح!');
        } catch (error) {
            alert('حدث خطأ أثناء الحفظ');
        }
    };

    const handleExport = (format) => {
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL(`image/${format}`);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `whiteboard-${Date.now()}.${format}`;
            link.click();
        }
    };

    const addPage = () => {
        const newPageId = pages.length + 1;
        setPages([...pages, { id: newPageId, title: `الصفحة ${newPageId}` }]);
        setCurrentPage(newPageId);
    };

    const deletePage = (pageId) => {
        if (pages.length > 1) {
            const newPages = pages.filter(p => p.id !== pageId);
            setPages(newPages);
            if (currentPage === pageId) {
                setCurrentPage(newPages[0].id);
            }
        }
    };

    const inviteCollaborator = () => {
        const email = prompt('أدخل بريد المستخدم للدعوة:');
        if (email) {
            // محاكاة إرسال دعوة
            setCollaborativeUsers([
                ...collaborativeUsers,
                { id: Date.now(), name: email, color: '#F59E0B' }
            ]);
            alert(`تم إرسال دعوة إلى ${email}`);
        }
    };

    const clearCanvas = () => {
        if (confirm('هل تريد مسح السبورة بالكامل؟')) {
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* الهيدر */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                onClick={() => router.push('/classroom')}
                                className="p-2 hover:bg-gray-100 rounded-lg ml-4"
                            >
                                ← العودة
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">السبورة التفاعلية</h1>
                                <p className="text-sm text-gray-600">
                                    {isCollaborative ? `${collaborativeUsers.length} مستخدمين متصلين` : 'وضع فردي'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 space-x-reverse">
                            <button
                                onClick={() => setShowSaveModal(true)}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                            >
                                💾 حفظ
                            </button>

                            <div className="relative">
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    📤 تصدير
                                </button>
                                <div className="absolute left-0 mt-1 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block">
                                    <button onClick={() => handleExport('png')} className="block w-full px-4 py-2 hover:bg-gray-100">
                                        PNG
                                    </button>
                                    <button onClick={() => handleExport('jpg')} className="block w-full px-4 py-2 hover:bg-gray-100">
                                        JPG
                                    </button>
                                    <button onClick={() => handleExport('pdf')} className="block w-full px-4 py-2 hover:bg-gray-100">
                                        PDF
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={inviteCollaborator}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                👥 دعوة
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* المحتوى الرئيسي */}
            <div className="flex-1 flex overflow-hidden">
                {/* أدوات الرسم */}
                <div className="w-16 bg-white border-r shadow-sm flex flex-col items-center py-4">
                    <WhiteboardTools
                        tool={tool}
                        color={color}
                        brushSize={brushSize}
                        onToolChange={setTool}
                        onColorChange={setColor}
                        onBrushSizeChange={setBrushSize}
                        onClear={clearCanvas}
                    />
                </div>

                {/* السبورة */}
                <div className="flex-1 flex flex-col">
                    {/* شريط الصفحات */}
                    <div className="bg-white border-b px-4 py-2">
                        <WhiteboardPages
                            pages={pages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            onAddPage={addPage}
                            onDeletePage={deletePage}
                            onRenamePage={(pageId, newTitle) => {
                                setPages(pages.map(p =>
                                    p.id === pageId ? { ...p, title: newTitle } : p
                                ));
                            }}
                        />
                    </div>

                    {/* لوحة الرسم */}
                    <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto p-4">
                        <WhiteboardCanvas
                            ref={canvasRef}
                            tool={tool}
                            color={color}
                            brushSize={brushSize}
                            collaborativeUsers={collaborativeUsers}
                            isCollaborative={isCollaborative}
                        />
                    </div>

                    {/* حالة التعاون */}
                    <div className="bg-white border-t px-4 py-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={isCollaborative}
                                            onChange={(e) => setIsCollaborative(e.target.checked)}
                                        />
                                        <div className={`block w-10 h-6 rounded-full ${isCollaborative ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isCollaborative ? 'transform translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="mr-3 text-sm">وضع التعاون</span>
                                </label>
                            </div>

                            <div className="text-sm text-gray-600">
                                <span>آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* المستخدمين المتعاونين */}
                <div className="w-64 bg-white border-l shadow-sm">
                    <CollaborativeUsers
                        users={collaborativeUsers}
                        currentUser={{ id: 0, name: 'أنت', color: '#EF4444' }}
                        onRemoveUser={(userId) => {
                            setCollaborativeUsers(users => users.filter(u => u.id !== userId));
                        }}
                    />
                </div>
            </div>

            {/* مودال الحفظ */}
            {showSaveModal && (
                <SaveWhiteboardModal
                    data={whiteboardData}
                    onDataChange={setWhiteboardData}
                    onSave={handleSave}
                    onClose={() => setShowSaveModal(false)}
                />
            )}
        </div>
    );
}