import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

export default async function RootLocaleLayout({ children }: { children: any }) {
	const locale = await getLocale();

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider>{children}</NextIntlClientProvider>
			</body>
		</html>
	);
}
