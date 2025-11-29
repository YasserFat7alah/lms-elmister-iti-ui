import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // 1. قراءة التوكن والرول من الكوكيز (زي ما سيفناهم في authSlice)
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('user_role')?.value; // admin, student, teacher, parent

  // 2. تعريف المسارات العامة (مسموح للكل يدخلها)
  // ضفنا signup هنا بناءً على طلبك
  const publicPaths = ['/login', '/signup','/forgetPassword' ,'/', '/about', '/contact' ,'/blog'];
  
  // هل المسار الحالي عام؟
  const isPublicPath = publicPaths.includes(path) || path.startsWith('/courses'); // عشان الكورسات وتفاصيلها متاحة للكل

  // -------------------------------------------------------------
  // السيناريو الأول: يوزر مسجل دخول وبيحاول يفتح Login أو Signup
  // -------------------------------------------------------------
  if (isPublicPath && token) {
    // نوديه على الداشبورد بتاعته حسب دوره
    if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    if (role === 'teacher') return NextResponse.redirect(new URL('/teacher/analytics', request.url)); // أو dashboard
    if (role === 'student') return NextResponse.redirect(new URL('/student/my-learning', request.url));
    if (role === 'parent') return NextResponse.redirect(new URL('/parent', request.url));
    
    // لو الرول مش معروف، وديه الرئيسية
    return NextResponse.redirect(new URL('/', request.url));
  }

  // -------------------------------------------------------------
  // السيناريو الثاني: يوزر "مش" مسجل دخول وبيحاول يفتح صفحة خاصة (Protected)
  // -------------------------------------------------------------
  if (!isPublicPath && !token) {
    // رجعه لصفحة اللوجين فوراً
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // -------------------------------------------------------------
  // السيناريو الثالث: حماية الأدوار (RBAC) - طالب بيحاول يدخل صفحة أدمن
  // -------------------------------------------------------------
  
  // 1. حماية الـ Admin
  if (path.startsWith('/admin') && role !== 'admin') {
    // رجعه لمكانه الطبيعي (Security Redirect)
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // أو رجعه للداشبورد بتاعته
  }

  // 2. حماية الـ Teacher
  if (path.startsWith('/teacher') && role !== 'teacher') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. حماية الـ Student
  if (path.startsWith('/student') && role !== 'student') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 4. حماية الـ Parent
  if (path.startsWith('/parent') && role !== 'parent') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // لو عدى من كل الفلاتر دي، يبقى تمام.. كمل يا بطل
  return NextResponse.next();
}

// تحديد الملفات اللي الميدلوير يشتغل عليها (عشان ما يتقلش الموقع على الفاضي)
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