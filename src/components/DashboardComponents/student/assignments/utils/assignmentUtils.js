
export const STATUS = {
  TODO: "TODO",           // Not submitted, Due date is in future
  SUBMITTED: "SUBMITTED", // Submitted, Waiting for grade
  GRADED: "GRADED",       // Submitted and Graded
  LATE: "LATE",           // Not submitted, Due date passed (Can submit late)
  MISSED: "MISSED",       // Not submitted, Late submission NOT allowed
  OVERDUE_SUBMITTED: "OVERDUE_SUBMITTED" // Submitted, but viewing after due date (Locked)
};

export const getAssignmentStatus = (assignment, submission) => {
  const now = new Date();
  const dueDate = new Date(assignment.dueDate);
  const isPastDue = now > dueDate;
  const isSubmitted = !!submission;
  const isGraded = submission?.grade !== undefined && submission?.grade !== null;

  // 1. If Graded -> Always "GRADED"
  if (isGraded) {
    return { 
      status: STATUS.GRADED, 
      label: "Graded", 
      color: "bg-green-100 text-green-700 border-green-200" 
    };
  }

  // 2. If Submitted
  if (isSubmitted) {
    if (isPastDue) {
       // Submitted on time, but due date passed -> Locked for editing
      return { 
        status: STATUS.OVERDUE_SUBMITTED, 
        label: "Submitted (Locked)", 
        color: "bg-blue-100 text-blue-700 border-blue-200" 
      };
    }
    return { 
      status: STATUS.SUBMITTED, 
      label: "Submitted", 
      color: "bg-blue-100 text-blue-700 border-blue-200" 
    };
  }

  // 3. Not Submitted & Past Due
  if (isPastDue) {
    if (assignment.allowLateSubmission) {
      return { 
        status: STATUS.LATE, 
        label: "Late / Overdue", 
        color: "bg-red-100 text-red-700 border-red-200" 
      };
    }
    return { 
      status: STATUS.MISSED, 
      label: "Missed", 
      color: "bg-gray-100 text-gray-500 border-gray-200" 
    };
  }

  // 4. Default: To Do
  return { 
    status: STATUS.TODO, 
    label: "To Do", 
    color: "bg-gray-100 text-gray-700 border-gray-200" 
  };
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: '2-digit', minute:'2-digit'
  });
};