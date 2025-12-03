
import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('user_role')?.value; 

  const authPaths = ['/login', '/signup', '/forgetPassword', '/teacher-signup'];
  const isAuthPath = authPaths.includes(path);

  const publicPaths = ['/', '/about', '/becomeAnInstrcutor',  '/contact', '/blog', ...authPaths];
  const isPublicPath = publicPaths.includes(path) || path.startsWith('/courses') || path.startsWith('/uploads'); 

  if (token && isAuthPath) {
    if (role === 'admin') return NextResponse.redirect(new URL('/dashboard/admin/dashboard', request.url));
    if (role === 'teacher') return NextResponse.redirect(new URL('/dashboard/teacher/analytics', request.url)); 
    if (role === 'student') return NextResponse.redirect(new URL('/dashboard/student/my-learning', request.url));
    if (role === 'parent') return NextResponse.redirect(new URL('/dashboard/parent', request.url));
    
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (path.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  
  // Admin
  if (path.startsWith('/dashboard/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); 
  }

  if (path.startsWith('/dashboard/teacher') && role !== 'teacher') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (path.startsWith('/dashboard/student') && role !== 'student') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (path.startsWith('/dashboard/parent') && role !== 'parent') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
