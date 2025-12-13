'use client'
import Link from 'next/link'

const RecentCourses = ({ courses }) => {
  const mappedCourses = courses?.map(c => ({
    id: c._id,
    name: c.title,
    category: c.subject,
    duration: 'N/A',
    enrolled: c.totalStudents || 0,
    progress: 0,
    status: c.status.charAt(0).toUpperCase() + c.status.slice(1)
  })) || [];

  const displayCourses = mappedCourses.length > 0 ? mappedCourses : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-gray-200';
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Recently Created Courses</h3>
        <Link
          href="/dashboard/teacher/courses"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <span>→</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-2 text-gray-600 font-semibold text-sm">Course Name</th>
              <th className="text-left py-4 px-2 text-gray-600 font-semibold text-sm">Category</th>
              <th className="text-left py-4 px-2 text-gray-600 font-semibold text-sm">Duration</th>
              <th className="text-left py-4 px-2 text-gray-600 font-semibold text-sm">Enrolled</th>
              <th className="text-left py-4 px-2 text-gray-600 font-semibold text-sm">Progress</th>
              <th className="text-left py-4 px-2 text-gray-600 font-semibold text-sm">Status</th>
              <th className="text-left py-4 px-2 text-gray-600 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayCourses.map((course) => (
              <tr
                key={course.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-2">
                  <div className="max-w-xs">
                    <p className="text-sm font-medium text-gray-800 truncate" title={course.name}>
                      {course.name}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-600">{course.category}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm font-medium text-gray-800">{course.enrolled}</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8">{course.progress}%</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                      title="Edit Course"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                      title="Delete Course"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800 p-1 rounded transition-colors"
                      title="View Analytics"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
          <span className="font-medium">12</span> courses
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentCourses;