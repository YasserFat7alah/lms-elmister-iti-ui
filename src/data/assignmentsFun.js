"use client"
export const getAssignmentStatus = (assignment, submission) => {

  const now = new Date();
  const dueDate = new Date(assignment.dueDate);
  const isPastDue = now > dueDate;

  // 1. If Graded
  if (submission?.grade !== undefined && submission?.grade !== null) {
    return { status: "GRADED", label: "Graded", color: "bg-green-100 text-green-700 border-green-200" };
  }

  // 2. If Submitted
  if (submission) {
    if (isPastDue) {
        // Submitted, but due date passed (Locked)
        return { status: "COMPLETED", label: "Submitted", color: "bg-blue-100 text-blue-700 border-blue-200" };
    }
    // Submitted, due date in future (Editable)
    return { status: "SUBMITTED", label: "Submitted", color: "bg-blue-100 text-blue-700 border-blue-200" };
  }

  // 3. Not Submitted yet
  if (isPastDue) {
    return { status: "LATE", label: "Missing / Late", color: "bg-red-100 text-red-700 border-red-200" };
  }

  return { status: "TODO", label: "To Do", color: "bg-gray-100 text-gray-700 border-gray-200" };
};

export const formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getDaysRemaining = (dateString) => {
  const now = new Date();
  const due = new Date(dateString);
  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
  if (diffDays === 0) return "Due Today";
  return `Due in ${diffDays} days`;
};