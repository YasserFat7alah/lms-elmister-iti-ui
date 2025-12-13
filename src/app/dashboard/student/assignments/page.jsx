"use client";
import React, { useState } from "react";
import { 
  FileText, Calendar, CheckCircle2, Clock, 
  AlertCircle, Search, ChevronRight, PlayCircle, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { STUDENT_ASSIGNMENTS } from "@/data/STUDENT_ASSIGNMENTS";

export default function StudentAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todo");

  const filteredAssignments = STUDENT_ASSIGNMENTS.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = false;
    if (activeTab === "todo") {
      matchesTab = assignment.status === "pending" || assignment.status === "overdue";
      matchesTab = assignment.status === "submitted" || assignment.status === "graded";
    }

    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending": return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">Pending</Badge>;
      case "submitted": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">Submitted</Badge>;
      case "graded": return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Graded</Badge>;
      case "overdue": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Overdue</Badge>;
      default: return null;
    }
  };

  const getActionBtn = (assignment) => {
    if (assignment.status === "pending") {
      return (
        <Button className="bg-[#FF0055] hover:bg-pink-700 text-white w-full sm:w-auto">
           {assignment.type === 'quiz' ? <><PlayCircle size={16} className="mr-2"/> Start Quiz</> : <><FileText size={16} className="mr-2"/> Submit Now</>}
        </Button>
      );
    } 
    if (assignment.status === "submitted") {
      return (
        <Button variant="outline" className="text-gray-600 w-full sm:w-auto">
           <Eye size={16} className="mr-2"/> View Submission
        </Button>
      );
    }
    if (assignment.status === "graded") {
      return (
        <div className="text-right">
           <span className="block text-xs text-gray-400">Score</span>
           <span className="text-lg font-bold text-green-600">{assignment.obtainedPoints} / {assignment.totalPoints}</span>
        </div>
      );
    }
    return <span className="text-red-500 text-sm font-medium">Missed Deadline</span>;
  };

  return (
    <div className="space-y-6 max-w-7xl  pb-10">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
        <p className="text-gray-500 text-sm">Track your upcoming tasks, quizzes, and grades.</p>
      </div>

      <Tabs defaultValue="todo" onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="todo" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">To Do</TabsTrigger>
            <TabsTrigger value="completed" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Completed</TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <Input 
              placeholder="Search assignments..." 
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className={`border-l-4 shadow-sm hover:shadow-md transition-all ${
                assignment.status === 'overdue' ? 'border-l-red-500' : 
                assignment.status === 'graded' ? 'border-l-green-500' : 
                assignment.status === 'pending' ? 'border-l-yellow-400' : 'border-l-blue-400'
              }`}>
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0 
                      ${assignment.type === 'quiz' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                      {assignment.type === 'quiz' ? <Clock size={24} /> : <FileText size={24} />}
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{assignment.title}</h3>
                      <p className="text-sm text-gray-500 font-medium">{assignment.course}</p>
                      
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                           <Calendar size={14} /> 
                           <span className={assignment.status === 'overdue' ? 'text-red-500 font-bold' : ''}>
                              {new Date(assignment.dueDate).toLocaleDateString()}
                           </span>
                        </div>
                        {assignment.status === 'pending' && (
                           <div className="flex items-center gap-1 text-yellow-600">
                              <AlertCircle size={14} /> Due {new Date(assignment.dueDate) > new Date() ? 'soon' : 'today'}
                           </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:border-l sm:pl-6 sm:h-full">
                     <div className="hidden sm:block">
                        {getStatusBadge(assignment.status)}
                     </div>
                     <div className="w-full sm:w-auto">
                        {getActionBtn(assignment)}
                     </div>
                  </div>

                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
               <div className="mx-auto bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-gray-400" size={32} />
               </div>
               <h3 className="text-lg font-medium text-gray-900">No assignments found</h3>
               <p className="text-gray-500">You are all caught up for this section!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}