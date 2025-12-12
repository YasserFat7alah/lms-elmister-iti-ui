export default function ClassroomCard({ classroom, onJoin }) {
    const getStatusBadge = (status) => {
        const config = {
            active: { text: 'نشط', color: 'bg-green-100 text-green-800', icon: '🟢' },
            scheduled: { text: 'قادم', color: 'bg-blue-100 text-blue-800', icon: '⏰' },
            ended: { text: 'منتهي', color: 'bg-gray-100 text-gray-800', icon: '🔴' }
        };

        const { text, color, icon } = config[status] || config.ended;

        return (
            <span className={`px-3 py-1 rounded-full text-sm ${color} flex items-center`}>
                <span className="ml-1">{icon}</span>
                {text}
            </span>
        );
    };

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0) {
            return `${hours} ساعة ${mins} دقيقة`;
        }
        return `${mins} دقيقة`;
    };

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
            {/* الصورة المصغرة */}
            <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-4xl">🏫</span>
                </div>

                {/* شريط الحالة */}
                <div className="absolute top-3 left-3">
                    {getStatusBadge(classroom.status)}
                </div>

                {/* عدد الطلاب */}
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    👥 {classroom.currentStudents}/{classroom.maxStudents}
                </div>

                {/* الرمز السري */}
                {classroom.isPrivate && (
                    <div className="absolute bottom-3 right-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        🔒 {classroom.accessCode}
                    </div>
                )}
            </div>

            {/* المحتوى */}
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{classroom.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{classroom.description}</p>
                </div>

                {/* معلومات الفصل */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <span className="ml-2">👨‍🏫</span>
                        <span>{classroom.teacher}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <span className="ml-2">📚</span>
                        <span>{classroom.subject}</span>
                    </div>

                    {classroom.scheduleTime && (
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="ml-2">⏰</span>
                            <span>{formatTime(classroom.scheduleTime)}</span>
                            <span className="mx-2">•</span>
                            <span>{formatDuration(classroom.duration)}</span>
                        </div>
                    )}
                </div>

                {/* الإجراءات */}
                <div className="flex justify-between items-center pt-3 border-t">
                    <div className="text-xs text-gray-500">
                        {new Date(classroom.createdAt).toLocaleDateString('ar-EG')}
                    </div>

                    <button
                        onClick={onJoin}
                        disabled={classroom.status !== 'active'}
                        className={`px-4 py-2 rounded-lg transition ${classroom.status === 'active'
                                ? 'bg-primary text-white hover:bg-primary-dark'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {classroom.status === 'active' ? 'انضم الآن' :
                            classroom.status === 'scheduled' ? 'قادم قريباً' : 'منتهي'}
                    </button>
                </div>
            </div>
        </div>
    );
}