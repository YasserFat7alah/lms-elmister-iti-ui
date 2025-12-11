"use client";
import React, { useState } from "react";
import { 
  PlayCircle, CheckCircle, FileText, HelpCircle, 
  ChevronLeft, ChevronRight, Lock, Unlock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

export default function CoursePlayerPage() {
  const [completedLessons, setCompletedLessons] = useState([101, 102]);

  const handleLessonChange = (lesson) => {
    setActiveLesson(lesson);
  };

  const toggleCompletion = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => prev.filter(id => id !== lessonId));
    } else {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6">
      
      <div className="flex-1 flex flex-col min-w-0">
        
        <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video relative group">
            <video 
                className="w-full h-full object-cover" 
                poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80"
                controls
            >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-xl font-bold text-gray-900">{activeLesson.title}</h1>
                <p className="text-sm text-gray-500 mt-1">Section 2: Fundamentals of Design</p>
            </div>
            
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                    <ChevronLeft size={16} /> Previous
                </Button>
                <Button className="bg-[#FF0055] hover:bg-pink-700 text-white gap-2" size="sm">
                    Next Lesson <ChevronRight size={16} />
                </Button>
            </div>
        </div>

        <div className="mt-8 flex-1">
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 rounded-none">
                    <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF0055] data-[state=active]:text-[#FF0055] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent font-semibold text-gray-500">Overview</TabsTrigger>
                    <TabsTrigger value="qa" className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF0055] data-[state=active]:text-[#FF0055] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent font-semibold text-gray-500">Q&A</TabsTrigger>
                    <TabsTrigger value="resources" className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF0055] data-[state=active]:text-[#FF0055] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent font-semibold text-gray-500">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-6">
                    <h3 className="font-bold text-lg mb-2">About this lesson</h3>
                    <p className="text-gray-600 leading-relaxed">
                        In this lesson, we will explore the core concepts of UI design. We'll start by understanding the difference between UI and UX, and why it matters for developers.
                    </p>
                </TabsContent>
                <TabsContent value="qa" className="pt-6">
                    <div className="text-center py-10 border border-dashed rounded-lg">
                        <HelpCircle className="mx-auto text-gray-300 mb-2" size={40} />
                        <p className="text-gray-500">No questions yet. Be the first to ask!</p>
                    </div>
                </TabsContent>
                <TabsContent value="resources" className="pt-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <FileText className="text-[#FF0055]" />
                        <span className="text-sm font-medium">Lesson Slides.pdf</span>
                        <Button variant="ghost" size="sm" className="ml-auto text-blue-600">Download</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </div>

      <div className="w-full lg:w-[350px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-800">Course Content</h3>
            <p className="text-xs text-gray-500 mt-1">
                {completedLessons.length} / 15 Lessons Completed ({Math.round((completedLessons.length/15)*100)}%)
            </p>
        </div>

        <ScrollArea className="flex-1">
            <Accordion type="multiple" defaultValue={["section-1", "section-2"]} className="w-full">
                
                {courseCurriculum.map((section) => (
                    <AccordionItem key={section.id} value={section.id} className="border-b">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 bg-gray-50/50">
                            <div className="text-left">
                                <h4 className="font-semibold text-sm text-gray-800">{section.title}</h4>
                                <p className="text-[10px] text-gray-500 font-normal mt-0.5">
                                    {section.lessons.length} Lessons • 45m
                                </p>
                            </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="p-0">
                            <div className="flex flex-col">
                                {section.lessons.map((lesson) => {
                                    const isActive = activeLesson.id === lesson.id;
                                    const isDone = completedLessons.includes(lesson.id);

                                    return (
                                        <div 
                                            key={lesson.id}
                                            onClick={() => handleLessonChange(lesson)}
                                            className={`flex items-start gap-3 p-3 cursor-pointer transition-colors border-l-4
                                                ${isActive 
                                                    ? "bg-pink-50 border-[#FF0055]" 
                                                    : "border-transparent hover:bg-gray-50"
                                                }
                                            `}
                                        >
                                            <Checkbox 
                                                checked={isDone} 
                                                onCheckedChange={() => toggleCompletion(lesson.id)}
                                                className="mt-1 data-[state=checked]:bg-[#10D876] data-[state=checked]:border-[#10D876]"
                                                onClick={(e) => e.stopPropagation()} // عشان الضغط عالتشيك ميعملش تشغيل للفيديو
                                            />
                                            
                                            <div className="flex-1">
                                                <p className={`text-sm font-medium ${isActive ? "text-[#FF0055]" : "text-gray-700"}`}>
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                                                    {lesson.type === 'video' ? <PlayCircle size={12} /> : <FileText size={12} />}
                                                    <span>{lesson.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}

            </Accordion>
        </ScrollArea>
      </div>

    </div>
  );
}