// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const path = request.nextUrl.pathname;
  
//   const token = request.cookies.get('accessToken')?.value || request.cookies.get('token')?.value;
//   const role = request.cookies.get('user_role')?.value || request.cookies.get('role')?.value; 

//   const authPaths = ['/login', '/signup', '/forgetPassword', '/teacher-signup', '/reset-password'];
//   const isAuthPath = authPaths.some(p => path.startsWith(p));

//   if (token && isAuthPath) {
//     if (role === 'admin') return NextResponse.redirect(new URL('/dashboard/admin/dashboard', request.url));
//     if (role === 'teacher') return NextResponse.redirect(new URL('/dashboard/teacher/analytics', request.url)); 
//     if (role === 'student') return NextResponse.redirect(new URL('/dashboard/student/my-learning', request.url));
//     if (role === 'parent') return NextResponse.redirect(new URL('/dashboard/parent/overview', request.url));
    
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // 3. حماية الداشبورد
//   if (path.startsWith('/dashboard') && !token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
  
//   // 4. حماية الرولات
//   if (path.startsWith('/dashboard/admin') && role !== 'admin') {
//     return NextResponse.redirect(new URL('/login', request.url)); 
//   }

//   if (path.startsWith('/dashboard/teacher') && role !== 'teacher') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (path.startsWith('/dashboard/student') && role !== 'student') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
  
//   if (path.startsWith('/dashboard/parent') && role !== 'parent') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
//   ],
// };


import { NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;
  const searchParams = nextUrl.searchParams;

  // Try multiple cookie names your backend may set
  const token = request.cookies.get("accessToken")?.value || request.cookies.get("token")?.value;
  const role = request.cookies.get("user_role")?.value || request.cookies.get("role")?.value;

  // allow OAuth redirect handling: if backend redirected to /login?success=true
  const oauthSuccessInQuery = searchParams.get("success") === "true";
  const oauthCallbackPathAllowed = path === "/login" && oauthSuccessInQuery;

  const authPaths = ["/login", "/signup", "/forgetPassword", "/teacher-signup", "/reset-password" ];
  const isAuthPath = authPaths.some((p) => path.startsWith(p));

  // If token exists and user visits auth pages, redirect to dashboard — except allow oauth callback handling
  if (token && isAuthPath && !oauthCallbackPathAllowed) {
    if (role === "admin") return NextResponse.redirect(new URL("/dashboard/admin/dashboard", request.url));
    if (role === "teacher") return NextResponse.redirect(new URL("/dashboard/teacher/analytics", request.url));
    if (role === "student") return NextResponse.redirect(new URL("/dashboard/student/my-learning", request.url));
    if (role === "parent") return NextResponse.redirect(new URL("/dashboard/parent/overview", request.url));

    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect dashboard routes
  if (path.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role protection
  if (path.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/dashboard/teacher") && role !== "teacher") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/dashboard/student") && role !== "student") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/dashboard/parent") && role !== "parent") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)"],
};
