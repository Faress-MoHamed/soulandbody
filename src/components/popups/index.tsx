"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { cn } from "@/lib/utils";
import type { JSX } from "react";
import "./popup.css";
import { NextIntlClientProvider } from "next-intl";
import { useLocale, useMessages } from "next-intl";

const SweetAlert = withReactContent(Swal);

export default function CustomPopUp({
	DialogTriggerComponent,
	DialogContentclassName,
	DialogContentComponent,
}: {
	DialogTriggerComponent: () => JSX.Element;
	DialogContentclassName?: string;
	DialogContentComponent: () => JSX.Element;
}) {
	const locale = useLocale();
	const messages = useMessages();

	const openPopup = React.useCallback(() => {
		SweetAlert.fire({
			showConfirmButton: false,
			showCloseButton: true,
			customClass: {
				container: cn("swal2-container ", DialogContentclassName),
				popup: "swalPopup bg-red-400",
				closeButton: "",
				htmlContainer: "htmlContainer ",
				title: "bg-red-400",
			},
			didOpen: () => {
				const contentContainer = Swal.getHtmlContainer();
				if (contentContainer) {
					const root = createRoot(contentContainer);
					root.render(
						<NextIntlClientProvider locale={locale} messages={messages}>
							<DialogContentComponent />
						</NextIntlClientProvider>
					);
				}
			},
			padding: 0,
		});
	}, [DialogContentComponent, DialogContentclassName, locale, messages]);

	return (
		<div className="cursor-pointer" onClick={openPopup}>
			<DialogTriggerComponent />
		</div>
	);
}
