import { auth } from "~/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Ochrona tras /admin — wymagane zalogowanie z rolą ADMIN
  if (pathname.startsWith("/admin")) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (req.auth.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Zalogowany admin próbujący wejść na /login → przekieruj do dashboardu
  if (pathname === "/login" && req.auth?.user?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
