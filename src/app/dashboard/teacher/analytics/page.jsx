'use client'
import StatsCards from '@/components/DashboardComponents/teacher/StatsCards'
import RecentCourses from '@/components/DashboardComponents/teacher/RecentCourses'
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Earnings Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Earnings by Year</h3>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            <p className="text-gray-500">سيتم تنفيذ الرسم البياني هنا</p>
          </div>
        </div>
        
        <RecentCourses />
      </div>
    </div>
  )
}