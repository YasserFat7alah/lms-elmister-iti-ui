import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Baby, Search, Trash2, Edit, Mail, Phone, MapPin, X, Eye, UserCircle, Calendar, Shield } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

// View User Popup Component
const ViewUserPopup = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                  user.role === "parent"
                    ? "bg-purple-500"
                    : user.role === "teacher"
                    ? "bg-green-500"
                    : "bg-orange-500"
                }`}
              >
                {user.name.charAt(0)}
              </div>
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
        <div className="p-6 space-y-6">
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
                  {user.location}
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
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "parent"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "teacher"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {user.role === "parent" && <Baby className="w-3.5 h-3.5" />}
                    {user.role === "teacher" && <GraduationCap className="w-3.5 h-3.5" />}
                    {user.role === "student" && <Users className="w-3.5 h-3.5" />}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Join Date</label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {user.joinDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
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