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

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${subscription.invoice}</title>
          <style>
            @media print { 
              body { margin: 0; padding: 20px; } 
              .no-print { display: none; }
            }
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #f5f5f5; display: flex; justify-content: center; padding: 40px; }
            .receipt-container { 
                background: white; 
                width: 100%; 
                max-width: 700px; 
                padding: 40px; 
                border: 1px solid #ddd; 
                box-shadow: 0 0 10px rgba(0,0,0,0.05); 
                margin: 0 auto;
                box-sizing: border-box;
            }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #392b80; padding-bottom: 15px; }
            .logo { font-size: 22px; font-weight: bold; color: #392b80; margin-bottom: 5px; }
            .invoice-title { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #666; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #392b80; border-bottom: 1px solid #eee; padding-bottom: 3px; margin-bottom: 10px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 12px; }
            .label { font-weight: bold; color: #555; }
            .value { text-align: right; color: #333; }
            .status-badge { padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; background: #eee; }
            .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #eee; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <div class="logo">ELMISTER LMS</div>
              <div class="invoice-title">Official Receipt</div>
              <p style="font-size: 12px; color: #666; margin-top: 5px;">Invoice #${subscription.invoice}</p>
            </div>

          <div class="section">
            <div class="section-title">Subscription Details</div>
            <div class="row"><span class="label">Status</span> <span class="value status-badge">${subscription.status}</span></div>
            <div class="row"><span class="label">Payment Date</span> <span class="value">${subscription.paidAt}</span></div>
            <div class="row"><span class="label">Expiry Date</span> <span class="value">${subscription.endAt}</span></div>
            <div class="row"><span class="label">Subscription ID</span> <span class="value">${subscription.realSubscriptionId}</span></div>
            <div class="row"><span class="label">Transaction ID</span> <span class="value">${subscription.transactionId}</span></div>
            <div class="row"><span class="label" style="font-size: 1.1em; color: #392b80;">Amount Paid</span> <span class="value" style="font-size: 1.1em; fontWeight: bold;">${subscription.amount}</span></div>
          </div>

          <div class="section">
            <div class="section-title">Student Information</div>
            <div class="row"><span class="label">Name</span> <span class="value">${subscription.studentName}</span></div>
            <div class="row"><span class="label">Email</span> <span class="value">${subscription.studentEmail}</span></div>
            <div class="row"><span class="label">Username</span> <span class="value">${subscription.studentUsername}</span></div>
            <div class="row"><span class="label">ID</span> <span class="value">${subscription.studentId}</span></div>
          </div>

          <div class="section">
            <div class="section-title">Parent Information</div>
            <div class="row"><span class="label">Name</span> <span class="value">${subscription.parent}</span></div>
            <div class="row"><span class="label">Email</span> <span class="value">${subscription.parentEmail}</span></div>
            <div class="row"><span class="label">ID</span> <span class="value">${subscription.parentId}</span></div>
          </div>

          <div class="section">
            <div class="section-title">Course Information</div>
            <div class="row"><span class="label">Course & Group</span> <span class="value">${subscription.courseGroup}</span></div>
            <div class="row"><span class="label">Teacher</span> <span class="value">${subscription.teacher}</span></div>
            <div class="row"><span class="label">Teacher Email</span> <span class="value">${subscription.teacherEmail}</span></div>
          </div>

          <div class="footer">
            <p>Thank you for learning with us!</p>
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                {subscription.studentEmail}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Username:</span>{" "}
                {subscription.studentUsername}
              </p>
              <p>
                <span className="font-semibold text-gray-900">ID:</span>{" "}
                <span className="text-xs">{subscription.studentId}</span>
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${subscription.status === "active"
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

          <button
            onClick={handlePrint}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#392b80] to-indigo-600 text-white rounded-xl font-semibold hover:from-[#392b80]/90 hover:to-indigo-700 transition-all hover:shadow-xl"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecietPopup;
