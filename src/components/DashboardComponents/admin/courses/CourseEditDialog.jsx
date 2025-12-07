import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CourseEditDialog = ({ open, onOpenChange, course, onUpdate }) => {
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    if (course) {
      setEditingCourse({ ...course });
    }
  }, [course]);

  const handleUpdate = () => {
    if (editingCourse) {
      onUpdate(editingCourse);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Edit Course
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Course Name</Label>
            <Input
              value={editingCourse?.title || ""}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, title: e.target.value })
              }
              className="mt-1.5"
              placeholder="Enter course name"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Teacher</Label>
            <Input
              value={editingCourse?.teacher || ""}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, teacher: e.target.value })
              }
              className="mt-1.5"
              placeholder="Enter teacher name"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Students</Label>
            <Input
              type="number"
              value={editingCourse?.students || ""}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, students: parseInt(e.target.value) || 0 })
              }
              className="mt-1.5"
              placeholder="Number of students"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Duration</Label>
            <Input
              value={editingCourse?.duration || ""}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, duration: e.target.value })
              }
              className="mt-1.5"
              placeholder="e.g., 12 weeks"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Price</Label>
            <Input
              value={editingCourse?.price || ""}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, price: e.target.value })
              }
              className="mt-1.5"
              placeholder="e.g., $99"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Status</Label>
            <select
              className="w-full mt-1.5 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] transition-all"
              value={editingCourse?.status || ""}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <Button 
            className="w-full mt-6 bg-gradient-to-r from-[#FF0055] to-rose-600 hover:from-[#FF0055] hover:to-rose-700" 
            onClick={handleUpdate}
          >
            Update Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditDialog;