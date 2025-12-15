"use client";

import { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Users, CheckCircle2, Lock, Edit3, Calendar, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MediaUploader from "@/components/teacherCreateCourse/MediaUploader";
import GroupModal from "@/components/teacherCreateCourse/GroupModal";
import { useCreateCourseMutation, useUpdateCourseMutation } from "@/redux/api/endPoints/coursesApiSlice";
import { useCreateGroupMutation } from "@/redux/api/endPoints/groupsApiSlice";
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

export default function CreateCoursePage() {
  const router = useRouter();

  const [updateCourse] = useUpdateCourseMutation();
  const [createCourse, { isLoading: isCourseLoading }] = useCreateCourseMutation();
  const [createGroup, { isLoading: isGroupLoading }] = useCreateGroupMutation();

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editingGroupIndex, setEditingGroupIndex] = useState(null);

  const [initialFormValues, setInitialFormValues] = useState({
    title: "",
    subTitle: "",
    description: "",
    subject: "",
    gradeLevel: "",
    courseLanguage: "English",
    tags: [],
    thumbnail: null,
    video: null,
    groups: [],
  });

  useEffect(() => {
    const draft = localStorage.getItem("courseDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setInitialFormValues((prev) => ({
          ...prev,
          ...parsedDraft,
          // Ensure arrays/objects are properly merged if draft is partial
          tags: parsedDraft.tags || [],
          groups: parsedDraft.groups || [],
        }));
        toast.success("AI Draft Loaded Successfully! 🤖✨");
        localStorage.removeItem("courseDraft"); // Clear after loading
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

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

  const handleOpenGroupModal = (groupToEdit = null, index = null) => {
    if (groupToEdit) {
      setTempGroup(groupToEdit);
      setEditingGroupIndex(index);
    } else {
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
      setEditingGroupIndex(null);
    }
    setIsGroupModalOpen(true);
  };

  const handleFinalSubmit = async (values, actionType) => {
    if (actionType === "publish" && values.groups.length === 0) {
      toast.error("You must add at least one group to send for review.");
      return;
    }

    try {
      let cleanThumbnail = undefined;
      if (values.thumbnail && values.thumbnail.url) {
        cleanThumbnail = {
          url: values.thumbnail.url,
          publicId: values.thumbnail.publicId,
          type: values.thumbnail.type || "image",
        };
      }

      let cleanVideo = undefined;
      if (values.video && values.video.url) {
        cleanVideo = {
          url: values.video.url,
          publicId: values.video.publicId,
          type: values.video.type || "video",
        };
      }

      const payload = {
        title: values.title,
        subTitle: values.subTitle,
        description: values.description,
        subject: values.subject,
        gradeLevel: values.gradeLevel,
        courseLanguage: values.courseLanguage,
        status: "draft",
        tags: values.tags,
        thumbnail: cleanThumbnail,
        video: cleanVideo,
      };

      const courseRes = await createCourse(payload).unwrap();
      const newCourseId = courseRes.data?._id || courseRes._id;

      if (values.groups.length > 0) {
        const groupPromises = values.groups.map((uiGroup) => {
          const groupPayload = {
            courseId: newCourseId,
            title: uiGroup.title,
            description: uiGroup.description,
            type: uiGroup.type,
            capacity: Number(uiGroup.capacity),
            price: Number(uiGroup.price),
            startingDate: uiGroup.startingDate,
            startingTime: uiGroup.schedule[0]?.time || "00:00",
            ...(uiGroup.type !== "online" && { location: uiGroup.location }),
            ...(uiGroup.type !== "offline" && { link: uiGroup.link }),
            schedule: uiGroup.schedule.map((slot) => ({
              day: DAY_MAP_TO_BACKEND[slot.day],
              time: slot.time,
            })),
          };
          return createGroup(groupPayload).unwrap();
        });
        await Promise.all(groupPromises);
      }

      if (actionType === "publish") {
        await updateCourse({
          courseId: newCourseId,
          data: { title: values.title, status: "in-review" },
        }).unwrap();
      }

      toast.success(actionType === "publish" ? "Course Created & Sent for Review! " : "Draft Saved! ");
      router.push("/dashboard/teacher/courses");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save course.");
    }
  };

  const isLoading = isCourseLoading || isGroupLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="">
        <div className="max-w-7xl px-6 lg:px-8 py-1">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Create New Course</h1>
        </div>
      </header>

      <main className="max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <Formik
          initialValues={initialFormValues}
          enableReinitialize={true}
          onSubmit={() => { }}
        >
          {({ values, setFieldValue }) => (
            <>
              <Form className="space-y-8 pb-36">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <section className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6" style={{ minHeight: "calc(100vh - 360px)" }}>
                      <CourseBasicInfo values={values} setFieldValue={setFieldValue} onAddGroup={() => { }} />
                    </div>
                  </section>

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
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Users className="text-[#FF4667]" size={20} />
                      <h2 className="text-lg font-semibold text-gray-800">
                        Course groups {values.groups.length > 0 && `(${values.groups.length})`}
                      </h2>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleOpenGroupModal()}
                      className="bg-pink-600 text-white  border border-blue-200 "
                    >
                      <Plus size={16} className="mr-2" /> Add group
                    </Button>
                  </div>

                  {values.groups.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-400 text-sm">No batches added yet. Click "Add Batch" to start.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FieldArray name="groups">
                        {({ remove }) => (
                          <>
                            {values.groups.map((group, idx) => (
                              <article key={idx} className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-[#FF4667] hover:shadow-lg transition flex flex-col">
                                <div className="flex justify-between items-start mb-3 gap-3">
                                  <h4 className="font-semibold text-gray-900 truncate max-w-[70%]">{group.title}</h4>
                                  <span className={`text-[11px] px-2 py-1 rounded uppercase font-semibold ${group.type === "online" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                                    {group.type}
                                  </span>
                                </div>

                                <div className="space-y-2 text-xs text-gray-500 mb-4">
                                  <div className="flex items-center gap-2">
                                    <Users size={14} /> <span className="truncate">{group.capacity} Students</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <DollarSign size={14} /> <span className="truncate text-green-700 font-bold">{group.price} $</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar size={14} /> <span className="truncate">{group.startingDate}</span>
                                  </div>
                                </div>

                                <div className="flex gap-3 border-t pt-3 mt-auto">
                                  <Button type="button" variant="outline" size="sm" onClick={() => handleOpenGroupModal(group, idx)} className="w-full h-9 text-xs">
                                    <Edit3 size={14} className="mr-1" /> Edit
                                  </Button>
                                </div>
                              </article>
                            ))}
                          </>
                        )}
                      </FieldArray>
                    </div>
                  )}
                </div>

                <GroupModal
                  isOpen={isGroupModalOpen}
                  onClose={() => setIsGroupModalOpen(false)}
                  tempGroup={tempGroup}
                  setTempGroup={setTempGroup}
                  isEditing={editingGroupIndex !== null}
                  onSave={() => {
                    if (tempGroup.title.length < 5) return toast.error("Title > 5 chars");
                    if (!tempGroup.price) return toast.error("Price required");

                    const currentGroups = [...values.groups];
                    if (editingGroupIndex !== null) {
                      currentGroups[editingGroupIndex] = tempGroup;
                      toast.success("Batch Updated");
                    } else {
                      currentGroups.push(tempGroup);
                      toast.success("Batch Added");
                    }
                    setFieldValue("groups", currentGroups);
                    setIsGroupModalOpen(false);
                  }}
                />
              </Form>

              <div className="fixed bottom-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="hidden sm:flex items-center gap-3">
                      {values.groups.length > 0 ? (
                        <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                          <CheckCircle2 size={18} /> Ready to send
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
                          <Lock size={16} /> Add batch to Publish
                        </span>
                      )}
                    </div>

                    <div className="w-full sm:w-auto flex gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        disabled={isLoading}
                        onClick={() => handleFinalSubmit(values, "draft")}
                        className="flex-1 sm:flex-none px-6 py-2"
                      >
                        {isLoading ? "Saving..." : "Save Draft"}
                      </Button>

                      <Button
                        type="button"
                        disabled={values.groups.length === 0 || isLoading}
                        onClick={() => handleFinalSubmit(values, "publish")}
                        className={`flex-1 sm:flex-none px-6 py-2 text-white ${values.groups.length === 0 ? "bg-gray-300" : "bg-[#FF4667] hover:bg-[#ff2e53]"}`}
                      >
                        {isLoading ? "Processing..." : "Create & Send to Review"}
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