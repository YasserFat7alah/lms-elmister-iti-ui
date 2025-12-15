/**
 * Check if a teacher profile is complete
 * A teacher profile is considered complete if it has:
 * - bio
 * - subjects (at least one)
 * - qualifications (at least one)
 * - yearsOfExperience
 */
export function isTeacherProfileComplete(user) {
  if (!user || user.role !== "teacher") {
    return true; // Not a teacher, so profile is "complete" (not applicable)
  }

  const teacherData = user.teacherData;
  
  if (!teacherData) {
    return false;
  }

  // Check required fields
  const hasBio = teacherData.bio && teacherData.bio.trim().length > 0;
  const hasSubjects = teacherData.subjects && Array.isArray(teacherData.subjects) && teacherData.subjects.length > 0;
  const hasQualifications = teacherData.qualifications && Array.isArray(teacherData.qualifications) && teacherData.qualifications.length > 0;
  const hasExperience = typeof teacherData.yearsOfExperience === "number" && teacherData.yearsOfExperience >= 0;

  return hasBio && hasSubjects && hasQualifications && hasExperience;
}

