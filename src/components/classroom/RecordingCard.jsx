export default function RecordingCard({ recording, onPlay, onDelete, onDownload, onShare }) {
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours} ساعة ${minutes} دقيقة`;
        }
        return `${minutes} دقيقة`;
    };

    const formatSize = (bytes) => {
        const mb = bytes / 1024 / 1024;
        if (mb < 1024) {
            return `${mb.toFixed(1)} MB`;
        }
        return `${(mb / 1024).toFixed(1)} GB`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getSubjectColor = (subject) => {
        const colors = {
            'رياضيات': 'bg-blue-100 text-blue-800',
            'علوم': 'bg-green-100 text-green-800',
            'لغة عربية': 'bg-yellow-100 text-yellow-800',
            'لغة إنجليزية': 'bg-red-100 text-red-800',
            'فيزياء': 'bg-purple-100 text-purple-800',
            'كيمياء': 'bg-pink-100 text-pink-800',
            'أحياء': 'bg-indigo-100 text-indigo-800',
            'تاريخ': 'bg-orange-100 text-orange-800'
        };
        return colors[subject] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
            {/* الصورة المصغرة */}
            <div className="relative h-48 bg-gradient-to-r from-gray-900 to-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={onPlay}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition group"
                    >
                        <span className="text-3xl text-white">▶️</span>
                    </button>
                </div>

                {/* البطاقات العلوية */}
                <div className="absolute top-3 left-3 flex space-x-2 space-x-reverse">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getSubjectColor(recording.subject)}`}>
                        {recording.subject}
                    </span>
                    {recording.isMine && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                            خاص بي
                        </span>
                    )}
                </div>

                {/* معلومات التصوير */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {formatDuration(recording.duration)}
                </div>

                {/* المشاهدات */}
                <div className="absolute bottom-3 left-3 flex items-center bg-black/70 text-white px-2 py-1 rounded text-sm">
                    <span className="ml-1">👁️</span>
                    <span>{recording.views}</span>
                </div>
            </div>

            {/* المحتوى */}
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{recording.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{recording.description}</p>
                </div>

                {/* معلومات التسجيل */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <span className="ml-2">👨‍🏫</span>
                        <span>{recording.teacher}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <span className="ml-2">📅</span>
                        <span>{formatDate(recording.date)}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <span className="ml-2">💾</span>
                        <span>{formatSize(recording.size)}</span>
                    </div>
                </div>

                {/* الإجراءات */}
                <div className="flex justify-between items-center pt-3 border-t">
                    <div className="flex space-x-2 space-x-reverse">
                        <button
                            onClick={onPlay}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="تشغيل"
                        >
                            ▶️
                        </button>

                        <button
                            onClick={onDownload}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="تحميل"
                        >
                            ⬇️
                        </button>

                        <button
                            onClick={onShare}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="مشاركة"
                        >
                            📤
                        </button>
                    </div>

                    <div className="flex space-x-2 space-x-reverse">
                        {recording.isMine && (
                            <button
                                onClick={onDelete}
                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                                title="حذف"
                            >
                                🗑️
                            </button>
                        )}

                        <div className="text-xs text-gray-500">
                            منذ {recording.age} يوم
                        </div>
                    </div>
                </div>

                {/* شريط التقدم (اختياري) */}
                <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>التقدم</span>
                        <span>45%</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: '45%' }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}