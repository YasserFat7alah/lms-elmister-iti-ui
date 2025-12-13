"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Folder, FileText, Download, Search, ArrowLeft,
  MoreVertical, Clock, Video, Link as LinkIcon, ChevronRight, BookOpen
} from "lucide-react";
import { Spinner } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMyGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";
import { useGetLessonsByGroupQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { format } from "date-fns";

const FOLDER_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-pink-100 text-pink-600",
  "bg-green-100 text-green-600",
  "bg-yellow-100 text-yellow-600",
];

export default function StudentMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.user?._id;
  const role = userInfo?.user?.role;

  const { data: groupsData, isLoading: groupsLoading } = useGetMyGroupsQuery();
  const allGroups = groupsData?.data || [];

  const myGroups = allGroups.filter(group => {
    if (role === 'admin') return true;

    if (role === 'teacher') {
      const teacherId = group.teacherId?._id || group.teacherId;
      return teacherId === userId;
    }

    if (role === 'student') {
      return group.students?.some(student => {
        const studentId = student._id || student;
        return studentId === userId;
      });
    }
    return false;
  });

  const groupFolders = myGroups.map((group, index) => ({
    id: group._id,
    courseName: group.title,
    courseCode: group.course?.title || "General",
    fileCount: group.lessonsCount || 0,
    color: FOLDER_COLORS[index % FOLDER_COLORS.length]
  }));

  const {
    data: lessonsData,
    isLoading: lessonsLoading
  } = useGetLessonsByGroupQuery(
    { groupId: selectedGroup?.id },
    { skip: !selectedGroup, refetchOnMountOrArgChange: true }
  );

  const rawLessons = lessonsData?.data?.data || [];

  const allMaterials = rawLessons.flatMap(lesson => {
    if (!lesson.materials || lesson.materials.length === 0) return [];

    return lesson.materials.map(mat => ({
      id: mat._id,
      name: mat.title,
      type: mat.type,
      url: mat.url,
      date: format(new Date(lesson.date), "dd MMM yyyy"),
      lessonTitle: lesson.title
    }));
  });

  const filteredFolders = groupFolders.filter(f =>
    f.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFiles = allMaterials.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText size={24} />;
      case 'video': return <Video size={24} />;
      case 'link': return <LinkIcon size={24} />;
      default: return <FileText size={24} />;
    }
  };

  const handleBack = () => {
    setSelectedGroup(null);
    setSearchTerm("");
  };

  if (groupsLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner size={40} /></div>
  }

  return (
    <div className="space-y-6 max-w-7xl pb-10 p-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {selectedGroup ? (
              <>
                <span className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={handleBack}>Materials</span>
                <ChevronRight size={20} className="text-gray-400" />
                <span className="text-[#FF0055]">{selectedGroup.courseName}</span>
              </>
            ) : (
              "Study Materials"
            )}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {selectedGroup ? "Browse and download course resources." : "Access your groups and learning resources."}
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            placeholder={selectedGroup ? "Search files..." : "Search groups..."}
            className="pl-10 bg-white border-gray-200 focus:ring-[#FF0055]/20 focus:border-[#FF0055]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {selectedGroup ? (

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Button variant="ghost" onClick={handleBack} className="pl-0 text-gray-500 hover:text-gray-900 hover:bg-transparent">
            <ArrowLeft size={18} className="mr-2" /> Back to Folders
          </Button>

          {lessonsLoading ? (
            <div className="text-center py-10"><Spinner className="mx-auto" /> Loading resources...</div>
          ) : filteredFiles.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 
                            ${file.type === 'video' ? 'bg-blue-50 text-blue-500' :
                          file.type === 'link' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                        {getFileIcon(file.type)}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#FF0055] transition-colors truncate">
                          {file.name}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><BookOpen size={12} /> {file.lessonTitle}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {file.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hidden sm:flex text-gray-600 hover:text-[#FF0055] hover:border-[#FF0055]"
                      >
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.type === 'link' || file.type === 'video' ? "Open Link" : "Download"} <Download size={16} className="ml-2" />
                        </a>
                      </Button>

                      <Button variant="ghost" size="icon" className="sm:hidden text-gray-400" asChild>
                        <a href={file.url} target="_blank" rel="noopener noreferrer"><Download size={18} /></a>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-gray-400">
                            <MoreVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => window.open(file.url, '_blank')}>
                            Open Resource
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
              <p className="text-gray-500">Teachers haven't added any materials to this group yet.</p>
            </div>
          )}
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredFolders.length > 0 ? (
            filteredFolders.map((folder) => (
              <Card
                key={folder.id}
                onClick={() => setSelectedGroup(folder)}
                className="cursor-pointer border-none shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${folder.color} flex items-center justify-center shadow-sm`}>
                      <Folder size={28} fill="currentColor" className="opacity-80" />
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      Open
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF0055] transition-colors mb-1 truncate">
                      {folder.courseName}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{folder.courseCode}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Click to view files</span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#FF0055] group-hover:text-white transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">You are not enrolled in any groups yet.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}