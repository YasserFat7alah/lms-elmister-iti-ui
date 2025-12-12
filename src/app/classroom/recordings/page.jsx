'use client';

import { useState, useEffect } from 'react';
import RecordingCard from '@/components/classroom/RecordingCard';
import FilterBar from '@/components/classroom/RecordingFilterBar';
import { useRecordings } from '@/hooks/useRecordings';

export default function RecordingsPage() {
    const { recordings, isLoading, refetch } = useRecordings();
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRecording, setSelectedRecording] = useState(null);

    const filteredRecordings = recordings.filter(recording => {
        // التصفية حسب النوع
        if (filter !== 'all') {
            if (filter === 'recent' && recording.age > 7) return false;
            if (filter === 'popular' && recording.views < 100) return false;
            if (filter === 'mine' && !recording.isMine) return false;
        }

        // البحث
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                recording.title.toLowerCase().includes(term) ||
                recording.subject.toLowerCase().includes(term) ||
                recording.teacher.toLowerCase().includes(term)
            );
        }

        return true;
    });

    const handleDeleteRecording = async (recordingId) => {
        if (confirm('هل تريد حذف هذا التسجيل؟')) {
            try {
                await fetch(`/api/classroom/recordings/${recordingId}`, {
                    method: 'DELETE'
                });
                refetch();
                alert('تم الحذف بنجاح');
            } catch (error) {
                alert('حدث خطأ أثناء الحذف');
            }
        }
    };

    const handleDownloadRecording = async (recordingId, format = 'mp4') => {
        try {
            const response = await fetch(`/api/classroom/recordings/${recordingId}/download?format=${format}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `recording-${recordingId}.${format}`;
            a.click();
        } catch (error) {
            alert('حدث خطأ أثناء التحميل');
        }
    };

    const handleShareRecording = async (recordingId) => {
        const shareUrl = `${window.location.origin}/classroom/recordings/${recordingId}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'تسجيل فصل دراسي',
                    text: 'شاهد هذا التسجيل التعليمي',
                    url: shareUrl
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // نسخ الرابط
            navigator.clipboard.writeText(shareUrl);
            alert('تم نسخ الرابط!');
        }
    };

    const stats = {
        total: recordings.length,
        totalDuration: recordings.reduce((sum, r) => sum + r.duration, 0),
        totalSize: recordings.reduce((sum, r) => sum + r.size, 0),
        totalViews: recordings.reduce((sum, r) => sum + r.views, 0)
    };

    return (
        <div className="container mx-auto p-4">
            {/* الهيدر */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">تسجيلات الفصول</h1>
                <p className="text-gray-600">
                    شاهد واستمع لتسجيلات الفصول السابقة في أي وقت
                </p>
            </div>

            {/* الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full ml-3">
                            <span className="text-blue-600 text-xl">🎥</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">إجمالي التسجيلات</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-full ml-3">
                            <span className="text-green-600 text-xl">⏱️</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">إجمالي المدة</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {Math.floor(stats.totalDuration / 3600)} ساعة
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="bg-yellow-100 p-3 rounded-full ml-3">
                            <span className="text-yellow-600 text-xl">👁️</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">إجمالي المشاهدات</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalViews}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-full ml-3">
                            <span className="text-purple-600 text-xl">💾</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">إجمالي الحجم</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {(stats.totalSize / 1024 / 1024).toFixed(1)} GB
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* شريط التحكم */}
            <FilterBar
                filter={filter}
                onFilterChange={setFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {/* قائمة التسجيلات */}
            <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        التسجيلات ({filteredRecordings.length})
                    </h2>
                    <div className="text-sm text-gray-600">
                        مرتبة حسب: <select className="border-none bg-transparent">
                            <option>الأحدث</option>
                            <option>الأكثر مشاهدة</option>
                            <option>الأطول مدة</option>
                        </select>
                    </div>
                </div>

                {filteredRecordings.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-6xl mb-4">🎥</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">لا توجد تسجيلات</h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'جرب بحثاً مختلفاً' : 'سيظهر هنا تسجيلات الفصول بعد انتهائها'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecordings.map(recording => (
                            <RecordingCard
                                key={recording.id}
                                recording={recording}
                                onPlay={() => setSelectedRecording(recording)}
                                onDelete={() => handleDeleteRecording(recording.id)}
                                onDownload={() => handleDownloadRecording(recording.id)}
                                onShare={() => handleShareRecording(recording.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* مشغل الفيديو المدمج */}
            {selectedRecording && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="bg-black w-full max-w-4xl rounded-lg overflow-hidden">
                        <div className="relative pt-[56.25%]">
                            <video
                                controls
                                autoPlay
                                className="absolute inset-0 w-full h-full"
                                src={selectedRecording.videoUrl}
                            >
                                <track
                                    kind="subtitles"
                                    src={selectedRecording.subtitlesUrl}
                                    srcLang="ar"
                                    label="العربية"
                                    default
                                />
                            </video>
                        </div>

                        <div className="p-4 bg-gray-900 text-white">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold">{selectedRecording.title}</h3>
                                <button
                                    onClick={() => setSelectedRecording(null)}
                                    className="text-2xl hover:text-gray-300"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-gray-300">{selectedRecording.description}</p>
                            <div className="flex gap-4 mt-3 text-sm text-gray-400">
                                <span>👨‍🏫 {selectedRecording.teacher}</span>
                                <span>📅 {selectedRecording.date}</span>
                                <span>⏱️ {Math.floor(selectedRecording.duration / 60)} دقيقة</span>
                                <span>👁️ {selectedRecording.views} مشاهدة</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* نصائح */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">معلومات مهمة:</h3>
                <ul className="space-y-1 text-blue-700">
                    <li>• التسجيلات متاحة لمدة 30 يوماً بعد انتهاء الفصل</li>
                    <li>• يمكنك تحميل التسجيلات بصيغة MP4 أو MP3</li>
                    <li>• التسجيلات تشمل الفيديو والصوت والسبورة التفاعلية</li>
                    <li>• يمكنك مشاركة التسجيلات مع الطلاب الآخرين</li>
                </ul>
            </div>
        </div>
    );
}