"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, FileText } from "lucide-react";
import { useCreateAssignmentMutation, useUpdateAssignmentMutation, useDeleteAssignmentMutation, useGetAssignmentsByLessonQuery } from "@/redux/api/endPoints/assignmentsApiSlice";
import { toast } from "react-hot-toast";

// Import sub-components
import AssignmentForm from "./AssignmentForm";
import AssignmentCard from "./AssignmentCard";
import AssignmentViewDialog from "./AssignmentViewDialog";
import DeleteAssignmentModal from "./DeleteAssignmentModal";

const LessonAssignment = ({ lessonId }) => {
  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Fetch assignments
  const { data: assignmentData, isLoading } = useGetAssignmentsByLessonQuery(lessonId, {
    skip: !lessonId
  });
  const assignments = assignmentData?.data || [];

  // Mutations
  const [createAssignment, { isLoading: creating }] = useCreateAssignmentMutation();
  const [updateAssignment, { isLoading: updating }] = useUpdateAssignmentMutation();
  const [deleteAssignment, { isLoading: deleting }] = useDeleteAssignmentMutation();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalGrade, setTotalGrade] = useState(100);
  const [file, setFile] = useState(null);
  const [allowLate, setAllowLate] = useState(false);
  const [latePenaltyPerDay, setLatePenaltyPerDay] = useState(0);
  const [maxLateDays, setMaxLateDays] = useState(7);

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setTotalGrade(100);
    setFile(null);
    setAllowLate(false);
    setLatePenaltyPerDay(0);
    setMaxLateDays(7);
  };

  // Reset form when create dialog opens
  useEffect(() => {
    if (isCreateOpen) {
      resetForm();
    }
  }, [isCreateOpen]);

  // Reset form when edit dialog closes
  useEffect(() => {
    if (!isEditOpen && !isCreateOpen) {
      resetForm();
    }
  }, [isEditOpen, isCreateOpen]);

  // Fill form with assignment data for editing
  const fillFormWithAssignment = (assignment) => {
    setTitle(assignment.title || "");
    setDescription(assignment.description || "");
    
    if (assignment.dueDate) {
      const date = new Date(assignment.dueDate);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setDueDate(localDate);
    }
    
    setTotalGrade(assignment.totalGrade || 100);
    setAllowLate(assignment.allowLateSubmission || false);
    setLatePenaltyPerDay(assignment.latePenaltyPerDay || 0);
    setMaxLateDays(assignment.maxLateDays || 7);
    setFile(null);
  };

  // Handlers
  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    setIsViewOpen(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    fillFormWithAssignment(assignment);
    setIsEditOpen(true);
  };

  const handleDelete = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!dueDate) {
      toast.error("Due date is required");
      return;
    }

    if (!lessonId) {
      toast.error("Lesson ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("dueDate", dueDate);
    formData.append("totalGrade", String(totalGrade));
    formData.append("lesson", lessonId);
    
    if (file) formData.append("document", file);

    formData.append("allowLateSubmission", String(allowLate));
    
    if (allowLate) {
      formData.append("latePenaltyPerDay", String(latePenaltyPerDay));
      formData.append("maxLateDays", String(maxLateDays));
    }

    try {
      await createAssignment(formData).unwrap();
      toast.success("Assignment created successfully!");
      resetForm();
      setIsCreateOpen(false);
    } catch (err) {
      console.error("CREATE ERROR:", err);
      const errorMsg = err?.data?.message || err?.data?.error || "Failed to create assignment";
      toast.error(errorMsg);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!dueDate) {
      toast.error("Due date is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("dueDate", dueDate);
    formData.append("totalGrade", String(totalGrade));
    formData.append("allowLateSubmission", String(allowLate));
    
    if (allowLate) {
      formData.append("latePenaltyPerDay", String(latePenaltyPerDay));
      formData.append("maxLateDays", String(maxLateDays));
    }
    
    if (file) formData.append("document", file);

    try {
      await updateAssignment({ assignmentId: selectedAssignment._id, formData }).unwrap();
      toast.success("Assignment updated successfully!");
      resetForm();
      setIsEditOpen(false);
      setSelectedAssignment(null);
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      const errorMsg = err?.data?.message || err?.data?.error || "Failed to update assignment";
      toast.error(errorMsg);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteAssignment(selectedAssignment._id).unwrap();
      toast.success("Assignment deleted successfully");
      setIsDeleteOpen(false);
      setSelectedAssignment(null);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      const errorMsg = err?.data?.message || err?.data?.error || "Failed to delete assignment";
      toast.error(errorMsg);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-700">Assignments</h3>
        
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="text-[#FF4667] border-[#FF4667] hover:bg-pink-50"
            >
              <Plus size={16} className="mr-1" /> Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <AssignmentForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              dueDate={dueDate}
              setDueDate={setDueDate}
              totalGrade={totalGrade}
              setTotalGrade={setTotalGrade}
              file={file}
              handleFileChange={handleFileChange}
              allowLate={allowLate}
              setAllowLate={setAllowLate}
              latePenaltyPerDay={latePenaltyPerDay}
              setLatePenaltyPerDay={setLatePenaltyPerDay}
              maxLateDays={maxLateDays}
              setMaxLateDays={setMaxLateDays}
              onSubmit={handleSubmit}
              isLoading={creating}
              isEditMode={false}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Assignments List */}
      <div className="grid gap-3">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-xl bg-gray-50">
            <FileText size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No assignments yet</p>
            <p className="text-sm mt-1">Click "Add Assignment" to create one</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
          </DialogHeader>
          <AssignmentForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            dueDate={dueDate}
            setDueDate={setDueDate}
            totalGrade={totalGrade}
            setTotalGrade={setTotalGrade}
            file={file}
            handleFileChange={handleFileChange}
            allowLate={allowLate}
            setAllowLate={setAllowLate}
            latePenaltyPerDay={latePenaltyPerDay}
            setLatePenaltyPerDay={setLatePenaltyPerDay}
            maxLateDays={maxLateDays}
            setMaxLateDays={setMaxLateDays}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditOpen(false);
              resetForm();
            }}
            isLoading={updating}
            isEditMode={true}
            existingFile={selectedAssignment?.file}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <AssignmentViewDialog
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        assignment={selectedAssignment}
        onEdit={handleEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteAssignmentModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedAssignment(null);
        }}
        assignment={selectedAssignment}
        onConfirm={confirmDelete}
        isLoading={deleting}
      />
    </div>
  );
};

export default LessonAssignment;