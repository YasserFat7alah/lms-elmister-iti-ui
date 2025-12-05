"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link"; 
import { 
  useGetMeQuery, 
  useUpdateMeMutation 
} from "@/redux/api/endPoints/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

import { Spinner } from "@/components/shared/Loader";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { 
    Camera, Save, User, Mail, Phone, Lock, ChevronRight, Edit, X 
} from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";  
export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: userData, isLoading: isFetching } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();

  const [isEditing, setIsEditing] = useState(false);
  const profileImageRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    joinedAt: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (userData) {
      const user = userData.data?.user || userData.data || userData;
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "Student",
        joinedAt: new Date(user.createdAt).toLocaleDateString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric'
        }),
      }));

      if (user.avatar?.url) {
        setProfileImage({ preview: user.avatar.url });
      }
    }
  }, [userData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage({ file: file, preview: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const dataToSend = new FormData();
      
      dataToSend.append("name", formData.name);
      dataToSend.append("phone", formData.phone);
      
      if (profileImage?.file) {
        dataToSend.append("avatar", profileImage.file);
      }

      const res = await updateMe(dataToSend).unwrap();
      const updatedUser = res.data?.user || res.data || res;
      
      const newUserInfo = {
        ...userInfo, 
        user: { ...userInfo.user, ...updatedUser }
      };

      dispatch(setCredentials(newUserInfo));
      setIsEditing(false);

    } catch (err) {
      console.error("Update Error:", err);
      const msg = err?.data?.message || err?.error || "Update Failed";
      alert(msg);
    }
  };

  const handleCancel = () => {
      setIsEditing(false);
  };

  if (isFetching) return <div className="flex justify-center items-center h-[50vh]"><Spinner /></div>;

  return (
    <div className="max-w-7xl  space-y-6 pb-10">
       
       <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            <div className="relative group shrink-0">
              <div className="w-28 h-28 rounded-full p-1 border-2 border-gray-100 shadow-sm bg-white">
                <div className="w-full h-full bg-gray-50 rounded-full flex items-center justify-center overflow-hidden relative">
                  {profileImage?.preview ? (
                    <img src={profileImage.preview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-gray-400">{formData.name.charAt(0).toUpperCase()}</span>
                  )}
                  
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full" onClick={() => profileImageRef.current?.click()}>
                      <Camera className="text-white" size={24} />
                      <input type="file" ref={profileImageRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-1">
               <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
               <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="capitalize px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-medium">{formData.role}</span>
                  <span className="flex items-center gap-1"><Mail size={14}/> {formData.email}</span>
                  <span className="text-gray-400">Joined {formData.joinedAt}</span>
               </div>
            </div>

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

       <Card className="border-none shadow-sm bg-white">
         <CardContent className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-[#FF0055]" /> Basic Information
            </h2>
            
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Full Name</Label>
                        {isEditing ? (
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <Input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={(e) => handleChange('name', e.target.value)} 
                                    className="pl-10 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] outline-none transition-all"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-900 font-medium bg-gray-50 px-4 py-2 rounded-lg border border-transparent">{formData.name}</p>
                        )}
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Email Address</Label>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed">
                            <Mail size={18} /> {formData.email}
                        </div>
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</Label>
                        {isEditing ? (
                             <div className="relative">
                                <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <Input 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={(e) => handleChange('phone', e.target.value)} 
                                    className="pl-10 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] outline-none"
                                />
                            </div>
                        ) : (
                             <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-transparent rounded-lg text-gray-900 font-medium">
                                <Phone size={18} className="text-gray-400" /> {formData.phone || "N/A"}
                             </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm">Security</h3>
                        <p className="text-xs text-gray-500">Manage your password and account security</p>
                    </div>
                    <Link href="/dashboard/student/profile/changepassword"> 
                        <Button type="button" variant="outline" className="border-gray-200 hover:bg-gray-50 text-gray-700 h-9">
                            <Lock size={14} className="mr-2" /> Change Password
                        </Button>
                    </Link>
                </div>
            </div>
         </CardContent>
       </Card>
    </div>
  );
}