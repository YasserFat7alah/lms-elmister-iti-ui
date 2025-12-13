"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Archive, CheckCircle, Search } from "lucide-react";
import CourseTable from "./CourseTable";
import CourseEditDialog from "./CourseEditDialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/api/endPoints/coursesApiSlice";

import { RiDraftFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";
import CourseViewDialog from "./CourseViewDialog";
import BulkBtn from "../BulkBtn";

const CourseTabs = ({
  courses,
  publishedCourses,
  archivedCourses,
  inReviewCourses,
  draftCourses,
}) => {
  const { isLoading, isError } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewingCourse, setViewingCourse] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // API Handlers
  const handleDelete = async (ids) => {
    try {
      if (Array.isArray(ids)) {
        // Delete multiple courses
        await Promise.all(ids.map((id) => deleteCourse(id).unwrap()));
      } else {
        // Delete single course
        await deleteCourse(ids).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete course(s):", err);
      // alert(`Error deleting course(s): ${err?.data?.message || err.message}`);
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm(true);
  };

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
      
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to update course:", err);
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
  if (isError)
    return (
      <p className="text-center py-8 text-red-500">Failed to load courses.</p>
    );

  return (
    <div className="space-y-6 py-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
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
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-col md:flex-row flex-wr justify-between items-center gap-4 h-auto w-full bg-white border border-gray-200 p-4 rounded-xl">
          <div className="w-full lg:w-auto">
            {/* --- 1. MOBILE DROPDOWN (Visible only below MD) --- */}
            <div className="w-full md:hidden">
              {/* Shadcn Select component replaces the horizontal tabs */}
              <Select value={activeTab} onValueChange={setActiveTab}>
                {/* EDITED: Updated SelectTrigger focus color to match the primary rose color scheme */}
                <SelectTrigger className="w-full text-base font-semibold py-2.5 px-4 h-auto focus:ring-[#FF0055]/30 focus:border-[#FF0055]">
                  <SelectValue placeholder="Select Course Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-[#FF0055]" /> All
                      Courses
                    </div>
                  </SelectItem>
                  <SelectItem value="published">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />{" "}
                      Published
                    </div>
                  </SelectItem>
                  <SelectItem value="archived">
                    <div className="flex items-center">
                      <Archive className="w-4 h-4 mr-2 text-gray-600" />{" "}
                      Archived
                    </div>
                  </SelectItem>
                  <SelectItem value="inreview">
                    <div className="flex items-center">
                      <MdReviews className="w-4 h-4 mr-2 text-blue-600" /> In
                      Review
                    </div>
                  </SelectItem>
                  <SelectItem value="draft">
                    <div className="flex items-center">
                      <RiDraftFill className="w-4 h-4 mr-2 text-yellow-600" />{" "}
                      Draft
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* --- 2. DESKTOP TABS (Hidden below MD) --- */}
            <div className="hidden md:block">
              <div className="flex flex-row flex-wrap items-center gap-2">
                <TabsTrigger
                  value="all"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF0055] data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <BookOpen className="w-4 h-4 mr-2" /> All Courses
                </TabsTrigger>

                <TabsTrigger
                  value="published"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> Published
                </TabsTrigger>

                <TabsTrigger
                  value="archived"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-gray-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <Archive className="w-4 h-4 mr-2" /> Archived
                </TabsTrigger>

                <TabsTrigger
                  value="inreview"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <MdReviews className="w-4 h-4 mr-2" /> In Review
                </TabsTrigger>

                <TabsTrigger
                  value="draft"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <RiDraftFill className="w-4 h-4 mr-2" /> Draft
                </TabsTrigger>
              </div>
            </div>
          </div>

          {/* Actions Group (Unchanged) */}
          <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Bulk Actions Button */}
            <div className="w-full sm:w-auto">
              <BulkBtn
                selectedCount={selectedRows.length}
                onDelete={handleBulkDelete}
                label="user(s) selected"
              />
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff3c]/20 focus:border-[#00ff3c] transition-all"
              />
            </div>
          </div>
        </TabsList>

        <TabsContent value="all">
          <CourseTable
            data={filteredCourses(courses)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            setIsBulkDelete={setIsBulkDelete}
            isBulkDelete={isBulkDelete}
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
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            setIsBulkDelete={setIsBulkDelete}
            isBulkDelete={isBulkDelete}
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
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            setIsBulkDelete={setIsBulkDelete}
            isBulkDelete={isBulkDelete}
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
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            setIsBulkDelete={setIsBulkDelete}
            isBulkDelete={isBulkDelete}
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
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            setIsBulkDelete={setIsBulkDelete}
            isBulkDelete={isBulkDelete}
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
