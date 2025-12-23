// Use relative path for API calls (proxied through Next.js)
// In production, this gets proxied to the actual backend URL via next.config.mjs rewrites
export const BASE_URL = process.env.NEXT_PUBLIC_USE_PROXY === 'true' ? '/api/v1' : process.env.NEXT_PUBLIC_API_URL;

// Socket URL always points directly to backend (sockets can't be proxied easily)
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:4040';
/* ---- ---- ---- PUBLIC ---- ---- ---- */
export const PUBLIC_USERS_URL = "/public/users"; //query params =? page , limit, subject, role, name (search)
export const PUBLIC_COURSES_URL = '/public/courses'; //query params =? page, limit, subject, teacherId

/* ---- ---- ---- PRIVATE ---- ---- ---- */
export const ADMIN_URL = '/auth/admins' // dashboard: statistics
export const USERS_URL = "/auth";
export const USERS_URL_DATA = '/users';
export const TEACHERS_URL = '/teachers';
export const USERS_LIST_URL = "/users";


export const LESSONS_URL = "/lessons";
export const COURSES_URL = '/courses';
export const GROUPS_URL = '/groups';
export const COMMENTS_URL = '/comments';
export const CHAT_URL = '/chat';
export const NOTIFICATIONS_URL = '/notifications';