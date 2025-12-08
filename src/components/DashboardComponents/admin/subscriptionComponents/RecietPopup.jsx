"use client";
import { Check, Edit2, FileText, X } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const RecietPopup = ({ subscription, isOpen, onClose, onStatusChange }) => {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  if (!isOpen || !subscription) return null;

  const handleStatusEdit = () => {
    setNewStatus(subscription.status);
    setIsEditingStatus(true);
  };

  const handleStatusSave = () => {
    onStatusChange(subscription.id, newStatus);
    setIsEditingStatus(false);
  };

  const handleStatusCancel = () => {
    setIsEditingStatus(false);
    setNewStatus("");
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#392b80]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#392b80]/10 rounded-lg">
                <FileText className="w-6 h-6 text-[#392b80]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Subscription Receipt
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Invoice: {subscription.invoice}
                </p>
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
          {/* Student Info */}
          <div className="p-5 bg-white shadow-sm rounded-xl border border-gray-100 space-y-3">
            <h3 className="text-sm font-semibold text-[#392b80] uppercase tracking-wide">
              Student Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Student:</span>{" "}
                {subscription.studentName}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Parent:</span>{" "}
                {subscription.parent}
              </p>
            </div>
          </div>

          {/* Course Info */}
          <div className="p-5 bg-white shadow-sm rounded-xl border border-gray-100 space-y-3">
            <h3 className="text-sm font-semibold text-[#392b80] uppercase tracking-wide">
              Course Information
            </h3>
            <div className="flex  justify-between gap-4 text-gray-700">
                <div className=" ">
                    <p>
                        <span className="font-semibold text-gray-900">
                            Course & Group :
                        </span>{" "}
                        {subscription.courseGroup}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-900">Teacher:</span>{" "}
                        {subscription.teacher}
                    </p>
                </div>
              {/* Status Section */}
              <div className="flex  justify-end">
                {isEditingStatus ? (
                  <div className="flex items-center gap-2">
                    <div onClick={(e) => e.stopPropagation()}>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger className="w-[150px] border-gray-300 focus:ring-2 focus:ring-[#392b80]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <button
                      onClick={handleStatusSave}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleStatusCancel}
                      className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        subscription.status === "active"
                          ? "bg-green-100 text-green-700"
                          : subscription.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {subscription.status.toUpperCase()}
                    </span>

                    <button
                      onClick={handleStatusEdit}
                      className="p-2 text-[#392b80] hover:bg-[#392b80]/10 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="p-5 bg-white shadow-sm rounded-xl border border-gray-100 space-y-3">
            <h3 className="text-sm font-semibold text-[#392b80] uppercase tracking-wide">
              Subscription Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">
                  Subscription ID:
                </span>{" "}
                {subscription.id}
              </p>

              <p>
                <span className="font-semibold text-gray-900">Invoice:</span>{" "}
                {subscription.invoice}
              </p>

              <p>
                <span className="font-semibold text-gray-900">
                  Payment Date:
                </span>{" "}
                {subscription.paidAt}
              </p>

              <p>
                <span className="font-semibold text-gray-900">
                  Expiry Date:
                </span>{" "}
                {subscription.endAt}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-medium"
          >
            Close
          </button>

          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#392b80] to-indigo-600 text-white rounded-xl font-semibold hover:from-[#392b80]/90 hover:to-indigo-700 transition-all hover:shadow-xl">
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecietPopup;
