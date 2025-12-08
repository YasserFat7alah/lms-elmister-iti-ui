"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FieldArray } from "formik";
import { toast } from "react-hot-toast";
import { Users, CheckCircle2, Trash2, Edit3, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";

import GroupForm from "@/components/teacherCreateCourse/GroupForm";
import { CourseThumbnail } from "@/components/teacherCreateCourse/FormHelpers";
import CourseBasicInfo from "@/components/teacherCreateCourse/CourseBasicInfo";

import { useGetCourseByIdQuery, useUpdateCourseMutation } from "@/redux/api/endPoints/coursesApiSlice";
import {
  useGetGroupsByCourseQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation
} from "@/redux/api/endPoints/groupsApiSlice";

const DAY_MAP_TO_BACKEND = { "Saturday": "sat", "Sunday": "sun", "Monday": "mon", "Tuesday": "tue", "Wednesday": "wed", "Thursday": "thu", "Friday": "fri" };
const DAY_MAP_FROM_BACKEND = { "sat": "Saturday", "sun": "Sunday", "mon": "Monday", "tue": "Tuesday", "wed": "Wednesday", "thu": "Thursday", "fri": "Friday" };

export default function EditCoursePage() {
  const { id: courseId } = useParams();
  const router = useRouter();

  const { data: courseData, isLoading: isLoadingCourse } = useGetCourseByIdQuery(courseId);
  const { data: groupsData, isLoading: isLoadingGroups } = useGetGroupsByCourseQuery(courseId);

  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [createGroup, { isLoading: isAddingGroup }] = useCreateGroupMutation();
  const [updateGroup, { isLoading: isUpdatingGroup }] = useUpdateGroupMutation();
  const [deleteGroup, { isLoading: isDeletingGroup }] = useDeleteGroupMutation();

  const [editingGroupId, setEditingGroupId] = useState(null);
  const [tempGroup, setTempGroup] = useState({
    title: "", description: "", type: "online", price: "", capacity: "", startingDate: "",
    link: "", location: "", schedule: [{ day: "Monday", time: "14:00" }]
  });

  const handleFinalSubmit = async (values, actionType) => {
    const currentGroups = groupsData?.data || [];

    if (actionType === "publish" && currentGroups.length === 0) {
      toast.error("You must have at least one active group to publish.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subTitle", values.subTitle);
      formData.append("description", values.description);
      formData.append("subject", values.subject);
      formData.append("gradeLevel", values.gradeLevel);
      formData.append("courseLanguage", values.courseLanguage);
      const status = actionType === "publish" ? "in-review" : "draft";
      formData.append("status", status);

      if (values.tags && values.tags.length > 0) {
        values.tags.forEach(tag => formData.append("tags", tag));
      }

      if (values.thumbnailFile) {
        formData.append("thumbnail", values.thumbnailFile);
      }

      await updateCourse({ courseId, data: formData }).unwrap();

      toast.success(actionType === "publish" ? "Course updated and sent for review" : "Course updated as draft");
      router.push("/dashboard/teacher/courses");

    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update course");
    }
  };

  const handleEditClick = (group) => {
    setEditingGroupId(group._id);
    setTempGroup({
      title: group.title,
      description: group.description || "",
      type: group.type,
      price: group.price,
      capacity: group.capacity,
      startingDate: new Date(group.startingDate).toISOString().split('T')[0],
      link: group.link || "",
      location: group.location || "",
      schedule: group.schedule.map(s => ({
        day: DAY_MAP_FROM_BACKEND[s.day] || "Monday",
        time: s.time
      }))
    });
    document.getElementById("group-form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingGroupId(null);
    setTempGroup({
      title: "", description: "", type: "online", price: "", capacity: "", startingDate: "",
      link: "", location: "", schedule: [{ day: "Monday", time: "14:00" }]
    });
  };

  const handleSaveGroup = async () => {
    if (tempGroup.title.length < 5) {
      toast.error("Group title must be at least 5 characters");
      return;
    }
    if (!tempGroup.price || !tempGroup.capacity || !tempGroup.startingDate) {
      toast.error("Required fields missing");
      return;
    }

    const payload = {
      courseId,
      title: tempGroup.title,
      description: tempGroup.description,
      type: tempGroup.type,
      capacity: Number(tempGroup.capacity),
      startingDate: tempGroup.startingDate,
      startingTime: tempGroup.schedule[0]?.time || "12:00",
      price: Number(tempGroup.price),
      ...(tempGroup.type !== 'online' && { location: tempGroup.location }),
      ...(tempGroup.type !== 'offline' && { link: tempGroup.link }),
      schedule: tempGroup.schedule.map(s => ({ day: DAY_MAP_TO_BACKEND[s.day], time: s.time }))
    };

    try {
      if (editingGroupId) {
        await updateGroup({ groupId: editingGroupId, data: payload }).unwrap();
        toast.success("Group updated");
      } else {
        await createGroup(payload).unwrap();
        toast.success("Group added");
      }
      handleCancelEdit();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save group");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    const isLastGroup = groups.length === 1;
    const shouldWarn = isLastGroup && (course.status === 'in-review' || course.status === 'published');

    const confirmMessage = shouldWarn
      ? "Warning: This is the last group. The course will be reset to draft. Continue?"
      : "Delete this group permanently?";

    if (!confirm(confirmMessage)) return;

    try {
      await deleteGroup(groupId).unwrap();

      if (shouldWarn) {
        const formData = new FormData();
        formData.append("title", course.title);
        formData.append("status", "draft");
        await updateCourse({ courseId, data: formData }).unwrap();
        toast("Course reverted to draft");
      } else {
        toast.success("Group deleted");
      }

      if (editingGroupId === groupId) handleCancelEdit();
    } catch (err) {
      toast.error("Failed to delete group");
    }
  };

  if (isLoadingCourse || isLoadingGroups) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  const course = courseData?.data || courseData;
  const groups = groupsData?.data || groupsData || [];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      <div className="bg-white border-b py-6 px-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}><ArrowLeft size={20} /></Button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Course: <span className="text-[#FF4667]">{course.title}</span></h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Formik
          initialValues={{
            title: course.title || "", subTitle: course.subTitle || "",
            description: course.description || "", subject: course.subject || "",
            gradeLevel: course.gradeLevel || "",
            courseLanguage: course.courseLanguage || course.language || "English",
            tags: course.tags || [],
            thumbnailFile: null, previewUrl: course.thumbnail?.url || "",
          }}
          onSubmit={() => { }}
        >
          {({ values, setFieldValue }) => (
            <Form className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2 space-y-8">
                <CourseBasicInfo values={values} setFieldValue={setFieldValue} />

                <div className="lg:hidden">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-3">Thumbnail</h3>
                    <CourseThumbnail previewUrl={values.previewUrl} setFieldValue={setFieldValue} className="h-36" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6 border-b pb-4">
                    <Users className="text-[#FF4667]" size={20} />
                    <h2 className="text-lg font-bold text-gray-800">Manage Groups</h2>
                  </div>

                  <div className="space-y-3 mb-8">
                    {groups.length === 0 && <p className="text-gray-400 text-sm italic">No active groups.</p>}
                    {groups.map((group) => (
                      <div key={group._id} className={`p-4 rounded-lg border flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-colors ${editingGroupId === group._id ? "bg-blue-50 border-blue-300 ring-1 ring-blue-300" : "bg-gray-50"}`}>
                        <div>
                          <h4 className="font-bold">{group.title} <span className="text-xs bg-blue-50 px-2 rounded text-blue-600 uppercase">{group.type}</span></h4>
                          <div className="text-xs text-gray-500 mt-1">{group.capacity} Students • {group.price} EGP</div>
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100" onClick={() => handleEditClick(group)}><Edit3 size={16} /></Button>
                          <Button type="button" variant="ghost" size="sm" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteGroup(group._id)}><Trash2 size={16} /></Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <GroupForm
                    tempGroup={tempGroup}
                    setTempGroup={setTempGroup}
                    isEditing={!!editingGroupId}
                    isLoading={isAddingGroup || isUpdatingGroup}
                    onSave={handleSaveGroup}
                    onCancel={handleCancelEdit}
                  />
                </div>
              </div>

              <div className="space-y-6 hidden lg:block">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <CourseThumbnail previewUrl={values.previewUrl} setFieldValue={setFieldValue} className="h-64" />
                </div>
              </div>

              <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 z-50 shadow-lg">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                  <div className="hidden sm:block">
                    {groups.length > 0
                      ? <span className="text-green-600 font-medium flex items-center gap-2"><CheckCircle2 size={18} /> Groups Ready</span>
                      : <span className="text-gray-400 text-sm flex items-center gap-2"><Lock size={16} /> Add group to unlock publish</span>
                    }
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={isUpdating}
                      onClick={() => handleFinalSubmit(values, "draft")}
                      className="flex-1"
                    >
                      {isUpdating ? "Saving..." : "Save as Draft"}
                    </Button>

                    <Button
                      type="button"
                      disabled={groups.length === 0 || isUpdating}
                      onClick={() => handleFinalSubmit(values, "publish")}
                      className={`flex-1 text-white transition-all ${groups.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#FF4667] hover:bg-[#ff2e53]"}`}
                    >
                      {isUpdating ? "Publishing..." : groups.length === 0 ? "Add Group First" : "Update & Publish"}
                    </Button>
                  </div>
                </div>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
