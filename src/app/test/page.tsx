import SelectableWithDropDown from "@/components/selectableWithDropDown";

export default function Example() {
	return (
		<SelectableWithDropDown
			items={[
				{
					label: "الرئيسية",
					component: <div>هذه هي الصفحة الرئيسية</div>,
				},
				{
					label: "المزيد",
					component: <div>صفحة فارغة قبل اختيار عنصر</div>,
					options: [
						{ label: "لوحة التحكم", component: <div>محتوى لوحة التحكم</div> },
						{ label: "الإعدادات", component: <div>محتوى الإعدادات</div> },
					],
				},
				{
					label: "trwvssf",
					component: <div>dacdcacdacca</div>,
				},
			]}
		/>
	);
}
