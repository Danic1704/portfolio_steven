import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

const LOCALE_COOKIE = "sd-locale";

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;

  const header = request.headers.get("accept-language") || "";
  for (const part of header.split(",")) {
    const code = part.trim().split(";")[0].toLowerCase();
    if (code.startsWith("fr")) return "fr";
    if (code.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  // No locale prefix: redirect to the detected locale (cookie → browser).
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });
  return response;
}

export const config = {
  // Match page-style paths only — skip _next internals and all files (public assets).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};