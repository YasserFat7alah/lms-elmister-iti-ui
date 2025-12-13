import React from 'react';

const GenericStatsCard = ({ icon: Icon, title, value, color = "bg-blue-600", iconColor = "text-white" }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-600 mb-2 whitespace-nowrap">{title}</p>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <div className={`p-2.5 rounded-lg ${color}`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericStatsCard;
