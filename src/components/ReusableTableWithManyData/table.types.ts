import * as SelectPrimitive from "@radix-ui/react-select";
import type { Cell, ColumnDef } from "@tanstack/react-table";
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
	mainTableLabel?: string;
	nestedTable?: NestedTableConfig<TData>; // Add this new prop
	handlePageChange?: (page: number) => void;
	onCellClick?: (cell: Cell<TData, unknown>) => JSX.Element | null;

	employees?: string[];
	loading?: boolean;
	withColspan?: boolean;
	error?: string | null;
	deleteLoading?: boolean;
	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
	withActionButtons?: boolean;
	FooterComponent?: React.FC;
	ActionComponent?: React.FC<{ row: TData }>;
	withFilter?: boolean;
	withPrinter?: boolean;
	withPagination?: boolean;
	UserComponent?: React.FC<{ selectedEmployee?: any }>;
	CardFooterClassName?: string;
	containerClassName?: string;
	withInlineAdd?: boolean;
	withInlineAddContent?: SchemaObject[];
	onSaveNewRow?: (data: any) => void;
	expandableRow?: boolean;
	expandedContent?: {
		content: SchemaObject[];
		expandButton?: (
			isExpanded: boolean,
			toggleExpand: () => void
		) => JSX.Element;
	};
	columnGroups?: {
		title: string;
		columns: number; // How many columns this group spans
		className?: string;
	}[];
	horizontal?: boolean;
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
	withTopPrinter?: boolean;
};
export type HorizontalTableProps<TData> = Pick<
	TableProps<TData>,
	| "columns"
	| "data"
	| "title"
	| "withActionButtons"
	| "FooterComponent"
	| "ActionComponent"
	| "CardFooterClassName"
	| "containerClassName"
>;

export type NestedTableConfig<TData> = {
	data: TData[];
	columns: ColumnDef<TData>[];
	title?: string;
}[];
