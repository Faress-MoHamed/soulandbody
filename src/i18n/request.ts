import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get("locale");
	const locale = localeCookie ? localeCookie.value : "ar";
	// const locale = 'en';
	return {
		locale,
		messages: (await import(`./languages/${locale}.json`)).default,
	};
});
