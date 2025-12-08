"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Archive, CheckCircle } from "lucide-react";
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
      price: "$99",
    },
    {
      id: 2,
      title: "Science Basics",
      teacher: "Sarah Ahmed",
      status: "archived",
      students: 38,
      duration: "10 weeks",
      price: "$89",
    },
    {
      id: 3,
      title: "English A1",
      teacher: "Omar Salah",
      status: "active",
      students: 52,
      duration: "8 weeks",
      price: "$79",
    },
    {
      id: 4,
      title: "History Intro",
      teacher: "Mona Adel",
      status: "archived",
      students: 30,
      duration: "6 weeks",
      price: "$69",
    },
    {
      id: 5,
      title: "Physics Advanced",
      teacher: "Ahmed Ibrahim",
      status: "active",
      students: 28,
      duration: "14 weeks",
      price: "$120",
    },
  ]);

  const [editingCourse, setEditingCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter courses by status
  const activeCourses = courses.filter((c) => c.status === "active");
  const archivedCourses = courses.filter((c) => c.status === "archived");

  // Delete handler - handles both single and bulk delete
  const handleDelete = (idOrIds) => {
    if (Array.isArray(idOrIds)) {
      // Bulk delete
      setCourses((prev) => prev.filter((course) => !idOrIds.includes(course.id)));
    } else {
      // Single delete
      setCourses((prev) => prev.filter((course) => course.id !== idOrIds));
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
      courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
    );
    setOpenDialog(false);
  };

  // View handler
  const handleView = (course) => {
    alert(
      `View course: ${course.title}\nThis would navigate to course details page`
    );
  };

  // Filter courses by search term
  const filteredCourses = (list) => {
    if (!searchTerm) return list;
    return list.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-6 py-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
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
        <TabsList className="flex items-center justify-around w-full bg-white border border-gray-200 py-7 px-1.5 rounded-xl">
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