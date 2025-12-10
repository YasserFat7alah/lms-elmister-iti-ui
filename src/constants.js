export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
/* ---- ---- ---- PUBLIC ---- ---- ---- */
export const PUBLIC_USERS_URL = "/public/users"; //query params =? page , limit, subject, role, name (search)
export const PUBLIC_COURSES_URL = '/public/courses'; //query params =? page, limit, subject, teacherId

/* ---- ---- ---- PRIVATE ---- ---- ---- */
export const ADMIN_URL = '/auth/admins' // dashboard: statistics
export const USERS_URL = "/auth";
export const USERS_URL_DATA = '/users';
export const COURSES_URL = '/courses';
export const GROUPS_URL = '/groups';
export const COMMENTS_URL = '/comments';