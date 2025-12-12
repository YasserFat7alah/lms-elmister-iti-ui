'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClassroomHeader({ classroom, isTeacher, onLeave }) {
    const router = useRouter();
    const [time, setTime] = useState(new Date());
    const [recording, setRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let recordingTimer;
        if (recording) {
            recordingTimer = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }

        return () => {
            if (recordingTimer) clearInterval(recordingTimer);
        };
    }, [recording]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleRecording = () => {
        if (recording) {
            if (confirm('هل تريد إيقاف التسجيل؟')) {
                setRecording(false);
                // حفظ التسجيل
                console.log('Recording saved:', recordingTime);
            }
        } else {
            setRecording(true);
            setRecordingTime(0);
        }
    };

    const copyInviteLink = () => {
        const inviteLink = `${window.location.origin}/classroom/invite/${classroom.id}`;
        navigator.clipboard.writeText(inviteLink);
        alert('تم نسخ رابط الدعوة!');
    };

    const shareClassroom = async () => {
        const shareData = {
            title: classroom.title,
            text: `انضم لي في فصل ${classroom.subject}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                copyInviteLink();
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };

    return (
        <header className="bg-gray-900 text-white border-b border-gray-700">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* معلومات الفصل */}
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <button
                            onClick={() => router.push('/classroom')}
                            className="p-2 hover:bg-gray-800 rounded-lg"
                            title="العودة للفصول"
                        >
                            ←
                        </button>

                        <div>
                            <h1 className="text-lg font-bold">{classroom.title}</h1>
                            <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-300">
                                <span>👨‍🏫 {classroom.teacher}</span>
                                <span>📚 {classroom.subject}</span>
                                <span className="flex items-center">
                                    <span className={`w-2 h-2 rounded-full mr-2 ${classroom.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                    {classroom.status === 'active' ? 'نشط' : 'قادم'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* الوقت والتسجيل */}
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-center">
                            <div className="text-sm text-gray-300">الوقت الحالي</div>
                            <div className="font-mono text-lg">{time.toLocaleTimeString('ar-EG')}</div>
                        </div>

                        {isTeacher && (
                            <button
                                onClick={toggleRecording}
                                className={`flex items-center px-4 py-2 rounded-lg transition ${recording
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                            >
                                <span className="mr-2">●</span>
                                {recording ? `تسجيل ${formatTime(recordingTime)}` : 'بدء التسجيل'}
                            </button>
                        )}
                    </div>

                    {/* الإجراءات */}
                    <div className="flex items-center space-x-3 space-x-reverse">
                        <button
                            onClick={shareClassroom}
                            className="p-2 hover:bg-gray-800 rounded-lg"
                            title="مشاركة الفصل"
                        >
                            📤
                        </button>

                        <button
                            onClick={copyInviteLink}
                            className="p-2 hover:bg-gray-800 rounded-lg"
                            title="نسخ الرابط"
                        >
                            🔗
                        </button>

                        <div className="relative group">
                            <button className="p-2 hover:bg-gray-800 rounded-lg">
                                ⚙️
                            </button>
                            <div className="absolute left-0 mt-2 bg-gray-800 rounded-lg shadow-lg py-2 w-48 hidden group-hover:block z-10">
                                <button className="block w-full px-4 py-2 text-right hover:bg-gray-700">
                                    إعدادات الصوت
                                </button>
                                <button className="block w-full px-4 py-2 text-right hover:bg-gray-700">
                                    إعدادات الفيديو
                                </button>
                                <button className="block w-full px-4 py-2 text-right hover:bg-gray-700">
                                    جودة البث
                                </button>
                                {isTeacher && (
                                    <button className="block w-full px-4 py-2 text-right hover:bg-gray-700">
                                        إدارة الصلاحيات
                                    </button>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={onLeave}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                        >
                            مغادرة
                        </button>
                    </div>
                </div>

                {/* شريط التقدم */}
                <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>مدة الفصل: {classroom.duration} دقيقة</span>
                        <span>الطلاب المتصلين: {classroom.activeStudents || 0}/{classroom.maxStudents}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(classroom.currentStudents / classroom.maxStudents) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </header>
    );
}