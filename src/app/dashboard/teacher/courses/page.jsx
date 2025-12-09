"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { 
  Plus, Search, Edit3, Trash2, BookOpen, Users, Calendar, Filter, CheckCircle2, Loader2, Eye
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";
import { useGetCoursesQuery, useDeleteCourseMutation } from "@/redux/api/endPoints/coursesApiSlice";
import { toast } from "react-hot-toast";
import CourseDetailsModal from "@/components/teacherCreateCourse/courseDetailsModal";

const StatusBadge = ({ status }) => {
  const styles = {
    published: "bg-green-100 text-green-700 border-green-200",
    "in-review": "bg-blue-100 text-blue-700 border-blue-200",
    draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
    archived: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const labels = {
    published: "Published",
    "in-review": "In Review",
    draft: "Draft",
    archived: "Archived",
  };
  
  const normalizedStatus = status === 'inReview' ? 'in-review' : status;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[normalizedStatus] || styles.draft}`}>
      {labels[normalizedStatus] || status}
    </span>
  );
};

export default function MyCoursesPage() {
  const { userInfo } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState("all"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null); // State للمودال

  const queryParams = userInfo?._id ? { teacherId: userInfo._id } : {};

  const { data: coursesResponse, isLoading, refetch } = useGetCoursesQuery(queryParams, {
    refetchOnMountOrArgChange: true 
  });
  
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const courses = coursesResponse?.data || coursesResponse?.courses || [];

  const filteredCourses = courses.filter((course) => {
    const status = course.status === 'inReview' ? 'in-review' : course.status;
    const matchesTab = activeTab === "all" ? true : status === activeTab;
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete/archive this course?")) {
      try {
        await deleteCourse(id).unwrap();
        toast.success("Course processed successfully");
        refetch(); 
      } catch (err) {
        toast.error("Failed to process request");
      }
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <div className="p-6 min-h-screen bg-gray-50/50 space-y-6">
      
      <CourseDetailsModal 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
        course={selectedCourse} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your curriculum, track status, and update content.</p>
        </div>
        <Link href="/dashboard/teacher/createCourse">
          <Button className="bg-[#FF4667] hover:bg-[#ff2e53] text-white gap-2">
            <Plus size={18} /> Create New Course
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
           <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><BookOpen size={24}/></div>
           <div>
             <p className="text-gray-500 text-xs font-bold uppercase">Total Courses</p>
             <h3 className="text-2xl font-bold">{courses.length}</h3>
           </div>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
           <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 size={24}/></div>
           <div>
             <p className="text-gray-500 text-xs font-bold uppercase">Published</p>
             <h3 className="text-2xl font-bold">{courses.filter(c => c.status === 'published').length}</h3>
           </div>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
           <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users size={24}/></div>
           <div>
             <p className="text-gray-500 text-xs font-bold uppercase">Total Students</p>
             <h3 className="text-2xl font-bold">
               {courses.reduce((acc, curr) => acc + (curr.totalStudents || 0), 0)}
             </h3>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {['all', 'published', 'in-review', 'draft', 'archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-4">Course Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Grade / Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50/80 transition">
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 rounded-lg overflow-hidden bg-gray-200 shrink-0 border border-gray-100">
                          {course.thumbnail?.url ? (
                            <img src={course.thumbnail.url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400"><BookOpen size={16}/></div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1 max-w-[200px]">{course.title}</p>
                          <p className="text-xs text-gray-400">{course.language || course.courseLanguage}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={course.status} />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-gray-400" />
                        <span className="font-semibold text-gray-700">{course.totalStudents || 0}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                        <p className="text-gray-900 font-medium">{course.subject}</p>
                        <p className="text-xs text-gray-500">{course.gradeLevel}</p>
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : "-"}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        <button 
                          onClick={() => setSelectedCourse(course)}
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition" 
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <Link href={`/dashboard/teacher/courses/${course._id}/edit`}>
                          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                            <Edit3 size={18} />
                          </button>
                        </Link>

                        {(course.status === 'draft' || course.status === 'archived' || course.status === 'in-review' || course.status === 'inReview') ? (
                          <button 
                            onClick={() => handleDelete(course._id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition" 
                            title="Archive / Delete"
                            disabled={isDeleting}
                          >
                            {isDeleting ? <Loader2 className="animate-spin" size={18}/> : <Trash2 size={18} />}
                          </button>
                        ) : (
                           <button disabled className="p-2 text-gray-200 cursor-not-allowed" title="Cannot delete published course">
                            <Trash2 size={18} />
                           </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="bg-gray-100 p-4 rounded-full mb-3">
                        <Filter size={32} />
                      </div>
                      <p className="font-semibold">No courses found</p>
                      <p className="text-sm">Try changing filters or create a new one.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}