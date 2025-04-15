import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n";

export function middleware(request: NextRequest) {
	const localeFromCookie = request.cookies.get("locale")?.value;

	const locale = locales.includes(localeFromCookie as any)
		? localeFromCookie
		: defaultLocale;

	const response = NextResponse.next();
	return response;
}

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
