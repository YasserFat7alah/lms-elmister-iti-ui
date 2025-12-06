"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


// ---------------- TABLE COMPONENT ----------------
const CourseTable = ({ data, title, onEdit, onDelete }) => {
  return (
    <Card className="mt-4 shadow-sm border border-gray-200">
      <CardContent className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Course Name</th>
                <th className="p-3 border">Teacher</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((course) => (
                <tr key={course.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">{course.title}</td>
                  <td className="p-3 border">{course.teacher}</td>
                  <td className="p-3 border capitalize">
                    <Badge
                      className={
                        course.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }
                    >
                      {course.status}
                    </Badge>
                  </td>

                  <td className="p-3 border flex gap-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => onEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => onDelete(course.id)}
                    >
                      Delete
                    </button>
                    <button className="text-green-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};



// ---------------- MAIN TABS COMPONENT ----------------
const CourseTabs = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "Math Level 1", teacher: "Ali Hassan", status: "active" },
    { id: 2, title: "Science Basics", teacher: "Sarah Ahmed", status: "archived" },
    { id: 3, title: "English A1", teacher: "Omar Salah", status: "active" },
    { id: 4, title: "History Intro", teacher: "Mona Adel", status: "archived" },
  ]);

  const [editingCourse, setEditingCourse] = useState(null); // state for editing
  const [openDialog, setOpenDialog] = useState(false);

  // ---------------- CRUD FUNCTIONS ----------------
  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setOpenDialog(true);
  };

  const handleUpdate = () => {
    setCourses(
      courses.map((c) =>
        c.id === editingCourse.id ? editingCourse : c
      )
    );
    setOpenDialog(false);
  };

  const activeCourses = courses.filter((c) => c.status === "active");
  const archivedCourses = courses.filter((c) => c.status === "archived");

  return (
    <div>
      {/* -------- Dialog for Edit -------- */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-3">
            <div>
              <Label>Course Name</Label>
              <Input
                value={editingCourse?.title || ""}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Teacher</Label>
              <Input
                value={editingCourse?.teacher || ""}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, teacher: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Status</Label>
              <select
                className="border w-full p-2 rounded"
                value={editingCourse?.status || ""}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <Button className="w-full mt-3" onClick={handleUpdate}>
              Update Course
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* -------- Tabs -------- */}
      <Tabs defaultValue="all" className="w-full mt-6">
        <TabsList className="grid grid-cols-3 w-full bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">
            All Courses
          </TabsTrigger>

          <TabsTrigger value="active" className="data-[state=active]:bg-white">
            Active
          </TabsTrigger>

          <TabsTrigger value="archived" className="data-[state=active]:bg-white">
            Archived
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <CourseTable
            data={courses}
            title="All Courses"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="active">
          <CourseTable
            data={activeCourses}
            title="Active Courses"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="archived">
          <CourseTable
            data={archivedCourses}
            title="Archived Courses"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseTabs;
