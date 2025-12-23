import { NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;
  const searchParams = nextUrl.searchParams;

  // NOTE: We can't read httpOnly cookies (accessToken, refreshToken) from middleware
  // when backend is on different domain. We check user_role as authentication indicator.
  const role = request.cookies.get("user_role")?.value;

  const oauthSuccessInQuery = searchParams.get("success") === "true";
  const oauthCallbackPathAllowed = path === "/login" && oauthSuccessInQuery;

  const authPaths = ["/login", "/signup", "/forgetPassword", "/teacher-signup", "/reset-password"];
  const isAuthPath = authPaths.some((p) => path.startsWith(p));

  // If user has role (indicating they're logged in) and trying to access auth pages
  if (role && isAuthPath && !oauthCallbackPathAllowed) {
    if (role === "admin") return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    if (role === "teacher") return NextResponse.redirect(new URL("/dashboard/teacher/analytics", request.url));
    if (role === "student") return NextResponse.redirect(new URL("/dashboard/student/my-learning", request.url));
    if (role === "parent") return NextResponse.redirect(new URL("/dashboard/parent/overview", request.url));

    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect dashboard routes - redirect to login if no role
  if (path === "/completeProfile" && !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/dashboard") && !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

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
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg|images|assets).*)"],
};