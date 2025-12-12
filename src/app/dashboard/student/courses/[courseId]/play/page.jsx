"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  PlayCircle, CheckCircle, FileText, HelpCircle, 
  ChevronLeft, ChevronRight, Lock, Unlock, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [courseLessons, setCourseLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [sections, setSections] = useState({});

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/courses/${params.courseId}/lessons`);
        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setCourseLessons(data.data);
          setActiveLesson(data.data[0]);
          
          // Group lessons by section
          const sectionsMap = {};
          data.data.forEach(lesson => {
            if (!sectionsMap[lesson.section]) {
              sectionsMap[lesson.section] = [];
            }
            sectionsMap[lesson.section].push(lesson);
          });
          setSections(sectionsMap);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        toast.error('Failed to load lessons. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.courseId) {
      fetchLessons();
    }
  }, [params.courseId]);

  const handleLessonChange = (lesson) => {
    setActiveLesson(lesson);
  };

  const toggleCompletion = async (lessonId) => {
    try {
      // In a real app, you would call an API to update the completion status
      // For now, we'll just update the local state
      if (completedLessons.includes(lessonId)) {
        setCompletedLessons(prev => prev.filter(id => id !== lessonId));
      } else {
        setCompletedLessons(prev => [...prev, lessonId]);
      }
      
      // Optional: Call API to update completion status
      // await updateLessonCompletion(lessonId, !completedLessons.includes(lessonId));
      
    } catch (error) {
      console.error('Error updating lesson completion:', error);
      toast.error('Failed to update lesson status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF0055]" />
      </div>
    );
  }

  if (!courseLessons.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center p-4">
        <FileText className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No lessons available</h3>
        <p className="text-gray-500 mt-2">This course doesn't have any lessons yet.</p>
        <Button 
          onClick={() => router.back()} 
          className="mt-4 bg-[#FF0055] hover:bg-pink-700 text-white"
        >
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6">
      
      <div className="flex-1 flex flex-col min-w-0">
        {activeLesson && (
          <>
            <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video relative group">
              {activeLesson.videoUrl ? (
                <video 
                  className="w-full h-full object-cover" 
                  poster={activeLesson.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80"}
                  controls
                  autoPlay
                >
                  <source src={activeLesson.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                  <p>No video available for this lesson</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{activeLesson.title}</h1>
                    {activeLesson.section && (
                        <p className="text-sm text-gray-500 mt-1">Section: {activeLesson.section}</p>
                    )}
                </div>
                
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => {
                            const currentIndex = courseLessons.findIndex(l => l.id === activeLesson.id);
                            if (currentIndex > 0) {
                                setActiveLesson(courseLessons[currentIndex - 1]);
                            }
                        }}
                        disabled={courseLessons.findIndex(l => l.id === activeLesson.id) === 0}
                    >
                        <ChevronLeft size={16} /> Previous
                    </Button>
                    <Button 
                        className="bg-[#FF0055] hover:bg-pink-700 text-white gap-2" 
                        size="sm"
                        onClick={() => {
                            const currentIndex = courseLessons.findIndex(l => l.id === activeLesson.id);
                            if (currentIndex < courseLessons.length - 1) {
                                setActiveLesson(courseLessons[currentIndex + 1]);
                            }
                        }}
                        disabled={courseLessons.findIndex(l => l.id === activeLesson.id) === courseLessons.length - 1}
                    >
                        Next Lesson <ChevronRight size={16} />
                    </Button>
                </div>
            </div>

            <div className="mt-8 flex-1">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 rounded-none">
                        <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF0055] data-[state=active]:text-[#FF0055] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent font-semibold text-gray-500">Overview</TabsTrigger>
                        <TabsTrigger value="resources" className="data-[state=active]:border-b-2 data-[state=active]:border-[#FF0055] data-[state=active]:text-[#FF0055] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent font-semibold text-gray-500">Resources</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="pt-6">
                        <h3 className="font-bold text-lg mb-2">About this lesson</h3>
                        <div className="prose max-w-none text-gray-600 leading-relaxed" 
                             dangerouslySetInnerHTML={{ __html: activeLesson.content || 'No description available for this lesson.' }}>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="resources" className="pt-6">
                        {activeLesson.resources && activeLesson.resources.length > 0 ? (
                            <div className="space-y-3">
                                {activeLesson.resources.map((resource, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <FileText className="text-[#FF0055] flex-shrink-0" />
                                        <span className="text-sm font-medium flex-1">{resource.name || `Resource ${index + 1}`}</span>
                                        <a 
                                            href={resource.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            {resource.url.includes('youtube.com') || resource.url.includes('vimeo.com') 
                                                ? 'Watch' 
                                                : 'Download'}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 border border-dashed rounded-lg">
                                <FileText className="mx-auto text-gray-300 mb-2" size={40} />
                                <p className="text-gray-500">No resources available for this lesson.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
          </>
        )}
      </div>

      <div className="w-full lg:w-[350px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-800">Course Content</h3>
            <p className="text-xs text-gray-500 mt-1">
                {completedLessons.length} / {courseLessons.length} Lessons Completed 
                ({courseLessons.length > 0 ? Math.round((completedLessons.length / courseLessons.length) * 100) : 0}%)
            </p>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-4">
            {Object.entries(sections).length > 0 ? (
              <Accordion type="multiple" defaultValue={Object.keys(sections)} className="w-full">
                {Object.entries(sections).map(([sectionName, sectionLessons], index) => (
                  <AccordionItem key={sectionName} value={sectionName} className="border-b-0">
                    <AccordionTrigger className="py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-sm">{sectionName || 'Uncategorized'}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {sectionLessons.length} {sectionLessons.length === 1 ? 'Lesson' : 'Lessons'}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pt-2">
                      <div className="space-y-2 mt-1">
                        {sectionLessons.map((lesson) => (
                          <div 
                            key={lesson.id}
                            className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${activeLesson?.id === lesson.id ? 'bg-[#FFF0F5]' : 'hover:bg-gray-50'}`}
                            onClick={() => handleLessonChange(lesson)}
                          >
                            <div className="mt-0.5">
                              {completedLessons.includes(lesson.id) ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <PlayCircle className={`h-4 w-4 ${activeLesson?.id === lesson.id ? 'text-[#FF0055]' : 'text-gray-400'}`} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${activeLesson?.id === lesson.id ? 'text-[#FF0055]' : 'text-gray-800'}`}>
                                {lesson.title}
                              </p>
                              {lesson.duration && (
                                <div className="flex items-center gap-2 mt-1">
                                  {lesson.type === 'video' ? <PlayCircle size={12} className="text-gray-400" /> : <FileText size={12} className="text-gray-400" />}
                                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                                </div>
                              )}
                            </div>
                            <Checkbox 
                              id={`lesson-${lesson.id}`} 
                              checked={completedLessons.includes(lesson.id)}
                              onCheckedChange={(e) => {
                                e.stopPropagation();
                                toggleCompletion(lesson.id);
                              }}
                              className="h-4 w-4 mt-1"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        ))}
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