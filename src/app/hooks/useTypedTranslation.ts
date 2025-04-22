import { useTranslations } from "next-intl";
import translationsType from "@/i18n/languages/ar.json";

// Extract types automatically from JSON file
export type TranslationKeys = typeof translationsType;

// Solution: Transform nested keys to dot notation
type FlattenKeys<T, Prefix extends string = ""> = {
	[K in keyof T]: T[K] extends object
		? FlattenKeys<T[K], `${Prefix}${K & string}.`>
		: `${Prefix}${K & string}`;
}[keyof T];

// Final type for translation keys
export type TranslationKey = FlattenKeys<TranslationKeys>;

// Custom hook with TypeScript
export const useTypedTranslation = () => {
	const t = useTranslations();

	// Provide correct typing for translation keys
	const typedT = (key: TranslationKey) => t(key as any);

	return { t: typedT };
};
