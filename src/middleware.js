import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('user_role')?.value; 
  const publicPaths = ['/login', '/signup','/forgetPassword' ,'/', '/about', '/contact' ,'/blog'];
  
  const isPublicPath = publicPaths.includes(path) || path.startsWith('/courses'); 

  if (isPublicPath && token) {
    if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    if (role === 'teacher') return NextResponse.redirect(new URL('/teacher/analytics', request.url)); 
    if (role === 'student') return NextResponse.redirect(new URL('/student/my-learning', request.url));
    if (role === 'parent') return NextResponse.redirect(new URL('/parent', request.url));
    
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  
  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // أو رجعه للداشبورد بتاعته
  }

  if (path.startsWith('/teacher') && role !== 'teacher') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (path.startsWith('/student') && role !== 'student') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (path.startsWith('/parent') && role !== 'parent') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images if you have them)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};