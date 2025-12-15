"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/shared/Loader";
import { toast } from "react-hot-toast";
import { useCreateLessonMutation, useUpdateLessonMutation, useGetAllMyLessonsQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { useGetMyGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";

export default function CreateSessionModal({ isOpen, onClose, groupId: propGroupId, nextOrder, onSuccess, lessonToEdit = null }) {
  const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation();
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();
  
  const { userInfo } = useSelector((state) => state.auth);
  const currentUserId = userInfo?.user?._id;
  const role = userInfo?.user?.role;

  const { data: groupsData } = useGetMyGroupsQuery();
  const allGroups = groupsData?.data || [];

  const { data: lessonsData } = useGetAllMyLessonsQuery(undefined, {
    skip: !isOpen, 
  });
  const allLessons = lessonsData?.data || [];

  const teacherGroups = useMemo(() => {
    if (!allGroups.length) return [];
    if (role === 'admin') return allGroups;
    return allGroups.filter(group => {
      const teacherId = group.teacherId?._id || group.teacherId;
      return teacherId === currentUserId;
    });
  }, [allGroups, currentUserId, role]);

  const isEditMode = !!lessonToEdit;
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "offline", 
    meetingLink: "", 
    location: "",
    groupId: propGroupId || "",
    order: nextOrder || 1,
  });

useEffect(() => {
    if (!isEditMode && formData.groupId) {
      const groupLessons = allLessons.filter(l => {
        const lGroupId = l.groupId?._id || l.groupId;
        return lGroupId === formData.groupId;
      });

      const maxOrder = groupLessons.reduce((max, lesson) => {
        return (lesson.order > max) ? lesson.order : max;
      }, 0);

      const calculatedOrder = maxOrder + 1;

      if (formData.order === calculatedOrder) return; 

      setFormData(prev => ({
        ...prev,
        order: calculatedOrder,
        title: (prev.title === "" || prev.title.startsWith("Session #")) 
               ? `Session #${calculatedOrder}` 
               : prev.title
      }));
    }
  }, [formData.groupId, allLessons, isEditMode, formData.order]); 
  
  
  
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && lessonToEdit) {
        setFormData({
          title: lessonToEdit.title || "",
          date: lessonToEdit.date ? new Date(lessonToEdit.date).toISOString().split("T")[0] : "",
          startTime: lessonToEdit.startTime || "",
          endTime: lessonToEdit.endTime || "",
          type: lessonToEdit.type || "offline", 
          meetingLink: lessonToEdit.meetingLink || "",
          location: lessonToEdit.location || "",
          groupId: lessonToEdit.groupId?._id || lessonToEdit.groupId || "", 
          order: lessonToEdit.order || 1,
        });
      } else if (!formData.groupId) {
         setFormData(prev => ({
          ...prev,
          title: "",
          date: new Date().toISOString().split("T")[0],
          startTime: "12:00",
          endTime: "14:00",
          type: "offline", 
          meetingLink: "",
          location: "",
          groupId: propGroupId || "", 
        }));
      }
    }
  }, [isOpen, isEditMode, lessonToEdit, propGroupId]);

  const checkTimeConflict = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) return false;

    const getMinutes = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    const newStart = getMinutes(formData.startTime);
    const newEnd = getMinutes(formData.endTime);

    if (newEnd <= newStart) {
        toast.error("End time must be after start time");
        return true;
    }

    const hasConflict = allLessons.some(lesson => {
        if (isEditMode && lesson._id === lessonToEdit._id) return false;

        const lessonDate = new Date(lesson.date).toISOString().split('T')[0];
        if (lessonDate !== formData.date) return false;

        const lessonStart = getMinutes(lesson.startTime);
        const lessonEnd = getMinutes(lesson.endTime);

        return (newStart < lessonEnd && newEnd > lessonStart);
    });

    if (hasConflict) {
        toast.error("You already have a session scheduled at this time!");
        return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.groupId) {
      toast.error("Please select a group first!");
      return;
    }

    if (checkTimeConflict()) return;

    try {
      const dataToSend = { ...formData };
      
      if (formData.type === 'offline') {
        delete dataToSend.meetingLink;
      } else {
        delete dataToSend.location;
      }

      if (isEditMode) {
        await updateLesson({
          lessonId: lessonToEdit._id,
          data: dataToSend
        }).unwrap();
        toast.success("Session updated successfully");
      } else {
        await createLesson(dataToSend).unwrap();
        toast.success("Session created successfully");
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
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

          {!propGroupId && !isEditMode && (
             <div className="space-y-2">
               <Label className="text-red-500 font-bold">Select Group *</Label>
               <Select 
                 value={formData.groupId} 
                 onValueChange={(val) => setFormData({ ...formData, groupId: val })}
               >
                 <SelectTrigger>
                   <SelectValue placeholder="Choose a group..." />
                 </SelectTrigger>
                 <SelectContent>
                   {teacherGroups.length > 0 ? (
                     teacherGroups.map((group) => (
                       <SelectItem key={group._id} value={group._id}>
                         {group.title}
                       </SelectItem>
                     ))
                   ) : (
                     <div className="p-2 text-sm text-gray-500 text-center">No groups found</div>
                   )}
                 </SelectContent>
               </Select>
             </div>
          )}

          <div className="space-y-2">
            <Label>Session Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Session Title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formData.type}
                onValueChange={(val) => setFormData({ ...formData, type: val })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="offline">Center (Offline)</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === 'online' ? (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
              <Label className="text-blue-600">Meeting Link</Label>
              <Input
                type="url"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>
          ) : (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
              <Label className="text-pink-600">Location / Address</Label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Center Address"
                required
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-[#FF4667] hover:bg-[#ff2e53]" disabled={isLoading}>
              {isLoading ? <Spinner size={20} /> : (isEditMode ? "Save Changes" : "Schedule Session")}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}