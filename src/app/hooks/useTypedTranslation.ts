import { useTranslations } from "next-intl";
import translationsType from "@/i18n/languages/ar.json";

// استخراج الأنواع تلقائيًا من ملف JSON
export type TranslationKeys = typeof translationsType;

// حل المشكلة: تحويل المفاتيح المتداخلة إلى صيغة مسطحة
type FlattenKeys<T, Prefix extends string = ""> = {
	[K in keyof T]: T[K] extends object
		? FlattenKeys<T[K], `${Prefix}${K & string}.`>
		: `${Prefix}${K & string}`;
}[keyof T];

// النوع النهائي لمفاتيح الترجمة
type TranslationKey = FlattenKeys<TranslationKeys>;

// Hook مخصص بـ TypeScript
export const useTypedTranslation = () => {
	const t = useTranslations();

	// توفير النوعية الصحيحة لمفاتيح الترجمة
	const typedT = (key: TranslationKey) => t(key);

	return { t: typedT };
};
