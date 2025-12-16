"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Calendar, ArrowLeft, FileText, Download, AlertTriangle } from "lucide-react";
import SubmissionEditor from "@/components/DashboardComponents/student/assignments/SubmissionEditor";
import ReadOnlyView from "@/components/DashboardComponents/student/assignments/ReadOnlyView";
import { useSelector } from "react-redux";
import { useGetStudentAssignmentDetailsQuery } from "@/redux/api/endPoints/assignmentsApiSlice";
import { useSubmitAssignmentMutation } from "@/redux/api/endPoints/submissionsApiSlice";
import { toast } from "react-hot-toast";

// STATUS Constants
export const STATUS = {
  TODO: "TODO",
  SUBMITTED: "SUBMITTED",
  GRADED: "GRADED",
  LATE: "LATE",
  MISSED: "MISSED",
  OVERDUE_SUBMITTED: "OVERDUE_SUBMITTED",
};

// Calculate late info
export const calculateLateStatus = (dueDate, submittedAt) => {
  const due = new Date(dueDate);
  const submitted = new Date(submittedAt);
  const diffTime = submitted.getTime() - due.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return {
    isLate: diffDays > 0,
    lateDays: Math.max(0, diffDays),
  };
};

// Get assignment status
export const getAssignmentStatus = (assignment, submission) => {
  const now = new Date();
  const dueDate = new Date(assignment.dueDate);
  const isPastDue = now > dueDate;
  const isSubmitted = !!submission;
  const isGraded = submission?.grade !== undefined && submission?.grade !== null;

  let lateInfo = { isLate: false, lateDays: 0 };

  if (isSubmitted) {
    lateInfo = calculateLateStatus(assignment.dueDate, submission.submittedAt);
  } else if (isPastDue && assignment.allowLateSubmission) {
    lateInfo.lateDays = Math.ceil((now - dueDate) / (1000 * 60 * 60 * 24));
    lateInfo.isLate = lateInfo.lateDays > 0;
    if (lateInfo.lateDays > assignment.maxLateDays) lateInfo.lateDays = assignment.maxLateDays;
  }

  if (isGraded)
    return { status: STATUS.GRADED, label: "Graded", color: "bg-green-100 text-green-700 border-green-200", lateDays: lateInfo.lateDays };

  if (isSubmitted) {
    if (isPastDue)
      return { status: STATUS.OVERDUE_SUBMITTED, label: "Submitted (Locked)", color: "bg-blue-100 text-blue-700 border-blue-200", lateDays: lateInfo.lateDays };
    return { status: STATUS.SUBMITTED, label: "Submitted", color: "bg-blue-100 text-blue-700 border-blue-200", lateDays: lateInfo.lateDays };
  }

  if (isPastDue) {
    if (assignment.allowLateSubmission)
      return { status: STATUS.LATE, label: "Late / Overdue", color: "bg-red-100 text-red-700 border-red-200", lateDays: lateInfo.lateDays };
    return { status: STATUS.MISSED, label: "Missed", color: "bg-gray-100 text-gray-500 border-gray-200", lateDays: lateInfo.lateDays };
  }

  return { status: STATUS.TODO, label: "To Do", color: "bg-gray-100 text-gray-700 border-gray-200", lateDays: lateInfo.lateDays };
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// AssignmentDetailPage Component
export default function AssignmentDetailPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id;

  const { data: details, isLoading, isError, error } = useGetStudentAssignmentDetailsQuery(assignmentId);
  const [submitAssignment, { isLoading: isSubmitting }] = useSubmitAssignmentMutation();

  const assignment = details?.data; // Direct assignment object
  const submission = details?.submission;

  if (isLoading) return <div className="p-10 text-center">Loading Assignment...</div>;
  if (isError) {
    console.error("Fetch Error:", error);
    return <div className="p-10 text-center text-red-600">Error loading assignment details.</div>;
  }
  if (!assignment) return <div className="p-10 text-center">Assignment not found</div>;

  const { status, label, color, lateDays } = getAssignmentStatus(assignment, submission);
  const isEditable = status === STATUS.TODO || status === STATUS.SUBMITTED;
  const isLateSubmission = status === STATUS.LATE;
  const isLocked = status === STATUS.OVERDUE_SUBMITTED || status === STATUS.GRADED;
  const isMissed = status === STATUS.MISSED;

  const handleSubmission = async (values, resetForm) => {
    try {
      const formData = new FormData();
      formData.append("content", values.content || "");
      if (values.file) {
        formData.append("document", values.file);
      }

      await submitAssignment({ assignmentId: assignment._id, formData }).unwrap();
      toast.success("Assignment submitted successfully!");
      resetForm();
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error(err?.data?.message || "Failed to submit assignment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen font-sans">
      <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-black mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{assignment.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {assignment.group.title}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className={`flex items-center gap-1 font-medium ${isLateSubmission ? "text-red-600" : "text-gray-700"}`}>
                <Clock className="w-4 h-4" /> Due: {formatDate(assignment.dueDate)}
              </span>
            </div>
            {status === STATUS.LATE && (
              <p className="text-xs text-orange-600 mt-2">
                * Late by {lateDays} day(s), {assignment.latePenaltyPerDay * lateDays} points penalty
              </p>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-gray-900">{assignment.totalGrade}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Points</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Instructions</h3>
            <p className="text-gray-600 leading-relaxed">{assignment.description || "No description provided."}</p>
          </div>

          {assignment.file && assignment.file.url && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-full md:w-fit">
              <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">Attached Material</h4>
              <a href={assignment.file.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                <div className="bg-white p-2 rounded-md border border-blue-200 text-blue-600 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 group-hover:underline">Download Assignment File</p>
                  <p className="text-xs text-blue-600">Click to open resource</p>
                </div>
                <Download className="w-4 h-4 text-blue-500 ml-2" />
              </a>
            </div>
          )}
        </div>
      </div>

      {isMissed && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center flex flex-col items-center">
          <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
          <h2 className="text-red-800 font-bold text-xl mb-2">Assignment Missed</h2>
          <p className="text-red-600">The due date has passed and late submissions are not allowed.</p>
        </div>
      )}

      {(isEditable || isLateSubmission) && (
        <SubmissionEditor assignment={assignment} existingContent={submission?.content} existingFile={submission?.file} isLate={isLateSubmission} onSubmit={handleSubmission} />
      )}

      {isLocked && <ReadOnlyView submission={submission} assignment={assignment} />}
    </div>
  );
}
