'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ClassroomHeader from '@/components/classroom/ClassroomHeader';
import ParticipantsPanel from '@/components/classroom/ParticipantsPanel';
import ChatPanel from '@/components/classroom/ChatPanel';
import WhiteboardPanel from '@/components/classroom/WhiteboardPanel';
import MediaControls from '@/components/classroom/MediaControls';

import { useClassroom } from '@/hooks/useClassrooms';

export default function ClassroomDetailPage() {
    const params = useParams();
    const router = useRouter();
    const classId = params.classId;

    const videoRef = useRef(null);
    const [isTeacher, setIsTeacher] = useState(false);
    const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
    const [isWhiteboardFullscreen, setIsWhiteboardFullscreen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [isParticipantsOpen, setIsParticipantsOpen] = useState(true);
    const [mediaState, setMediaState] = useState({
        video: true,
        audio: true,
        screen: false
    });

    // ✅ إضافة: حالات لتتبع مواقع اللوحات العائمة
    const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
    const [participantsPosition, setParticipantsPosition] = useState({ x: 0, y: 0 });
    const [isChatDragging, setIsChatDragging] = useState(false);
    const [isParticipantsDragging, setIsParticipantsDragging] = useState(false);

    const { classroom, isLoading, error } = useClassroom(classId);

    useEffect(() => {
        // ✅ إضافة: تحميل المواقع المحفوظة
        const savedChatPos = localStorage.getItem('chatPosition');
        const savedParticipantsPos = localStorage.getItem('participantsPosition');

        if (savedChatPos) setChatPosition(JSON.parse(savedChatPos));
        if (savedParticipantsPos) setParticipantsPosition(JSON.parse(savedParticipantsPos));

        // محاكاة اتصال WebRTC
        initializeMedia();

        // تحديث حالة الاتصال كل 30 ثانية
        const interval = setInterval(() => {
            updateConnectionStatus();
        }, 30000);

        return () => {
            clearInterval(interval);
            cleanupMedia();
        };
    }, [classId]);

    // ✅ إضافة: حفظ المواقع عند التغيير
    useEffect(() => {
        localStorage.setItem('chatPosition', JSON.stringify(chatPosition));
    }, [chatPosition]);

    useEffect(() => {
        localStorage.setItem('participantsPosition', JSON.stringify(participantsPosition));
    }, [participantsPosition]);

    const initializeMedia = async () => {
        try {
            // طلب إذن الكاميرا والميكروفون
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Error accessing media devices:', err);
            alert('يجب السماح بالكاميرا والميكروفون لدخول الفصل');
        }
    };

    const cleanupMedia = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    };

    const updateConnectionStatus = async () => {
        // تحديث حالة الاتصال
        await fetch(`/api/classroom/${classId}/ping`, {
            method: 'POST'
        });
    };

    const toggleMedia = (type) => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject;
            const track = stream.getTracks().find(t => t.kind === type);
            if (track) {
                track.enabled = !track.enabled;
                setMediaState(prev => ({ ...prev, [type]: track.enabled }));
            }
        }
    };

    const shareScreen = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });

            // إضافة شاشة العرض للفيديو
            // (في تطبيق حقيقي، ستحتاج لإدارة متعددة streams)
            setMediaState(prev => ({ ...prev, screen: true }));
        } catch (err) {
            console.error('Error sharing screen:', err);
        }
    };

    const leaveClassroom = async () => {
        if (confirm('هل تريد مغادرة الفصل؟')) {
            try {
                await fetch(`/api/classroom/${classId}/leave`, {
                    method: 'POST'
                });

                cleanupMedia();
                router.push('/classroom');
            } catch (err) {
                console.error('Error leaving classroom:', err);
            }
        }
    };

    // ✅ إضافة: دوال السحب للوحات
    const handleChatMouseDown = (e) => {
        e.preventDefault();
        setIsChatDragging(true);
    };

    const handleParticipantsMouseDown = (e) => {
        e.preventDefault();
        setIsParticipantsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (isChatDragging) {
            setChatPosition({
                x: e.clientX - 150, // تعديل للنصف عرض اللوحة
                y: e.clientY - 50   // تعديل لنصف ارتفاع اللوحة
            });
        }
        if (isParticipantsDragging) {
            setParticipantsPosition({
                x: e.clientX - 150,
                y: e.clientY - 50
            });
        }
    };

    const handleMouseUp = () => {
        setIsChatDragging(false);
        setIsParticipantsDragging(false);
    };

    // ✅ إضافة: إرفاع event listeners للسحب
    useEffect(() => {
        if (isChatDragging || isParticipantsDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isChatDragging, isParticipantsDragging]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <div className="text-5xl mb-4">❌</div>
                <h1 className="text-2xl font-bold text-red-600 mb-2">حدث خطأ</h1>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={() => router.push('/classroom')}
                    className="px-6 py-2 bg-primary text-white rounded-lg"
                >
                    العودة للفصول
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-gray-900">
            {/* الهيدر */}
            <ClassroomHeader
                classroom={classroom}
                isTeacher={isTeacher}
                onLeave={leaveClassroom}
            />

            {/* ✅ إضافة: أزرار التحكم العائمة للوحات */}
            <div className="absolute top-20 left-4 z-20 flex flex-col gap-2">
                <button
                    onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                    className={`p-3 rounded-full shadow-lg ${isParticipantsOpen
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'}`}
                    title={isParticipantsOpen ? 'إغلاق المشاركين' : 'فتح المشاركين'}
                >
                    👥
                </button>

                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`p-3 rounded-full shadow-lg ${isChatOpen
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'}`}
                    title={isChatOpen ? 'إغلاق الدردشة' : 'فتح الدردشة'}
                >
                    💬
                </button>

                <button
                    onClick={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
                    className={`p-3 rounded-full shadow-lg ${isWhiteboardOpen
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'}`}
                    title={isWhiteboardOpen ? 'إغلاق السبورة' : 'فتح السبورة'}
                >
                    📝
                </button>
            </div>

            {/* المحتوى الرئيسي */}
            <div className="flex-1 flex overflow-hidden">
                {/* اللوحة الرئيسية - الفيديو والسبورة */}
                <div className="flex-1 flex flex-col">
                    {/* الفيديو */}
                    <div className={`flex-1 relative bg-black ${isWhiteboardOpen ? 'h-1/2' : 'h-full'}`}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                        />

                        {/* حالة المستخدم */}
                        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded">
                            <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${mediaState.video ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span>أنت</span>
                            </div>
                        </div>


                    </div>

                    {/* السبورة (اختياري) */}
                    {isWhiteboardOpen && !isWhiteboardFullscreen && (
                        <div
                            className="h-full border-t border-gray-700 cursor-pointer hover:opacity-90 transition"
                            onClick={() => setIsWhiteboardFullscreen(true)}
                            title="اضغط لتكبير السبورة"
                        >
                            <WhiteboardPanel classroomId={classId} />
                        </div>
                    )}
                </div>

                {/* ✅ تعديل: اللوحات الجانبية تصبح عائمة بدلاً من ثابتة */}
                {/* المشاركون العائم */}
                {isParticipantsOpen && (
                    <div
                        className={`absolute w-80 h-3/4 bg-gray-800 rounded-lg shadow-2xl z-50 border border-gray-700 overflow-hidden ${isParticipantsDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        style={{
                            left: `${participantsPosition.x}px`,
                            top: `${participantsPosition.y}px`,
                            transition: isParticipantsDragging ? 'none' : 'all 0.3s ease'
                        }}
                        onMouseDown={handleParticipantsMouseDown}
                    >
                        <div className="flex justify-between items-center p-3 bg-gray-900 border-b border-gray-700 cursor-move">
                            <h3 className="font-semibold text-white">المشاركون</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-1 hover:bg-gray-700 rounded text-white"
                                    onClick={() => setIsParticipantsOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <ParticipantsPanel
                            isOpen={true}
                            onToggle={() => setIsParticipantsOpen(false)}
                            participants={classroom?.participants || []}
                            isTeacher={isTeacher}
                        />
                    </div>
                )}

                {/* الدردشة العائمة */}
                {isChatOpen && (
                    <div
                        className={`absolute w-96 h-2/3 bg-gray-800 rounded-lg shadow-2xl z-50 border border-gray-700 overflow-hidden ${isChatDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        style={{
                            left: `${chatPosition.x}px`,
                            top: `${chatPosition.y}px`,
                            transition: isChatDragging ? 'none' : 'all 0.3s ease'
                        }}
                        onMouseDown={handleChatMouseDown}
                    >
                        <div className="flex justify-between items-center p-3 bg-gray-900 border-b border-gray-700 cursor-move">
                            <h3 className="font-semibold text-white">الدردشة</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-1 hover:bg-gray-700 rounded text-white"
                                    onClick={() => setIsChatOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <ChatPanel
                            isOpen={true}
                            onToggle={() => setIsChatOpen(false)}
                            classroomId={classId}
                        />
                    </div>
                )}
            </div>

            {/* السبورة بحجم كامل */}
            {isWhiteboardFullscreen && (
                <div className="fixed inset-0 bg-gray-900 z-[100] flex flex-col">
                    {/* هيدر السبورة */}
                    <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center space-x-3 space-x-reverse">
                            <span className="text-white text-lg font-semibold">📝 السبورة التفاعلية</span>
                            <span className="text-gray-400 text-sm">{classroom?.title}</span>
                        </div>
                        <button
                            onClick={() => setIsWhiteboardFullscreen(false)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center space-x-2 space-x-reverse"
                        >
                            <span>✕</span>
                            <span>إغلاق</span>
                        </button>
                    </div>

                    {/* محتوى السبورة */}
                    <div className="flex-1 overflow-hidden">
                        <WhiteboardPanel classroomId={classId} />
                    </div>
                </div>
            )}

            {/* عناصر التحكم */}
            <MediaControls
                mediaState={mediaState}
                onToggleVideo={() => toggleMedia('video')}
                onToggleAudio={() => toggleMedia('audio')}
                onShareScreen={shareScreen}
                onToggleWhiteboard={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
                onLeave={leaveClassroom}
                isTeacher={isTeacher}
                onEndClass={() => {
                    if (confirm('هل تريد إنهاء الفصل للجميع؟')) {
                        // إنهاء الفصل
                        router.push('/classroom');
                    }
                }}
            />

            {/* ✅ إضافة: أنماط للسحب */}
            <style jsx>{`
                .cursor-grab { cursor: grab; }
                .cursor-grabbing { cursor: grabbing; }
                .cursor-move { cursor: move; }
                
                .shadow-2xl {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                
                .glass-effect {
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
            `}</style>
        </div>
    );
}