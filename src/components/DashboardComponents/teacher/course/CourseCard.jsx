import { ChevronUp, ChevronDown, Users, Clock, Calendar, Eye, Trash2, BookOpen, Award, Edit3, ArrowBigDown } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import Link from "next/link";



const CourseCard = ({ course, onDelete, onViewDetails, isDeleting }) => {

  const [expanded, setExpanded] = useState(false);
  const groups = course.groups || [];
  
  // Calculate total students from groups (to match existing logic)
  const totalGroupStudents = groups.reduce((sum, g) => sum + (g.students?.length || g.studentsCount || 0), 0);
  
  // Get course status, normalizing 'inReview' to 'in-review'
  const normalizedStatus = course.status === 'inReview' ? 'in-review' : course.status;

  // Function to format the schedule array
  const formatSchedule = (schedule) => {
    if (!schedule || schedule.length === 0) return "No Schedule";
    const days = schedule.map(s => s.day).join(', ');
    const time = schedule[0].time; // Assuming time is consistent across days in a group
    return `${days.toUpperCase()} @ ${time}`;
  };

  // Determine if the delete action is allowed based on status
  const canDelete = ['draft', 'archived', 'in-review', 'inReview'].includes(normalizedStatus);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Course Header */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Thumbnail & Info Container */}
          <div className="flex flex-1 gap-5">
            {/* Thumbnail */}
            <div className="h-24 w-32 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
              {course.thumbnail?.url ? (
                <img src={course.thumbnail.url} alt={`Thumbnail for ${course.title}`} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 p-2">
                  <BookOpen size={24} />
                  <span className="text-xs mt-1">No Image</span>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-extrabold text-gray-900 truncate">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{course.subTitle || `Language: ${course.courseLanguage}`}</p>
                </div>
                <StatusBadge status={normalizedStatus} />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Group Students</p>
                    <p className="font-bold text-gray-900">{totalGroupStudents}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Grade Level</p>
                    <p className="font-bold text-gray-900">{course.gradeLevel || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-teal-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Subject</p>
                    <p className="font-bold text-gray-900">{course.subject || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Date Created</p>
                    <p className="font-bold text-gray-900">
                      {course.createdAt ? new Date(course.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons (Simplified Icon-Only Style) */}
          <div className="flex items-center justify-end gap-2 ml-auto mt-4 md:mt-0 pt-4 border-t md:border-t-0">
            {/* 1. View Details Button */}
            <button
              onClick={onViewDetails}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              title="View Details"
            >
              <Eye size={18} />
            </button>

            {/* 2. Edit Course Button */}
            <Link href={`/dashboard/teacher/courses/${course._id}/edit`}>
                <button 
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                title="Edit Course" 
                >
                    {/* Using the correctly imported Lucide icon: Edit3 */}
                    <Edit3 size={18} /> 
                </button>
            </Link>

            {/* 3. Delete/Archive Button */}
            {canDelete ? (
              <button
                onClick={onDelete}
                className={`p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition ${isDeleting ? 'opacity-50 cursor-wait' : ''}`}
                title="Archive / Delete"
                disabled={isDeleting}
              >
                {/* Assuming Spinner component is available */}
                {isDeleting ? <div className="animate-spin h-4 w-4 border-2 border-t-white border-red-500 rounded-full"></div> : <Trash2 size={18} />}
              </button>
            ) : (
              <button disabled className="p-2 text-gray-300 cursor-not-allowed" title="Cannot delete published course">
                <Trash2 size={18} />
              </button>
            )}
            
            {/* Groups Toggle Button - Moved to the bottom of the card content area */}
          </div>
        </div>
        
        {/* Groups Toggle Button (Placed at the bottom for separation from main actions) */}
        {groups.length > 0 && (
            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition"
                    title={expanded ? "Hide Groups" : "Show Groups"}
                >
                    {expanded ? 'Hide Groups' : `View ${groups.length} Groups`}
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>
        )}

      </div>

      {/* Groups Section (Unchanged, retains full group information display) */}
      {expanded && groups.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-5">
          <h4 className="text-md font-extrabold text-gray-800 mb-4 flex items-center gap-2">
            <Users size={18} className="text-gray-500" />
            Active Groups ({groups.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => {
              const groupStudentsCount = group.students?.length || group.studentsCount || 0;
              const isFull = groupStudentsCount >= group.capacity;
              const GroupIcon = group.type === 'online' ? Clock : group.type === 'offline' ? Calendar : CheckCircle2;
              
              return (
                <div key={group._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-bold text-gray-900 text-base truncate">{group.name || group.title || 'Untitled Group'}</h5>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 ${isFull ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'}`}>
                      {groupStudentsCount} / {group.capacity}
                    </span>
                  </div>
                  
                  {group.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{group.description}</p>
                  )}
                  
                  <div className="space-y-1 mt-3 pt-3 border-t border-gray-100 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <GroupIcon size={14} className="text-blue-500 shrink-0" />
                      <span className="font-semibold capitalize">{group.type} Group</span>
                    </div>
                    
                    {group.schedule && group.schedule.length > 0 && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={14} className="text-teal-500 shrink-0" />
                        <span className="text-xs sm:text-sm">{formatSchedule(group.schedule)}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-orange-500 shrink-0" />
                      <span className="text-xs sm:text-sm">Starts: {new Date(group.startingDate || group.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    
                    {group.location && group.type !== 'online' && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Eye size={14} className="text-pink-500 shrink-0" />
                        <span className="text-xs sm:text-sm truncate" title={group.location}>{group.location}</span>
                      </div>
                    )}
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard
