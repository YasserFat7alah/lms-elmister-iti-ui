import React, { useEffect } from "react";
import { X, Mail, Phone, MapPin, UserCircle, Calendar, Shield, Users, GraduationCap, Baby } from "lucide-react";
import { useGetUserDetailsQuery } from "@/redux/api/endPoints/usersApiSlice";
import { Spinner } from "@/components/shared/Loader";

// View User Popup Component
const ViewUserPopup = ({ userId, onClose }) => {
  const { data: userData, isLoading, isError } = useGetUserDetailsQuery(userId, {
    skip: !userId,
  });

  if (!userId) return null;

  // Use fetch data or fallback to empty object to prevent crashes
  // Assuming API returns { success: true, data: { user: { ... } } } based on similar endpoints
  // Or just { data: user }
  // Let's inspect typical API response structure in this project: 
  // usersApiSlice.getUserDetails query URL is `/admins/users/${id}`. 
  // User controller `getUserDetails` usually returns `res.status(200).json({ success: true, data: { user } })`.
  const user = userData?.data?.user || {};

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner size={40} />
          <p className="text-gray-500 mt-4">Loading user details...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <p>Failed to load user details.</p>
        </div>
      );
    }

    // Checking if user data is populated (at least name)
    if (!user.name) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p>User details not found.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-[#FF0055]" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
              <p className="text-gray-900 font-medium mt-1">{user.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
              <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#FF0055]" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone Number</label>
              <p className="text-gray-900 font-medium mt-1">
                {user.phone || "Not provided"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</label>
              <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {user.location || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Role & Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#FF0055]" />
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</label>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${user.role === "parent"
                    ? "bg-purple-100 text-purple-700"
                    : user.role === "teacher"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                    }`}
                >
                  {user.role === "parent" && <Baby className="w-3.5 h-3.5" />}
                  {user.role === "teacher" && <GraduationCap className="w-3.5 h-3.5" />}
                  {user.role === "student" && <Users className="w-3.5 h-3.5" />}
                  {user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : "Unknown"}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Join Date</label>
              <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : (user.joinDate || "N/A")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Always visible with skeleton or data */}
        <div className="bg-linear-to-r from-[#FF0055]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!isLoading && user.name && (
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${user.role === "parent"
                    ? "bg-purple-500"
                    : user.role === "teacher"
                      ? "bg-green-500"
                      : "bg-orange-500"
                    }`}
                >
                  {user.name.charAt(0)}
                </div>
              )}
              {isLoading && (
                <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                <p className="text-sm text-gray-600 mt-1">View user information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white z-10">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ViewUserPopup;