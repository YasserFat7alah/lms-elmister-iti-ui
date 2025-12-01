"use client";
import React, { useState, useRef } from "react";
import {
  User, Mail, Phone, Calendar, MapPin, Edit, Save, X,
  Camera, Upload, Trash2
} from "lucide-react";

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Eugene",
    lastName: "Andre",
    userName: "instructor/demo",
    phoneNumber: "89104-71829",
    email: "instructor/demo@example.com",
    gender: "Male",
    dob: "16 Jan 2020",
    age: "24",
    bio: "I am a web developer with a vast array of knowledge in many different front end and back end languages, responsive frameworks, databases, and best code practices.",
    registrationDate: "16 Jan 2024, 11:15 AM"
  });

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const profileImageRef = useRef(null);
  const coverImageRef = useRef(null);

  const education = [
    {
      degree: "BCA - Bachelor of Computer Applications",
      university: "International University",
      period: "2004 - 2010"
    },
    {
      degree: "MCA - Master of Computer Application",
      university: "International University",
      period: "2010 - 2012"
    },
    {
      degree: "Design Communication Visual",
      university: "International University",
      period: "2012 - 2015"
    }
  ];

  const experience = [
    {
      position: "Web Design & Development Team Leader",
      company: "Creative Agency",
      period: "2013 - 2016"
    },
    {
      position: "Project Manager",
      company: "Jobcy Technology Pvt.Ltd",
      period: "Present"
    }
  ];

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file only');
        return;
      }

      setIsUploading(true);

      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage({
            file: file,
            preview: e.target.result
          });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Cover image size must be less than 10MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file only');
        return;
      }

      setIsUploading(true);

      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverImage({
            file: file,
            preview: e.target.result
          });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    if (profileImageRef.current) {
      profileImageRef.current.value = '';
    }
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    if (coverImageRef.current) {
      coverImageRef.current.value = '';
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Profile Data:', profileData);
    console.log('Profile Image:', profileImage);
    console.log('Cover Image:', coverImage);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Cover Photo Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative"
            style={{
              backgroundImage: coverImage?.preview ? `url(${coverImage.preview})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <input
                  type="file"
                  ref={coverImageRef}
                  onChange={handleCoverImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => coverImageRef.current?.click()}
                  disabled={isUploading}
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                >
                  <Camera size={18} />
                  <span>{coverImage ? 'Change Cover' : 'Add Cover'}</span>
                </button>

                {coverImage && (
                  <button
                    onClick={handleRemoveCoverImage}
                    className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Profile Header */}
          <div className="px-6 pb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-16">

              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full p-1">
                  <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden">
                    {profileImage?.preview ? (
                      <img
                        src={profileImage.preview}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      'EA'
                    )}

                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                        <input
                          type="file"
                          ref={profileImageRef}
                          onChange={handleProfileImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          onClick={() => profileImageRef.current?.click()}
                          disabled={isUploading}
                          className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Camera size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && profileImage && (
                  <button
                    onClick={handleRemoveProfileImage}
                    className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {/* User Info + Actions */}
              <div className="flex-1 lg:ml-6 mt-4 lg:mt-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <p className="text-gray-600">Instructor</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Registered: {profileData.registrationDate}
                    </p>
                  </div>

                  <div className="flex space-x-3 mt-4 lg:mt-0">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit size={18} />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={isUploading}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          <Save size={18} />
                          <span>{isUploading ? 'Uploading...' : 'Save Changes'}</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={isUploading}
                          className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                          <X size={18} />
                          <span>Cancel</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the profile content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <User size={20} />
                <span>Basic Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.lastName}</p>
                  )}
                </div>

                {/* Continue the rest of the inputs exactly as the original, but translated */}

              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biography
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500 mt-1">{exp.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Education */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-800 text-sm">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm mt-1">{edu.university}</p>
                    <p className="text-gray-500 text-xs mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Published Courses</span>
                  <span className="font-bold text-gray-800">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Enrolled Students</span>
                  <span className="font-bold text-gray-800">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-bold text-green-600">$12,456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-gray-800">4.8</span>
                    <span className="text-yellow-500">⭐</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
  );
};

export default TeacherProfile;
