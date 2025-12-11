"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { Users, CheckCircle2, Lock, Trash2, Edit3, ArrowLeft, Loader2, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";

import MediaUploader from "@/components/teacherCreateCourse/MediaUploader";
import GroupModal from "@/components/teacherCreateCourse/GroupModal";

import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "@/redux/api/endPoints/coursesApiSlice";

import {
  useGetGroupsByCourseQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
} from "@/redux/api/endPoints/groupsApiSlice";
import CourseBasicInfo from "@/components/teacherCreateCourse/CourseBasicInfo";

const DAY_MAP_TO_BACKEND = {
  Saturday: "sat",
  Sunday: "sun",
  Monday: "mon",
  Tuesday: "tue",
  Wednesday: "wed",
  Thursday: "thu",
  Friday: "fri",
};
const DAY_MAP_FROM_BACKEND = { sat: "Saturday", sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday" };

export default function EditCoursePage() {
  const { id: courseId } = useParams();
  const router = useRouter();

  const { data: courseData, isLoading: isLoadingCourse } = useGetCourseByIdQuery(courseId);
  const { data: groupsData, isLoading: isLoadingGroups } = useGetGroupsByCourseQuery(courseId);

  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [deleteCourse, { isLoading: isDeletingCourse }] = useDeleteCourseMutation();

  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);

  const [tempGroup, setTempGroup] = useState({
    title: "",
    description: "",
    type: "online",
    price: "",
    capacity: "",
    startingDate: "",
    link: "",
    location: "",
    schedule: [{ day: "Monday", time: "14:00" }],
  });

  const course = courseData?.data || courseData;
  const groups = groupsData?.data || groupsData || [];

  const handleOpenGroupModal = (groupToEdit = null) => {
    if (groupToEdit) {
      setEditingGroupId(groupToEdit._id);
      setTempGroup({
        title: groupToEdit.title,
        description: groupToEdit.description || "",
        type: groupToEdit.type,
        price: groupToEdit.price,
        capacity: groupToEdit.capacity,
        startingDate: groupToEdit.startingDate ? new Date(groupToEdit.startingDate).toISOString().split("T")[0] : "",
        link: groupToEdit.link || "",
        location: groupToEdit.location || "",
        schedule: groupToEdit.schedule?.map((s) => ({
          day: DAY_MAP_FROM_BACKEND[s.day] || "Monday",
          time: s.time,
        })) || [{ day: "Monday", time: "14:00" }],
      });
    } else {
      setEditingGroupId(null);
      setTempGroup({
        title: "",
        description: "",
        type: "online",
        price: "",
        capacity: "",
        startingDate: "",
        link: "",
        location: "",
        schedule: [{ day: "Monday", time: "14:00" }],
      });
    }
    setIsGroupModalOpen(true);
  };

  const handleFinalSubmit = async (values, actionType) => {
    if (actionType === "publish" && groups.length === 0) {
      toast.error("You must have at least one active group to publish.");
      return;
    }

    try {
      const payload = {
        title: values.title,
        subTitle: values.subTitle,
        description: values.description,
        subject: values.subject,
        gradeLevel: values.gradeLevel,
        courseLanguage: values.courseLanguage,
        tags: values.tags,
        status: actionType === "publish" ? "in-review" : "draft",
        thumbnail: values.thumbnail || null,
        video: values.video || null,
      };

      await updateCourse({ courseId, data: payload }).unwrap();

      toast.success(actionType === "publish" ? "Course Updated & Sent for Review! 🚀" : "Course Updated to Draft! 💾");
      router.push("/dashboard/teacher/courses");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update course");
    }
  };

  const handleSaveGroup = async () => {
    if (tempGroup.title.length < 5) return toast.error("Group title > 5 chars");
    if (!tempGroup.price) return toast.error("Price required");

    const payload = {
      courseId,
      title: tempGroup.title,
      description: tempGroup.description,
      type: tempGroup.type,
      capacity: Number(tempGroup.capacity),
      price: Number(tempGroup.price),
      startingDate: tempGroup.startingDate,
      startingTime: tempGroup.schedule[0]?.time || "00:00",
      ...(tempGroup.type !== "online" && { location: tempGroup.location }),
      ...(tempGroup.type !== "offline" && { link: tempGroup.link }),
      schedule: tempGroup.schedule.map((s) => ({ day: DAY_MAP_TO_BACKEND[s.day], time: s.time })),
    };

    try {
      if (editingGroupId) {
        await updateGroup({ groupId: editingGroupId, data: payload }).unwrap();
        toast.success("Group Updated!");
      } else {
        await createGroup(payload).unwrap();
        toast.success("Group Added!");
      }
      setIsGroupModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save group");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    const isLastGroup = groups.length === 1;
    const shouldWarn = isLastGroup && (course?.status === "in-review" || course?.status === "published");

    if (!confirm(shouldWarn ? "Warning: Removing the last group will reset course to DRAFT. Continue?" : "Delete this group?")) return;

    try {
      await deleteGroup(groupId).unwrap();
      if (shouldWarn) {
        await updateCourse({ courseId, data: { status: "draft" } }).unwrap();
        toast("Course reverted to Draft", { icon: "⚠️" });
      } else {
        toast.success("Group Deleted");
      }
    } catch (err) {
      toast.error("Failed to delete group");
    }
  };

  const handleDeleteCourse = async () => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await deleteCourse(courseId).unwrap();
      toast.success("Course Deleted");
      router.push("/dashboard/teacher/courses");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  if (isLoadingCourse || isLoadingGroups) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className=" ">
        <div className="max-w-7xl  px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Edit Course</h1>
              {course && <span className={`text-xs uppercase font-bold tracking-wider ${course.status === "published" ? "text-green-600" : "text-amber-500"}`}>{course.status}</span>}
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={handleDeleteCourse} className="text-red-500 hover:bg-red-50">
            {isDeletingCourse ? <Loader2 className="animate-spin" /> : <Trash2 size={18} className="mr-2" />}
            Delete Course
          </Button>
        </div>
      </header>

      <main className="max-w-7xl  px-4 sm:px-6 lg:px-8 py-4">
        <Formik
        enableReinitialize={true}
          initialValues={{
            title: course.title || "",
            subTitle: course.subTitle || "",
            description: course.description || "",
            subject: course.subject || "",
            gradeLevel: course.gradeLevel || "",
            courseLanguage: course.courseLanguage || course.language || "English",
            tags: course.tags || [],
            thumbnail: course.thumbnail || null,
            video: course.video || null,
          }}
          onSubmit={() => {}}
        >
          {({ values, setFieldValue }) => (
            <>
              <Form className="space-y-8 pb-36">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6" style={{ minHeight: "calc(100vh - 360px)" }}>
                      <CourseBasicInfo values={values} setFieldValue={setFieldValue} onAddGroup={() => handleOpenGroupModal()} />
                    </div>
                  </div>

                  <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">Media Assets</h2>

                        <div>
                          <MediaUploader
                            label="Course Thumbnail"
                            accept="image/*"
                            type="image"
                            folderPath="courses/thumbnails"
                            currentFileUrl={values.thumbnail?.url}
                            onUploadComplete={(res) => setFieldValue("thumbnail", res)}
                            onRemove={() => setFieldValue("thumbnail", null)}
                          />
                        </div>

                        <div>
                          <MediaUploader
                            label="Promo Video"
                            accept="video/*"
                            type="video"
                            folderPath="courses/videos"
                            currentFileUrl={values.video?.url}
                            onUploadComplete={(res) => setFieldValue("video", res)}
                            onRemove={() => setFieldValue("video", null)}
                          />
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="text-[#FF4667]" size={20} />
                    <h2 className="text-lg font-semibold text-gray-800">
                      Manage Batches <span className="text-xs bg-gray-100 px-2 py-1 rounded-full ml-2 text-gray-600">{groups.length}</span>
                    </h2>
                  </div>

                  {groups.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 border border-dashed rounded-lg bg-gray-50">No active groups. Add one to publish.</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groups.map((group) => (
                        <article key={group._id} className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-[#FF4667] hover:shadow-lg transition flex flex-col">
                          <div className="flex justify-between items-start mb-3 gap-3">
                            <h4 className="font-semibold text-gray-900 truncate max-w-[70%]">{group.title}</h4>
                            <span className="text-[11px] px-2 py-1 rounded uppercase font-semibold {group.type === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}">
                              {group.type}
                            </span>
                          </div>

                          <div className="space-y-2 text-xs text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <Users size={14} /> <span className="truncate">{group.capacity} Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign size={14} /> <span className="truncate">{group.price} EGP</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={14} /> <span className="truncate">{new Date(group.startingDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex gap-3 border-t pt-3 mt-auto">
                            <Button type="button" variant="outline" size="sm" onClick={() => handleOpenGroupModal(group)} className="flex-1 h-9 text-xs">
                              <Edit3 size={14} className="mr-1" /> Edit
                            </Button>
                            <Button type="button" variant="ghost" size="sm" onClick={() => handleDeleteGroup(group._id)} className="h-9 w-9 p-0 text-red-500 hover:text-red-700">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                <GroupModal
                  isOpen={isGroupModalOpen}
                  onClose={() => setIsGroupModalOpen(false)}
                  tempGroup={tempGroup}
                  setTempGroup={setTempGroup}
                  isEditing={!!editingGroupId}
                  onSave={handleSaveGroup}
                />
              </Form>

              <div className="fixed bottom-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="hidden sm:flex items-center gap-3">
                      {groups.length > 0 ? (
                        <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                          <CheckCircle2 size={18} /> Groups Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
                          <Lock size={16} /> Add group to Publish
                        </span>
                      )}
                    </div>

                    <div className="w-full sm:w-auto flex gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        disabled={isUpdating}
                        onClick={() => handleFinalSubmit(values, "draft")}
                        className="flex-1 sm:flex-none px-6 py-2"
                      >
                        {isUpdating ? "Saving..." : "Save as Draft"}
                      </Button>

                      <Button
                        type="button"
                        disabled={groups.length === 0 || isUpdating}
                        onClick={() => handleFinalSubmit(values, "publish")}
                        className={`flex-1 sm:flex-none px-6 py-2 text-white ${groups.length === 0 ? "bg-gray-300" : "bg-[#FF4667] hover:bg-[#ff2e53]"}`}
                      >
                        {isUpdating ? "Publishing..." : "Update & Publish"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Formik>
      </main>
    </div>
  );
}
