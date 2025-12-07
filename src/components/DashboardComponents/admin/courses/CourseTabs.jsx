"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Archive, CheckCircle, GraduationCap } from "lucide-react";
import CourseStateCards from "./CourseStateCards";
import CourseTable from "./CourseTable";
import CourseEditDialog from "./CourseEditDialog";

const CourseTabs = () => {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: "Math Level 1", 
      teacher: "Ali Hassan", 
      status: "active",
      students: 45,
      duration: "12 weeks",
      price: "$99"
    },
    { 
      id: 2, 
      title: "Science Basics", 
      teacher: "Sarah Ahmed", 
      status: "archived",
      students: 38,
      duration: "10 weeks",
      price: "$89"
    },
    { 
      id: 3, 
      title: "English A1", 
      teacher: "Omar Salah", 
      status: "active",
      students: 52,
      duration: "8 weeks",
      price: "$79"
    },
    { 
      id: 4, 
      title: "History Intro", 
      teacher: "Mona Adel", 
      status: "archived",
      students: 30,
      duration: "6 weeks",
      price: "$69"
    },
    { 
      id: 5, 
      title: "Physics Advanced", 
      teacher: "Ahmed Ibrahim", 
      status: "active",
      students: 28,
      duration: "14 weeks",
      price: "$120"
    },
  ]);

  const [editingCourse, setEditingCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter courses by status
  const activeCourses = courses.filter((c) => c.status === "active");
  const archivedCourses = courses.filter((c) => c.status === "archived");

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  // Edit handler
  const handleEdit = (course) => {
    setEditingCourse(course);
    setOpenDialog(true);
  };

  // Update handler
  const handleUpdate = (updatedCourse) => {
    setCourses(
      courses.map((c) =>
        c.id === updatedCourse.id ? updatedCourse : c
      )
    );
    setOpenDialog(false);
  };

  // View handler
  const handleView = (course) => {
    alert(`View course: ${course.title}\nThis would navigate to course details page`);
  };

  // Filter courses by search term
  const filteredCourses = (list) => {
    if (!searchTerm) return list;
    return list.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-[#FF0055] to-rose-600 rounded-2xl p-8 shadow-xl border border-rose-200/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Course Management
            </h1>
            <p className="text-white/90 text-sm mt-1">
              Manage all platform courses and content
            </p>
          </div>
        </div>
      </div> */}

      {/* Stats Cards */}
      <CourseStateCards
        courses={courses}
        activeCourses={activeCourses}
        archivedCourses={archivedCourses}
      />

      {/* Edit Dialog */}
      <CourseEditDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        course={editingCourse}
        onUpdate={handleUpdate}
      />

      {/* Tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="flex items-center justify-around w-full bg-white border border-gray-200 py-7 px-1.5 rounded-xl ">
          <TabsTrigger 
            value="all" 
            className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF0055] data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            All Courses
          </TabsTrigger>

          <TabsTrigger 
            value="active" 
            className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Active
          </TabsTrigger>

          <TabsTrigger 
            value="archived" 
            className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-gray-600 data-[state=active]:text-white transition-all"
          >
            <Archive className="w-4 h-4 mr-2" />
            Archived
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <CourseTable
            data={filteredCourses(courses)}
            title="All Courses"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </TabsContent>

        <TabsContent value="active">
          <CourseTable
            data={filteredCourses(activeCourses)}
            title="Active Courses"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </TabsContent>

        <TabsContent value="archived">
          <CourseTable
            data={filteredCourses(archivedCourses)}
            title="Archived Courses"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseTabs;