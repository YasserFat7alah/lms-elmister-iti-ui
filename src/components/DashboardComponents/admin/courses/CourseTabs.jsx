"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Archive, CheckCircle } from "lucide-react";
import CourseStateCards from "./CourseStateCards";
import CourseTable from "./CourseTable";
import CourseEditDialog from "./CourseEditDialog";

import { useDeleteCourseMutation, useGetCoursesQuery, useUpdateCourseMutation } from "@/redux/api/endPoints/coursesApiSlice";
import { RiDraftFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";
import CourseViewDialog from "./CourseViewDialog";

const CourseTabs = () => {

  const { data, isLoading, isError } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const [editingCourse, setEditingCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewingCourse, setViewingCourse] = useState(null);
const [openViewDialog, setOpenViewDialog] = useState(false);

  //  Access the data from API response
  const courses = data?.data || data || [];
  
  // Filter courses by status
  const publishedCourses = courses.filter((c) => c.status === "published");
  const archivedCourses = courses.filter((c) => c.status === "archived");
  const inReviewCourses = courses.filter((c) => c.status === "in-review");
  const draftCourses = courses.filter((c) => c.status === "draft");

  // API Handlers
  const handleDelete = async (ids) => {
    try {
      if (Array.isArray(ids)) {
        // Delete multiple courses
        await Promise.all(ids.map(id => deleteCourse(id).unwrap()));
      } else {
        // Delete single course
        await deleteCourse(ids).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete course(s):", err);
      // alert(`Error deleting course(s): ${err?.data?.message || err.message}`);
    }
  };

  // const handleUpdate = async (updatedCourse) => {
  //   try {
  //     //  _id from MongoDB
  //     const courseId = updatedCourse._id || updatedCourse.id;
      
  //     // Prepare update payload - only send fields that can be updated
  //     const updatePayload = {
  //       title: updatedCourse.title,
  //       subTitle: updatedCourse.subTitle,
  //       description: updatedCourse.description,
  //       subject: updatedCourse.subject,
  //       gradeLevel: updatedCourse.gradeLevel,
  //       status: updatedCourse.status,
  //       language: updatedCourse.language,
  //       tags: updatedCourse.tags || [],
  //     };

  //     await updateCourse({
  //       courseId: courseId,
  //       data: updatePayload,
  //     }).unwrap();
      
  //     setOpenDialog(false);
  //   } catch (err) {
  //     console.error("Failed to update course:", err);
  //     // alert(`Error updating course: ${err?.data?.message || err.message}`);
  //   }
  // };


  const handleUpdate = async (updatedCourse) => {
  try {
    const courseId = updatedCourse._id || updatedCourse.id;
    
    const updatePayload = {
      title: updatedCourse.title,
      subTitle: updatedCourse.subTitle,
      subject: updatedCourse.subject,
      gradeLevel: updatedCourse.gradeLevel,
      status: updatedCourse.status,
    };

    await updateCourse({
      courseId: courseId,
      data: updatePayload,
    }).unwrap();
    
    setOpenDialog(false); // Close dialog after successful update
  } catch (err) {
    console.error("Failed to update course:", err);
    // Show error message to user
    // alert(`Error updating course: ${err?.data?.message || err.message}`);
  }
};

  const handleEdit = (course) => {
    setEditingCourse(course);
    setOpenDialog(true);
  };

  const handleView = (course) => {
    setViewingCourse(course);
    setOpenViewDialog(true);
  };


  // Filter by search
  const filteredCourses = (list) => {
    if (!searchTerm) return list;
    return list.filter(
      (course) =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (isLoading) return <p className="text-center py-8">Loading courses...</p>;
  if (isError) return <p className="text-center py-8 text-red-500">Failed to load courses.</p>;

  return (
    <div className="space-y-6 py-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Stats Cards */}
      <CourseStateCards
        courses={courses}
        activeCourses={publishedCourses}
        archivedCourses={archivedCourses}
        inreviewCourses={inReviewCourses}
        draftCourses={draftCourses}
      />

      {/* Edit Dialog */}
      <CourseEditDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        course={editingCourse}
        onUpdate={handleUpdate}
      />
      {/* View Dialog */}
      <CourseViewDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        course={viewingCourse}
      />

      {/* Tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="flex items-center justify-around w-full bg-white border border-gray-200 py-7 px-1.5 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF0055] data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all">
            <BookOpen className="w-4 h-4 mr-2" /> All Courses
          </TabsTrigger>

          <TabsTrigger value="published" className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all">
            <CheckCircle className="w-4 h-4 mr-2" /> Published
          </TabsTrigger>

          <TabsTrigger value="archived" className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-gray-600 data-[state=active]:text-white transition-all">
            <Archive className="w-4 h-4 mr-2" /> Archived
          </TabsTrigger>

          <TabsTrigger value="inreview" className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white transition-all">
            <MdReviews className="w-4 h-4 mr-2" /> In Review
          </TabsTrigger>

          <TabsTrigger value="draft" className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all">
            <RiDraftFill className="w-4 h-4 mr-2" /> Draft
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <CourseTable
            data={filteredCourses(courses)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </TabsContent>

        <TabsContent value="published">
          <CourseTable
            data={filteredCourses(publishedCourses)}
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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </TabsContent>

        <TabsContent value="inreview">
          <CourseTable
            data={filteredCourses(inReviewCourses)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </TabsContent>

        <TabsContent value="draft">
          <CourseTable
            data={filteredCourses(draftCourses)}
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