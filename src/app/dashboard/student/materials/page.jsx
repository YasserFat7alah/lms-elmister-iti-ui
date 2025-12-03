"use client";
import React, { useState } from "react";
import { 
  Folder, FileText, Download, Search, ArrowLeft, 
  MoreVertical, Clock, HardDrive, ChevronRight 
} from "lucide-react";
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

const MATERIALS_DATA = [
  {
    id: "m1",
    courseName: "Mathematics 101",
    courseCode: "MATH101",
    color: "bg-blue-100 text-blue-600",
    files: [
      { id: "f1", name: "Chapter 1: Linear Equations.pdf", size: "2.4 MB", date: "10 Oct 2024", type: "pdf" },
      { id: "f2", name: "Lecture 2 Notes.pdf", size: "1.1 MB", date: "12 Oct 2024", type: "pdf" },
      { id: "f3", name: "Calculus Cheat Sheet.pdf", size: "500 KB", date: "15 Oct 2024", type: "pdf" },
    ]
  },
  {
    id: "m2",
    courseName: "Physics: Mechanics",
    courseCode: "PHY202",
    color: "bg-purple-100 text-purple-600",
    files: [
      { id: "f4", name: "Newton's Laws Summary.pdf", size: "3.2 MB", date: "05 Nov 2024", type: "pdf" },
      { id: "f5", name: "Lab Report Template.docx", size: "150 KB", date: "08 Nov 2024", type: "doc" },
    ]
  },
  {
    id: "m3",
    courseName: "Introduction to CS",
    courseCode: "CS50",
    color: "bg-orange-100 text-orange-600",
    files: [
      { id: "f6", name: "Algorithm Basics.pdf", size: "4.5 MB", date: "01 Dec 2024", type: "pdf" },
      { id: "f7", name: "Python Setup Guide.pdf", size: "1.2 MB", date: "02 Dec 2024", type: "pdf" },
      { id: "f8", name: "Final Project Requirements.pdf", size: "800 KB", date: "10 Dec 2024", type: "pdf" },
      { id: "f9", name: "Data Structures Chart.png", size: "2.1 MB", date: "11 Dec 2024", type: "img" },
    ]
  },
  {
    id: "m4",
    courseName: "English Literature",
    courseCode: "ENG101",
    color: "bg-pink-100 text-pink-600",
    files: [] 
  },
];

export default function StudentMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null); 

  const filteredItems = selectedFolder 
    ? selectedFolder.files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : MATERIALS_DATA.filter(m => m.courseName.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleBack = () => {
    setSelectedFolder(null);
    setSearchTerm("");
  };

  return (
    <div className="space-y-6 max-w-7xl  pb-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
             {selectedFolder ? (
                <>
                  <span className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={handleBack}>Materials</span>
                  <ChevronRight size={20} className="text-gray-400" />
                  <span className="text-[#FF0055]">{selectedFolder.courseName}</span>
                </>
             ) : (
                "Study Materials"
             )}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {selectedFolder ? "Browse and download course resources." : "Access course files, notes, and resources."}
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input 
            placeholder={selectedFolder ? "Search files..." : "Search courses..."}
            className="pl-10 bg-white border-gray-200 focus:ring-[#FF0055]/20 focus:border-[#FF0055]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {selectedFolder ? (
        
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Button variant="ghost" onClick={handleBack} className="pl-0 text-gray-500 hover:text-gray-900 hover:bg-transparent">
             <ArrowLeft size={18} className="mr-2" /> Back to Folders
          </Button>

          {filteredItems.length > 0 ? (
             <div className="grid grid-cols-1 gap-3">
                {filteredItems.map((file) => (
                  <Card key={file.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                           <FileText size={24} />
                        </div>
                        <div>
                           <h3 className="font-semibold text-gray-900 group-hover:text-[#FF0055] transition-colors">
                              {file.name}
                           </h3>
                           <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                              <span className="flex items-center gap-1"><HardDrive size={12}/> {file.size}</span>
                              <span className="flex items-center gap-1"><Clock size={12}/> {file.date}</span>
                           </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="hidden sm:flex text-gray-600 hover:text-[#FF0055] hover:border-[#FF0055]">
                           <Download size={16} className="mr-2" /> Download
                        </Button>
                        <Button variant="ghost" size="icon" className="sm:hidden text-gray-400">
                           <Download size={18} />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400">
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Report Issue</DropdownMenuItem>
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
               <h3 className="text-lg font-medium text-gray-900">No files found</h3>
               <p className="text-gray-500">This folder is empty or no files match your search.</p>
            </div>
          )}
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
           {filteredItems.map((folder) => (
             <Card 
                key={folder.id} 
                onClick={() => setSelectedFolder(folder)}
                className="cursor-pointer border-none shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-white"
             >
               <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${folder.color} flex items-center justify-center shadow-sm`}>
                       <Folder size={28} fill="currentColor" className="opacity-80" />
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                       {folder.files.length} Files
                    </Badge>
                 </div>
                 
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF0055] transition-colors mb-1">
                       {folder.courseName}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{folder.courseCode}</p>
                 </div>

                 <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Last updated recently</span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#FF0055] group-hover:text-white transition-colors">
                       <ChevronRight size={16} />
                    </div>
                 </div>
               </CardContent>
             </Card>
           ))}

           {filteredItems.length === 0 && (
             <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No courses found matching "{searchTerm}"</p>
             </div>
           )}
        </div>
      )}

    </div>
  );
}