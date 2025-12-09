import { NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;
  const searchParams = nextUrl.searchParams;

  const token = request.cookies.get("accessToken")?.value || request.cookies.get("token")?.value;
  
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const role = request.cookies.get("user_role")?.value || request.cookies.get("role")?.value;

  const oauthSuccessInQuery = searchParams.get("success") === "true";
  const oauthCallbackPathAllowed = path === "/login" && oauthSuccessInQuery;

  const authPaths = ["/login", "/signup", "/forgetPassword", "/teacher-signup", "/reset-password"];
  const isAuthPath = authPaths.some((p) => path.startsWith(p));

  if ((token || refreshToken) && isAuthPath && !oauthCallbackPathAllowed) {
    if (role === "admin") return NextResponse.redirect(new URL("/dashboard/admin/dashboard", request.url));
    if (role === "teacher") return NextResponse.redirect(new URL("/completeProfile", request.url)); 
    if (role === "student") return NextResponse.redirect(new URL("/dashboard/student/my-learning", request.url));
    if (role === "parent") return NextResponse.redirect(new URL("/dashboard/parent/overview", request.url));
    
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path === "/completeProfile" && !token && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  if (path.startsWith("/dashboard") && !token && !refreshToken) {
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)"],
};