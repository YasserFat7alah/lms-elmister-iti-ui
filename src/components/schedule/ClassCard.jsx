export default function ClassCard({ classData, onStartClass }) {
    const getStatusColor = (status) => {
        const colors = {
            completed: 'bg-green-100 text-green-800',
            upcoming: 'bg-blue-100 text-blue-800',
            scheduled: 'bg-yellow-100 text-yellow-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            completed: 'Completed',
            upcoming: 'Upcoming',
            scheduled: 'Scheduled',
            cancelled: 'Cancelled'
        };
        return texts[status] || status;
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{classData.subject}</h3>
                    <p className="text-gray-600 text-sm">{classData.grade}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(classData.status)}`}>
                    {getStatusText(classData.status)}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                    <span className="mr-2">📅</span>
                    <span>{classData.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <span className="mr-2">⏰</span>
                    <span>{classData.startTime} - {classData.endTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <span className="mr-2">👨‍🏫</span>
                    <span>{classData.teacher}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <span className="mr-2">👥</span>
                    <span>{classData.studentsCount} Students</span>
                </div>
            </div>

            {classData.status === 'upcoming' && (
                <button
                    onClick={() => onStartClass(classData.id)}
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
                >
                    Start Class
                </button>
            )}
        </div>
    );
}