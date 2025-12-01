'use client'

const StatsCards = () => {
  const stats = [
    { 
      title: 'Enrolled Courses', 
      value: '13', 
      bgColor: 'bg-blue-500',
      icon: '📚'
    },
    { 
      title: 'Total Students', 
      value: '17', 
      bgColor: 'bg-green-500',
      icon: '👥'
    },
    { 
      title: 'Active Courses', 
      value: '08', 
      bgColor: 'bg-purple-500',
      icon: '🟢'
    },
    { 
      title: 'Total Courses', 
      value: '11', 
      bgColor: 'bg-orange-500',
      icon: '📊'
    },
    { 
      title: 'Completed Courses', 
      value: '06', 
      bgColor: 'bg-red-500',
      icon: '✅'
    },
    { 
      title: 'Total Earnings', 
      value: '$486', 
      bgColor: 'bg-teal-500',
      icon: '💰'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center text-white shadow-md`}>
              <span className="text-lg">{stat.icon}</span>
            </div>
          </div>
          
          {/* Progress Bar Indicator */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`${stat.bgColor} h-1.5 rounded-full`}
                style={{ width: `${Math.random() * 70 + 30}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;