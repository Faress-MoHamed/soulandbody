// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Enhanced redirect helper with logging
const redirectTo = (req: NextRequest, path: string, reason: string) => {
	//console.log(`Redirecting to ${path} because: ${reason}`);
	return NextResponse.redirect(new URL(path, req.url));
};

// Auth checks
const isAuthPage = (pathname: string) => pathname.includes("auth");

export function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const token = req.cookies.get("auth_token")?.value?.trim();
	const userDataCookie = req.cookies.get("user_data")?.value;
	console.log("userData", userDataCookie);
	// Try to parse user data if cookie exists
	let userData = null;
	try {
		userData = userDataCookie ? JSON.parse(userDataCookie) : null;
	} catch (e) {
		console.error("Failed to parse user_data cookie", e);
	}

	const userRole = userData?.role; // Assuming role is stored in user_data

	//console.log("\n--- Middleware Execution ---");
	//console.log("Pathname:", pathname);
	//console.log("Token exists:", !!token);
	//console.log("User role:", userRole || "undefined");

	// 1. Handle root path
	if (pathname === "/" ||pathname==="/dashboard") {
		if (!token) {
			return redirectTo(req, "/auth", "No token on root path");
		}

		// If user is logged in and on root, redirect based on role
		if (userRole === "user") {
			return redirectTo(req, "/dashboard/userHr", "User role detected");
		} else if (userRole === "admin") {
			return redirectTo(req, "/dashboard/hr", "Admin role detected");
		}

		return NextResponse.next();
	}

	// 2. If has token and trying to access auth page
	if (token && isAuthPage(pathname)) {
		// Redirect to appropriate dashboard based on role
		if (userRole === "user") {
			return redirectTo(
				req,
				"/dashboard/userHr",
				"Authenticated user accessing auth page"
			);
		} else if (userRole === "admin") {
			return redirectTo(req, "/dashboard/hr", "Authenticated admin accessing auth page");
		}
		return redirectTo(
			req,
			"/",
			"Authenticated user with unknown role accessing auth page"
		);
	}

	// 3. If no token and trying to access protected page
	if (!token && !isAuthPage(pathname)) {
		return redirectTo(
			req,
			"/auth",
			"Unauthenticated user accessing protected page"
		);
	}

	// 4. Role-based path protection
	if (token) {
		// If user tries to access admin page but isn't admin
		if (pathname.startsWith("/dashboard/hr") && userRole !== "admin") {
			return redirectTo(
				req,
				"/dashboard/userHr",
				"Non-admin user trying to access admin page"
			);
		}

		// If admin tries to access user page but isn't user
		if (pathname.startsWith("/dashboard/userHr") && userRole !== "user") {
			return redirectTo(req, "/dashboard/hr", "Admin trying to access user page");
		}
	}

	// Default case - allow the request
	//console.log("Allowing request to proceed");
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
