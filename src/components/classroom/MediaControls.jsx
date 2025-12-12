'use client';

import { useState } from 'react';

export default function MediaControls({
    mediaState,
    onToggleVideo,
    onToggleAudio,
    onShareScreen,
    onToggleWhiteboard,
    onLeave,
    isTeacher,
    onEndClass
}) {
    const [showMoreControls, setShowMoreControls] = useState(false);
    const [recording, setRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const toggleRecording = () => {
        setRecording(!recording);
        if (!recording) {
            setRecordingTime(0);
            const interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            // تنظيف المؤقت عند التوقف
            setTimeout(() => {
                if (!recording) clearInterval(interval);
            }, 1000);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const controls = [
        {
            id: 'video',
            label: mediaState.video ? 'إيقاف الفيديو' : 'تشغيل الفيديو',
            icon: mediaState.video ? '📹' : '📹❌',
            color: mediaState.video ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600',
            action: onToggleVideo
        },
        {
            id: 'audio',
            label: mediaState.audio ? 'كتم الصوت' : 'تشغيل الصوت',
            icon: mediaState.audio ? '🎤' : '🎤❌',
            color: mediaState.audio ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600',
            action: onToggleAudio
        },
        {
            id: 'screen',
            label: mediaState.screen ? 'إيقاف المشاركة' : 'مشاركة الشاشة',
            icon: mediaState.screen ? '🖥️●' : '🖥️',
            color: mediaState.screen ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600',
            action: onShareScreen
        },
        {
            id: 'whiteboard',
            label: 'السبورة',
            icon: '📝',
            color: 'bg-yellow-600 hover:bg-yellow-700',
            action: onToggleWhiteboard
        },
        {
            id: 'record',
            label: recording ? `تسجيل ${formatTime(recordingTime)}` : 'بدء التسجيل',
            icon: recording ? '🔴' : '⚫',
            color: recording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600',
            action: toggleRecording
        },
        {
            id: 'more',
            label: 'المزيد',
            icon: '⋯',
            color: 'bg-gray-700 hover:bg-gray-600',
            action: () => setShowMoreControls(!showMoreControls)
        }
    ];

    return (
        <div className="bg-gray-900 text-white border-t border-gray-700">
            {/* التحكمات الرئيسية */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col items-center space-y-4">
                    {/* شريط التحكم */}
                    <div className="flex items-center justify-center space-x-4 space-x-reverse">
                        {controls.map(control => (
                            <button
                                key={control.id}
                                onClick={control.action}
                                className={`flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all ${control.color} ${control.id === 'more' ? 'relative' : ''
                                    }`}
                                title={control.label}
                            >
                                <span className="text-2xl mb-1">{control.icon}</span>
                                <span className="text-xs">{control.label.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>

                    {/* أزرار الإجراءات */}
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <button
                            onClick={onLeave}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition flex items-center"
                        >
                            <span className="ml-2">👋</span>
                            مغادرة الفصل
                        </button>

                        {isTeacher && (
                            <button
                                onClick={onEndClass}
                                className="px-6 py-2 bg-red-800 hover:bg-red-900 rounded-lg transition flex items-center"
                            >
                                <span className="ml-2">⏹️</span>
                                إنهاء الفصل للجميع
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* التحكمات الإضافية */}
            {showMoreControls && (
                <div className="border-t border-gray-700 bg-gray-800 p-4">
                    <div className="container mx-auto">
                        <h4 className="text-sm font-semibold mb-3">إعدادات إضافية</h4>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400">جودة الفيديو</label>
                                <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                                    <option>منخفضة (480p)</option>
                                    <option selected>متوسطة (720p)</option>
                                    <option>عالية (1080p)</option>
                                    <option>عالية جداً (4K)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-gray-400">جودة الصوت</label>
                                <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                                    <option>منخفضة</option>
                                    <option selected>متوسطة</option>
                                    <option>عالية</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-gray-400">مستوى الصوت</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    defaultValue="80"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-gray-400">معدل الإطارات</label>
                                <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                                    <option>24 إطار/ثانية</option>
                                    <option selected>30 إطار/ثانية</option>
                                    <option>60 إطار/ثانية</option>
                                </select>
                            </div>
                        </div>

                        {/* إعدادات متقدمة */}
                        <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="space-x-4 space-x-reverse">
                                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                                        اختبار الصوت
                                    </button>
                                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                                        اختبار الفيديو
                                    </button>
                                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                                        إعدادات الشبكة
                                    </button>
                                </div>

                                <button
                                    onClick={() => setShowMoreControls(false)}
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* حالة الاتصال */}
            <div className="border-t border-gray-700 px-4 py-2">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-gray-300">متصل</span>
                            </div>
                            <div className="text-gray-400">
                                زمن الاستجابة: <span className="text-green-400">45ms</span>
                            </div>
                            <div className="text-gray-400">
                                سرعة التحميل: <span className="text-blue-400">2.4 Mbps</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="text-gray-400">
                                {new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-xs px-2 py-1 bg-gray-700 rounded">
                                {navigator.connection?.effectiveType || '4G'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}