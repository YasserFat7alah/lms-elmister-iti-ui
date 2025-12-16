"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMeQuery,
  useUpdateMeMutation
} from "@/redux/api/endPoints/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { Spinner } from "@/components/shared/Loader";
import {
  User, Mail, Phone, Camera, Edit, Save, X,
  Briefcase, GraduationCap, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

const TeacherProfile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: userData, isLoading: isFetching, refetch } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();

  const [isEditing, setIsEditing] = useState(false);
  const profileImageRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    subjects: "", // Managing as comma-separated string for editing simplicity
    yearsOfExperience: 0,
  });

  const [readOnlyData, setReadOnlyData] = useState({
    email: "",
    role: "",
    joinedAt: "",
    qualifications: [],
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (userData) {
      const user = userData.data?.user || userData.data || userData;
      const teacherInfo = user.teacherData || {};

      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        bio: teacherInfo.bio || "",
        subjects: Array.isArray(teacherInfo.subjects) ? teacherInfo.subjects.join(", ") : "",
        yearsOfExperience: teacherInfo.yearsOfExperience || 0,
      });

      setReadOnlyData({
        email: user.email || "",
        role: user.role || "teacher",
        joinedAt: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
          : "N/A",
        qualifications: teacherInfo.qualifications || [],
      });

      if (user.avatar?.url) {
        setProfileImage({ preview: user.avatar.url });
      }
    }
  }, [userData]);

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage({ file: file, preview: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) { toast.error("Name is required"); return false; }
    // Basic phone validation (Egypt + General)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (formData.phone && !phoneRegex.test(formData.phone)) { toast.error("Please enter a valid phone number"); return false; }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("phone", formData.phone);
      submitData.append("bio", formData.bio);
      submitData.append("yearsOfExperience", formData.yearsOfExperience);

      // Send subjects as a raw string or split it here. 
      // Backend now handles comma-separated strings/parsing, so sending the string is fine, or we can clean it up.
      // Let's send the raw string to let backend split (consistent with our backend change).
      submitData.append("subjects", formData.subjects);

      if (profileImage?.file) {
        submitData.append("avatar", profileImage.file);
      }

      const res = await updateMe(submitData).unwrap();
      const updatedUser = res.data?.user || res.data || res;

      dispatch(setCredentials({ ...userInfo, user: { ...userInfo.user, ...updatedUser } }));

      setIsEditing(false);
      refetch();
      toast.success("Profile updated successfully!");

    } catch (err) {
      console.error("Update failed", err);
      toast.error(err?.data?.message || "Update failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      // Reset to initial
      const user = userData.data?.user || userData.data;
      const teacherInfo = user.teacherData || {};
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        bio: teacherInfo.bio || "",
        subjects: Array.isArray(teacherInfo.subjects) ? teacherInfo.subjects.join(", ") : "",
        yearsOfExperience: teacherInfo.yearsOfExperience || 0,
      });
      setProfileImage(user.avatar?.url ? { preview: user.avatar.url } : null);
    }
  };

  if (isFetching) return <div className="flex justify-center items-center h-[50vh]"><Spinner /></div>;

  return (
    <div className="max-w-7xl space-y-6 pb-10">

      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

            <div className="relative group shrink-0">
              <div className="w-28 h-28 rounded-full p-1 border-2 border-gray-100 shadow-sm bg-white">
                <div className="w-full h-full bg-gray-50 rounded-full flex items-center justify-center overflow-hidden relative">
                  {profileImage?.preview ? (
                    <img src={profileImage.preview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-gray-400">{formData.name?.charAt(0)?.toUpperCase()}</span>
                  )}

                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full" onClick={() => profileImageRef.current?.click()}>
                      <Camera className="text-white" size={24} />
                      <input type="file" ref={profileImageRef} onChange={handleProfileImageUpload} accept="image/*" className="hidden" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                <span className="capitalize px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-medium">{readOnlyData.role}</span>
                <span className="flex items-center gap-1"><Mail size={14} /> {readOnlyData.email}</span>
                <span className="text-gray-400">Joined {readOnlyData.joinedAt}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 md:mt-0 shrink-0">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-[#FF0055] hover:bg-pink-700 text-white">
                  <Edit size={16} className="mr-2" /> Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} disabled={isUpdating} className="bg-[#FF0055] hover:bg-pink-700 text-white min-w-[100px]">
                    {isUpdating ? <Spinner className="text-white mr-2" /> : <Save size={16} className="mr-2" />} Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="border-gray-200 hover:bg-gray-50 text-gray-700">
                    <X size={16} className="mr-2" /> Cancel
                  </Button>
                </>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- Main Info Column --- */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User size={20} className="text-[#FF0055]" /> Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] outline-none transition-all"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium bg-gray-50 px-4 py-2 rounded-lg border border-transparent">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed">
                    <Mail size={16} /> {readOnlyData.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-transparent rounded-lg text-gray-900 font-medium">
                      <Phone size={16} className="text-gray-400" /> {formData.phone || "N/A"}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] outline-none transition-all resize-none"
                    placeholder="Tell students about yourself..."
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {formData.bio || "No biography added yet."}
                  </div>
                )}
              </div>

            </CardContent>
          </Card>
        </div>

        {/* --- Side Info Column --- */}
        <div className="space-y-6">

          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-[#FF0055]" /> Teaching Subjects
              </h2>

              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={formData.subjects}
                    onChange={(e) => handleInputChange('subjects', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] outline-none transition-all"
                    placeholder="e.g. Math, Physics, Science (comma separated)"
                  />
                  <p className="text-xs text-gray-400 mt-2">Separate subjects with commas.</p>
                </div>
              ) : (
                <>
                  {formData.subjects && formData.subjects.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {/* formData.subjects is string in edit mode, need to split for display if it's not array. 
                        But on Save it becomes array in Backend. On Load it enters state as string.
                        Wait, readOnlyData for non-editing mode used to rely on userData.
                        Let's use a derived array for display from formData.subjects string.
                    */}
                      {formData.subjects.split(',').filter(Boolean).map((subject, index) => (
                        <div key={index} className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium">
                          {subject.trim()}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No subjects listed yet.</p>
                  )}
                </>
              )}

            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-[#FF0055]" /> Experience
              </h2>
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 items-center">
                <div className="w-2 h-2 bg-[#FF0055] rounded-full shrink-0"></div>
                <div className="w-full">
                  <h3 className="font-semibold text-gray-900">Teaching Experience</h3>
                  {isEditing ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        min="0"
                        value={formData.yearsOfExperience}
                        onChange={(e) => handleInputChange('yearsOfExperience', Number(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#FF0055]/20 outline-none"
                      />
                      <span className="text-sm text-gray-500">Years</span>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm mt-1">
                      {formData.yearsOfExperience > 0
                        ? `${formData.yearsOfExperience} Years.`
                        : "Fresh Instructor"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-[#FF0055]" /> Education
              </h2>
              <div className="space-y-6">
                {readOnlyData.qualifications.length > 0 ? (
                  readOnlyData.qualifications.map((qual, index) => (
                    <div key={index} className="pl-4 border-l-2 border-[#FF0055]">
                      <h3 className="font-semibold text-gray-900 text-sm">{qual.degree}</h3>
                      <p className="text-gray-500 text-xs mt-1">{qual.university}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No education details.</p>
                )}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
};

export default TeacherProfile;