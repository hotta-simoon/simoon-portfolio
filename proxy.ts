import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  const isAdminPage = pathname.startsWith("/admin");
  const isWriteApi =
    pathname.startsWith("/api/works") && method !== "GET";

  if (!isAdminPage && !isWriteApi) return NextResponse.next();

  const host = req.headers.get("host") ?? "";
  const isLocalhost =
    host.startsWith("localhost") || host.startsWith("127.0.0.1");

  if (isLocalhost) return NextResponse.next();

  if (isWriteApi) {
    return NextResponse.json(
      { error: "Admin API is disabled in production." },
      { status: 403 }
    );
  }
  return new NextResponse("Not Found", { status: 404 });
}

export const config = {
  matcher: ["/admin/:path*", "/api/works/:path*"],
};
