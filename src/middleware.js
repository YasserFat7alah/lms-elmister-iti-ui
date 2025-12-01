import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('user_role')?.value; 

  const authPaths = ['/login', '/signup', '/forgetPassword', '/teacher-signup'];
  const isAuthPath = authPaths.includes(path);

  const publicPaths = ['/', '/about', '/contact', '/blog', ...authPaths];
  const isPublicPath = publicPaths.includes(path) || path.startsWith('/courses'); 

  if (token && isAuthPath) {
    if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    if (role === 'teacher') return NextResponse.redirect(new URL('/teacher/analytics', request.url)); 
    if (role === 'student') return NextResponse.redirect(new URL('/student/my-learning', request.url));
    if (role === 'parent') return NextResponse.redirect(new URL('/parent', request.url));
    
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  
  // Admin
  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); 
  }

  if (path.startsWith('/teacher') && path !== '/teacher-signup' && role !== 'teacher') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Student
  if (path.startsWith('/student') && role !== 'student') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Parent
  if (path.startsWith('/parent') && role !== 'parent') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};