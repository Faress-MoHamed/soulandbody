import * as SelectPrimitive from "@radix-ui/react-select";
import type { ColumnDef } from "@tanstack/react-table";
import { type JSX } from "react";
export type TableProps<TData> = {
	columns: ColumnDef<TData>[];
	data: TData[];
	title?: string;
	AddTitle?: string;
	onClickAdd?: () => void;
	ButtonTrigger?: React.FC;
	pagination?: {
		currentPage: number;
		totalPages: number;
	};
	handlePageChange?: (page: number) => void;
	employees?: string[];
	loading?: boolean;
	withColspan?: boolean;
	error?: string;
	deleteLoading?: boolean;
	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
	withActionButtons?: boolean;
	FooterComponent?: React.FC;
	withFilter?: boolean;
	withPrinter?: boolean;
	withPagination?: boolean;
	UserComponent?: React.FC<{ selectedEmployee?: any }>;
	CardFooterClassName?: string;
	containerClassName?: string;
	withInlineAdd?: boolean;
	onSaveNewRow?: (data: any) => void;
	expandableRow?: boolean;
	expandedContent?: {
		content: SchemaObject[];
		expandButton?: (
			isExpanded: boolean,
			toggleExpand: () => void
		) => JSX.Element;
	};
};

export type TextInput = {
	type: "input";
	inputType: React.HTMLInputTypeAttribute;
	label?: string;
	value?: any;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
	labelClassName?: string;
	wrapperClassName?: string;
};
export type CustomInput = {
	type: "custom";

	Component: React.ReactNode;
};
export type nullInput = {
	type: "null";
};
export interface SelectInput
	extends React.ComponentProps<typeof SelectPrimitive.Root> {
	type: "select";
	label?: string;
	placeholder?: string;
	options?: { value: string; label: string }[] | string[];
	triggerClassName?: string;
}

export type SchemaObject = SelectInput | TextInput | CustomInput | nullInput;

export interface CustomTableProps<TData> extends TableProps<TData> {
	label?: string;
	expandableRow?: boolean;
	expandedContent?: {
		content: SchemaObject[];
		expandButton?: (
			isExpanded: boolean,
			toggleExpand: () => void
		) => JSX.Element;
	};
}

export type MultipleTableProps<TData> = {
	dataSets: CustomTableProps<TData>[];
	withPrinter?: boolean;
};
