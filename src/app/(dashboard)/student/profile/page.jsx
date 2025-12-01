"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link"; 
import { 
  useGetMeQuery, 
  useUpdateMeMutation 
} from "@/redux/api/endPoints/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User, Mail, Phone, Lock, ChevronRight } from "lucide-react";
import { Spinner } from "@/components/shared/Loader";
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const dispatch = useDispatch();
    
  const { userInfo } = useSelector((state) => state.auth);

  const { data: userData, isLoading: isFetching } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatarFile: null,
    preview: null,
  });

  useEffect(() => {
    if (userData) {
      const user = userData.data?.user || userData.data || userData;
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        avatarFile: null,
        preview: user.avatar?.url || user.avatar || null,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatarFile: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      
      dataToSend.append("name", formData.name);
      dataToSend.append("phone", formData.phone);
      

      if (formData.avatarFile) {
        dataToSend.append("avatar", formData.avatarFile);
      }

      const res = await updateMe(dataToSend).unwrap();

      const updatedUser = res.data?.user || res.data || res;
      
      const newUserInfo = {
        ...userInfo, 
        user: {
            ...userInfo.user, 
            ...updatedUser    
        }
      };

      dispatch(setCredentials(newUserInfo));
      
      alert("Profile updated successfully!");
      setFormData(prev => ({ ...prev, avatarFile: null }));

    } catch (err) {
      console.error("Update Error:", err);
      const msg = err?.data?.message || err?.error || "Update Failed";
      alert(msg);
    }
  };

  if (isFetching) return <div className="flex justify-center items-center h-96"><Spinner /></div>;

  return (
    <div className="space-y-6">
       <div className="relative w-full h-48 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-900 mb-16 shadow-lg">
          <div className="absolute -bottom-12 left-10">
             <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-md bg-white">
                    <AvatarImage src={formData.preview} className="object-cover" />
                    <AvatarFallback className="text-2xl font-bold text-gray-700">
                        {formData.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                
                <label htmlFor="av-up" className="absolute bottom-0 right-0 bg-[#FF0055] hover:bg-pink-700 transition p-2 rounded-full cursor-pointer text-white shadow-sm border-2 border-white">
                    <Camera size={18} />
                    <input type="file" id="av-up" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
             </div>
          </div>
          <div className="absolute -bottom-10 left-48 hidden md:block">
              <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
              <p className="text-gray-500 text-sm capitalize">{userInfo?.user?.role || "Student"}</p>
          </div>
       </div>

       <Card className="border-none shadow-sm">
         <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <Input 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <Input 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <Input 
                            value={formData.email} 
                            disabled 
                            className="pl-10 bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed" 
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Lock size={16} className="text-[#FF0055]" /> Security
                    </h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                            <p className="font-medium text-gray-900">Password</p>
                            <p className="text-sm text-gray-500">Change your password securely</p>
                        </div>
                        <Link href="profile/changepassword"> 
                            <Button type="button" variant="outline" className="hover:bg-gray-100 hover:text-[#FF0055]">
                                Change Password <ChevronRight size={16} className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button 
                        type="submit" 
                        disabled={isUpdating} 
                        className="bg-[#FF0055] hover:bg-pink-700 text-white min-w-[140px] h-11 font-semibold rounded-lg shadow-md shadow-pink-100"
                    >
                        {isUpdating ? <Spinner className="text-white" /> : <><Save size={18} className="mr-2" /> Save Changes</>}
                    </Button>
                </div>
            </form>
         </CardContent>
       </Card>
    </div>
  );
}