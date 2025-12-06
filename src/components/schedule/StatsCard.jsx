export default function StatsCard({ title, value, color, icon }) {
    const getColorClasses = () => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            red: 'bg-red-100 text-red-600',
            purple: 'bg-purple-100 text-purple-600',
            indigo: 'bg-indigo-100 text-indigo-600'
        };
        return colors[color] || 'bg-gray-100 text-gray-600';
    };

    const getBorderColor = () => {
        const colors = {
            blue: 'border-blue-200',
            green: 'border-green-200',
            yellow: 'border-yellow-200',
            red: 'border-red-200',
            purple: 'border-purple-200',
            indigo: 'border-indigo-200'
        };
        return colors[color] || 'border-gray-200';
    };

    return (
        <div className={`border rounded-lg p-4 ${getBorderColor()}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${getColorClasses()}`}>
                    <span className="text-xl">{icon}</span>
                </div>
            </div>

            {/* Progress Bar (Optional) */}
            {(color === 'green' || color === 'blue') && (
                <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{value}%</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${color === 'green' ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(value, 100)}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
}