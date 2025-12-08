"use client";

import { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Users, CheckCircle2, AlertTriangle, Trash2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

import CourseBasicInfo from "@/components/teacherCreateCourse/CourseBasicInfo";
import GroupForm from "@/components/teacherCreateCourse/GroupForm";
import { CourseThumbnail } from "@/components/teacherCreateCourse/FormHelpers";

import { useCreateCourseMutation, useUpdateCourseMutation } from "@/redux/api/endPoints/coursesApiSlice";
import { useCreateGroupMutation } from "@/redux/api/endPoints/groupsApiSlice";

const DAY_MAP_TO_BACKEND = { "Saturday": "sat", "Sunday": "sun", "Monday": "mon", "Tuesday": "tue", "Wednesday": "wed", "Thursday": "thu", "Friday": "fri" };

export default function CreateCoursePage() {
  const router = useRouter();
  const [updateCourse] = useUpdateCourseMutation();
  const [createCourse, { isLoading: isCourseLoading }] = useCreateCourseMutation();
  const [createGroup, { isLoading: isGroupLoading }] = useCreateGroupMutation();

  const [tempGroup, setTempGroup] = useState({
    title: "", description: "", type: "online", price: "", capacity: "", startingDate: "",
    link: "", location: "", schedule: [{ day: "Monday", time: "14:00" }]
  });

  const handleFinalSubmit = async (values, actionType) => {
    if (actionType === "publish" && values.groups.length === 0) {
      toast.error("You must add at least one group to publish.");
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
      formData.append("status", "draft");

      values.tags.forEach(t => formData.append("tags", t));
      if (values.thumbnailFile) formData.append("thumbnail", values.thumbnailFile);

      const courseRes = await createCourse(formData).unwrap();
      const newCourseId = courseRes.data?._id || courseRes._id;

      if (values.groups.length > 0) {
        const groupPromises = values.groups.map(uiGroup => {
          return createGroup({
            courseId: newCourseId,
            title: uiGroup.title,
            description: uiGroup.description,
            type: uiGroup.type,
            capacity: Number(uiGroup.capacity),
            startingDate: uiGroup.startingDate,
            startingTime: uiGroup.schedule[0]?.time || "12:00",
            price: Number(uiGroup.price),
            ...(uiGroup.type !== 'online' && { location: uiGroup.location }),
            ...(uiGroup.type !== 'offline' && { link: uiGroup.link }),
            schedule: uiGroup.schedule.map(slot => ({
              day: DAY_MAP_TO_BACKEND[slot.day],
              time: slot.time
            }))
          }).unwrap();
        });
        await Promise.all(groupPromises);
      }

      if (actionType === "publish") {
        const updateFormData = new FormData();
        updateFormData.append("title", values.title);
        updateFormData.append("status", "in-review");
        await updateCourse({ courseId: newCourseId, data: updateFormData }).unwrap();
      }

      toast.success(actionType === "publish" ? "Course Sent for Review! 🚀" : "Draft Saved! 💾");
      router.push("/dashboard/teacher/courses");

    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save course.");
    }
  };

  const isLoading = isCourseLoading || isGroupLoading;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      <div className="py-6 px-4 mb-4">
        <div className="max-w-7xl">
          <h1 className="text-2xl font-bold text-gray-800">Create New Course</h1>
        </div>
      </div>

      <div className="max-w-7xl px-4">
        <Formik
          initialValues={{
            title: "", subTitle: "", description: "", subject: "", gradeLevel: "",
            courseLanguage: "English", tags: [], thumbnailFile: null, previewUrl: "", groups: []
          }}
          onSubmit={() => { }}
        >
          {({ values, setFieldValue }) => (
            <Form className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2 space-y-8">
                <CourseBasicInfo values={values} setFieldValue={setFieldValue} />

                <div className="lg:hidden">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-3">Thumbnail Preview</h3>
                    <CourseThumbnail previewUrl={values.previewUrl} setFieldValue={setFieldValue} className="h-36" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6 border-b pb-4">
                    <Users className="text-[#FF4667]" size={20} />
                    <h2 className="text-lg font-bold text-gray-800">Groups & Batches</h2>
                  </div>

                  <FieldArray name="groups">
                    {({ push }) => (
                      <GroupForm
                        tempGroup={tempGroup}
                        setTempGroup={setTempGroup}
                        isEditing={false}
                        isLoading={false}
                        onSave={() => {
                          if (tempGroup.title.length < 5) return toast.error("Group title > 5 chars");
                          if (!tempGroup.price || !tempGroup.capacity || !tempGroup.startingDate) return toast.error("Missing fields");
                          push({ ...tempGroup });
                          setTempGroup({ title: "", description: "", type: "online", price: "", capacity: "", startingDate: "", link: "", location: "", schedule: [{ day: "Monday", time: "14:00" }] });
                          toast.success("Group Added");
                        }}
                      />
                    )}
                  </FieldArray>

                  {values.groups.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h3 className="font-bold text-gray-700 text-sm">Added Groups ({values.groups.length})</h3>
                      <FieldArray name="groups">
                        {({ remove }) => (
                          <div className="grid gap-3">
                            {values.groups.map((group, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-lg border flex justify-between items-center shadow-sm">
                                <div>
                                  <h4 className="font-bold">{group.title} <span className="text-xs bg-blue-50 px-2 rounded uppercase text-blue-600">{group.type}</span></h4>
                                  <div className="text-xs text-gray-500 mt-1">{group.capacity} Students • {group.price} EGP</div>
                                </div>
                                <button type="button" onClick={() => remove(idx)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                              </div>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  )}
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
                    {values.groups.length > 0
                      ? <span className="text-green-600 font-medium flex items-center gap-2"><CheckCircle2 size={18} /> Ready to publish</span>
                      : <span className="text-gray-400 text-sm flex items-center gap-2"><Lock size={16} /> Add group to unlock Publish</span>
                    }
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={isLoading}
                      onClick={() => handleFinalSubmit(values, "draft")}
                      className="flex-1"
                    >
                      {isLoading ? "Saving..." : "Save Draft"}
                    </Button>

                    <Button
                      type="button"
                      disabled={values.groups.length === 0 || isLoading}
                      onClick={() => handleFinalSubmit(values, "publish")}
                      className={`flex-1 text-white transition-all ${values.groups.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#FF4667] hover:bg-[#ff2e53]"}`}
                    >
                      {isLoading ? "Publishing..." : values.groups.length === 0 ? "Add Group First" : "Publish Course"}
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
