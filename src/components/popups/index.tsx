"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { cn } from "@/lib/utils";
import type { JSX } from "react";
import "./popup.css";
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
	const openPopup = React.useCallback(() => {
		SweetAlert.fire({
			html: <DialogContentComponent />,
			showConfirmButton: false,
			showCloseButton: true,
			customClass: {
				container: cn("swal2-container", DialogContentclassName),
				popup: "swalPopup",
				closeButton: "",
				htmlContainer: "htmlContainer",

			},
			// titleText:"fares",
			didOpen: () => {
				const contentContainer = Swal.getHtmlContainer();
				if (contentContainer) {
					const root = createRoot(contentContainer);
					root.render(<DialogContentComponent />);
				}
			},
			padding: 0,
		});
	}, [DialogContentComponent, DialogContentclassName]);

	return (
		<div className="cursor-pointer" onClick={openPopup}>
			<DialogTriggerComponent />
		</div>
	);
}
