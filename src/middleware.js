// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const path = request.nextUrl.pathname;
  
//   const token = request.cookies.get('token')?.value;
//   const role = request.cookies.get('user_role')?.value; 

//   // 1. تحديد صفحات المصادقة فقط (دي اللي هنمنع المسجلين يدخلوها)
//   const authPaths = ['/login', '/signup', '/forgetPassword'];
//   const isAuthPath = authPaths.includes(path);

//   // 2. تحديد كل الصفحات العامة (المسموحة للزوار وللمسجلين)
//   // ضفنا عليهم authPaths عشان الزائر يقدر يدخلهم برضه
//   const publicPaths = ['/', '/about', '/contact', '/blog', ...authPaths];
//   const isPublicPath = publicPaths.includes(path) || path.startsWith('/courses'); 

//   // -----------------------------------------------------------------
//   // السيناريو الأول: يوزر مسجل دخول (عنده توكن) وبيحاول يفتح Login/Signup
//   // -----------------------------------------------------------------
//   if (token && isAuthPath) {
//     if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//     if (role === 'teacher') return NextResponse.redirect(new URL('/teacher/analytics', request.url)); 
//     if (role === 'student') return NextResponse.redirect(new URL('/student/my-learning', request.url));
//     if (role === 'parent') return NextResponse.redirect(new URL('/parent', request.url));
    
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // -----------------------------------------------------------------
//   // السيناريو الثاني: زائر (معندوش توكن) وبيحاول يفتح صفحة خاصة (Protected)
//   // -----------------------------------------------------------------
//   // لو الصفحة مش عامة، ومعندوش توكن -> وديه Login
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // -----------------------------------------------------------------
//   // السيناريو الثالث: حماية الأدوار (RBAC) - زي ما هي
//   // -----------------------------------------------------------------
//   if (path.startsWith('/admin') && role !== 'admin') {
//     return NextResponse.redirect(new URL('/unauthorized', request.url)); 
//   }

//   if (path.startsWith('/teacher') && role !== 'teacher') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (path.startsWith('/student') && role !== 'student') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
  
//   if (path.startsWith('/parent') && role !== 'parent') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
//   ],
// };

import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
