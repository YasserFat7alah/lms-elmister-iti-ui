"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCreateLessonMutation, useUpdateLessonMutation } from "@/redux/api/endPoints/lessonsApiSlice";

export default function CreateSessionModal({ isOpen, onClose, groupId, nextOrder, onSuccess, lessonToEdit = null }) {
  const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation();
  
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();

  const isEditMode = !!lessonToEdit; 
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "center",
    order: nextOrder || 1,
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && lessonToEdit) {
        setFormData({
          title: lessonToEdit.title || "",
          date: lessonToEdit.date ? new Date(lessonToEdit.date).toISOString().split("T")[0] : "",
          startTime: lessonToEdit.startTime || "",
          endTime: lessonToEdit.endTime || "",
          type: lessonToEdit.type || "center",
          order: lessonToEdit.order || 1,
        });
      } else {
        setFormData({
          title: `Session #${nextOrder}`,
          date: new Date().toISOString().split("T")[0],
          startTime: "12:00",
          endTime: "14:00",
          type: "center",
          order: nextOrder,
        });
      }
    }
  }, [isOpen, isEditMode, lessonToEdit, nextOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateLesson({ 
            lessonId: lessonToEdit._id, 
            data: { ...formData, groupId } 
        }).unwrap();
        toast.success("Session updated successfully");
      } else {
        await createLesson({ ...formData, groupId }).unwrap();
        toast.success("Session created successfully");
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Session Details" : "Schedule New Session"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          
          <div className="space-y-2">
            <Label>Session Title</Label>
            <Input 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(val) => setFormData({...formData, type: val})}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center (Offline)</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input 
                type="time" 
                value={formData.startTime} 
                onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input 
                type="time" 
                value={formData.endTime} 
                onChange={(e) => setFormData({...formData, endTime: e.target.value})} 
                required 
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
             <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
             <Button type="submit" className="bg-[#FF4667] hover:bg-[#ff2e53]" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : (isEditMode ? "Save Changes" : "Schedule Session")}
             </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}