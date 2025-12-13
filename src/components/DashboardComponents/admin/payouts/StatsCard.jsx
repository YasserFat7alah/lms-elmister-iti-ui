import React from 'react'

const StatsCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md transition-shadow">
        <div className="flex  flex-col">
          <p className="text-sm font-medium text-gray-600 mb-1 whitespace-nowrap">{title}</p>
          <div className='flex items-center justify-between'>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <div className={`p-2 rounded-lg ${color}`}>
                  <Icon className="w-4 h-4 text-white" />
              </div>
          </div>
        </div>
  </div>
  )
}

export default StatsCard;
