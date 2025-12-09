"use client";
import React from "react";
import Link from "next/link";
import { 
  X, BookOpen, Users, Calendar, Clock, DollarSign, 
  BarChart, PlayCircle, GraduationCap, Globe, Layers, MapPin, Link as LinkIcon, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CourseDetailsModal = ({ isOpen, onClose, course }) => {
  if (!isOpen || !course) return null;

  // --- Logic Helpers ---
  const getPriceDisplay = () => {
    if (!course.groups || course.groups.length === 0) return "No Groups";
    const prices = course.groups.map(g => g.price || 0);
    if (prices.length === 0) return "Free";
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) return minPrice === 0 ? "Free" : `${minPrice} EGP`;
    return `${minPrice} - ${maxPrice} EGP`;
  };

  const videoUrl = course.video?.url;

  // --- UI Components ---
  const Badge = ({ children, colorClass }) => (
    <span className={`px-2.5 py-0.5 rounded-md text-[11px] uppercase font-bold tracking-wide border ${colorClass}`}>
      {children}
    </span>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 transition-all duration-300">
      
      {/* Modal Container */}
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-gray-100"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
             <div className="bg-[#FF4667]/10 p-2 rounded-lg text-[#FF4667]">
                <BookOpen size={20} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Course Preview</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-[#FF4667] hover:bg-[#FF4667]/5 p-2 rounded-full transition-all duration-200"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar bg-gray-50/50">
          
          {/* Section 1: Hero (Dark Theme for Cinematic Feel) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 bg-slate-900 text-white">
            
            {/* Video Player */}
            <div className="lg:col-span-3 bg-black flex items-center justify-center min-h-[320px] relative group overflow-hidden">
              {videoUrl ? (
                <video 
                  controls 
                  className="w-full h-full object-contain max-h-[400px]"
                  poster={course.thumbnail?.url}
                  src={videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative w-full h-full min-h-[320px]">
                  {course.thumbnail?.url ? (
                     <img 
                       src={course.thumbnail.url} 
                       alt={course.title} 
                       className="w-full h-full object-cover opacity-60"
                     />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-600 bg-slate-900">
                      <BookOpen size={64} opacity={0.5}/>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                     <PlayCircle size={56} className="text-white/80 mb-3 drop-shadow-lg" />
                     <p className="text-sm text-slate-300 font-medium">No Preview Video Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Stats */}
            <div className="lg:col-span-2 p-6 flex flex-col justify-center bg-slate-800 border-l border-slate-700">
               <div>
                 <div className="flex gap-2 mb-4">
                    {course.status === 'published' && <Badge colorClass="bg-green-500/10 text-green-400 border-green-500/20">Published</Badge>}
                    {course.status === 'draft' && <Badge colorClass="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Draft</Badge>}
                    {course.status === 'in-review' && <Badge colorClass="bg-blue-500/10 text-blue-400 border-blue-500/20">In Review</Badge>}
                 </div>

                 <h1 className="text-2xl font-bold leading-tight mb-2 text-white">{course.title}</h1>
                 <p className="text-slate-400 text-sm line-clamp-2">{course.subTitle || "No subtitle added"}</p>
                 
                 {/* Price Box */}
                 <div className="flex items-center gap-3 mt-6 bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                    <div className="bg-[#FF4667] p-2 rounded-lg text-white shadow-lg shadow-[#FF4667]/20">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <span className="text-white font-bold text-xl block leading-none">{getPriceDisplay()}</span>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Per Group / Batch</span>
                    </div>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-700">
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-xs uppercase font-bold mb-1 flex items-center gap-1"><Layers size={12}/> Batches</span>
                    <span className="font-semibold text-white">{course.groups?.length || 0} Groups</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-xs uppercase font-bold mb-1 flex items-center gap-1"><GraduationCap size={12}/> Grade</span>
                    <span className="font-semibold text-white">{course.gradeLevel || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-xs uppercase font-bold mb-1 flex items-center gap-1"><Globe size={12}/> Language</span>
                    <span className="font-semibold text-white">{course.courseLanguage}</span>
                  </div>
                   <div className="flex flex-col">
                    <span className="text-slate-500 text-xs uppercase font-bold mb-1 flex items-center gap-1"><Calendar size={12}/> Created</span>
                    <span className="font-semibold text-white">{course.createdAt ? new Date(course.createdAt).toLocaleDateString() : "-"}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-8 bg-white">
            
            {/* Section 2: Description */}
            <div className="flex gap-4">
               <div className="hidden sm:block p-3 h-fit bg-gray-50 rounded-xl text-gray-400">
                  <AlertCircle size={24} />
               </div>
               <div className="flex-1">
                 <h3 className="text-base font-bold text-gray-900 mb-2">About this Course</h3>
                 <p className="text-gray-600 leading-7 text-sm whitespace-pre-line">
                   {course.description || <span className="text-gray-400 italic">No description provided for this course yet.</span>}
                 </p>
                 
                 {/* Tags */}
                 {course.tags && course.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                       {course.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium border border-gray-200">
                             #{tag}
                          </span>
                       ))}
                    </div>
                 )}
               </div>
            </div>

            {/* Section 3: Groups Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Users size={18} className="text-[#FF4667]"/> Active Batches (Groups)
                </h3>
              </div>
              
              <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/80 text-gray-500 font-semibold uppercase text-[11px] tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-3">Group Details</th>
                      <th className="px-5 py-3">Type & Capacity</th>
                      <th className="px-5 py-3">Schedule</th>
                      <th className="px-5 py-3 text-right">Pricing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {course.groups && course.groups.length > 0 ? (
                      course.groups.map((group, index) => (
                        <tr key={index} className="hover:bg-red-50/30 transition-colors group">
                          
                          {/* Title & Location */}
                          <td className="px-5 py-4 align-top">
                            <div className="font-bold text-gray-900 mb-1">{group.title}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1.5">
                               {group.type === 'online' ? (
                                  <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded"><LinkIcon size={10}/> Online Link</span>
                               ) : (
                                  <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded"><MapPin size={10}/> {group.location || "Center"}</span>
                               )}
                            </div>
                          </td>

                          {/* Type Badge & Capacity */}
                          <td className="px-5 py-4 align-top">
                             <div className="flex flex-col gap-2">
                                <span className={`w-fit text-[10px] px-2 py-0.5 rounded uppercase font-bold border ${
                                    group.type === 'online' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                }`}>
                                    {group.type}
                                </span>
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                   <Users size={12}/>
                                   <span className="font-medium">{group.students?.length || 0}</span>
                                   <span className="text-gray-300">/</span>
                                   <span>{group.capacity} Max</span>
                                </div>
                             </div>
                          </td>

                          {/* Schedule */}
                          <td className="px-5 py-4 align-top">
                            {group.schedule && group.schedule.length > 0 ? (
                              <div className="space-y-1.5">
                                {group.schedule.map((slot, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF4667]"></div>
                                    <span className="font-medium text-gray-700 capitalize w-16">{slot.day}</span>
                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono text-[10px]">{slot.time}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                               <span className="text-gray-400 italic text-xs">No schedule set</span>
                            )}
                          </td>

                          {/* Price */}
                          <td className="px-5 py-4 align-top text-right">
                             <span className="font-bold text-gray-900 text-base block">{group.price} <span className="text-xs font-normal text-gray-500">EGP</span></span>
                             {group.startingDate && (
                               <span className="text-[10px] text-gray-400 block mt-1">
                                 Start: {new Date(group.startingDate).toLocaleDateString()}
                               </span>
                             )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-5 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-gray-50 p-3 rounded-full mb-2">
                              <Layers size={24} className="text-gray-300"/>
                            </div>
                            <p className="text-gray-500 font-medium text-sm">No batches created yet.</p>
                            <p className="text-gray-400 text-xs">Add groups in the edit page.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="text-xs text-gray-400 hidden sm:block">
            Last updated: {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : "Just now"}
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none border-gray-200 hover:bg-white hover:text-gray-900">
              Close Preview
            </Button>
            <Link href={`/dashboard/teacher/courses/${course._id}/edit`} className="flex-1 sm:flex-none">
              <Button className="w-full bg-[#FF4667] hover:bg-[#ff2e53] text-white shadow-md shadow-[#FF4667]/20 border-none">
                 Edit Course & Groups
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetailsModal;