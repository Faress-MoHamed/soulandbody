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
import ReactQueryProvider from "@/providers/reactQuertProvider";
import { SidebarProvider } from "../ui/sidebar";
import ReduxProvider from "@/providers/reduxProvider";

const SweetAlert = withReactContent(Swal);

export default function CustomPopUp({
	DialogTriggerComponent,
	DialogContentclassName,
	DialogContentComponent,
}: {
	DialogTriggerComponent: () => JSX.Element;
	DialogContentclassName?: string;
	DialogContentComponent: ({ closePopup }: { closePopup?: any }) => JSX.Element;
}) {
	const locale = useLocale();
	const messages = useMessages();
	const popupInstanceRef = React.useRef<any>(null);

	const closePopup = React.useCallback(() => {
		if (popupInstanceRef.current) {
			popupInstanceRef.current.close();
		}
	}, []);

	const openPopup = React.useCallback(() => {
		const instance = SweetAlert.fire({
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
						<ReduxProvider>
							<SidebarProvider>
								<ReactQueryProvider>
									<NextIntlClientProvider locale={locale} messages={messages}>
										<DialogContentComponent key={Date.now()} closePopup={closePopup} />
									</NextIntlClientProvider>
								</ReactQueryProvider>
							</SidebarProvider>
						</ReduxProvider>
					);
				}
			},
			willClose: () => {
				popupInstanceRef.current = null;
			},
			padding: 0,
		});

		popupInstanceRef.current = instance;
	}, [
		DialogContentComponent,
		DialogContentclassName,
		locale,
		messages,
		closePopup,
	]);

	return (
		<div className="cursor-pointer" onClick={openPopup}>
			<DialogTriggerComponent />
		</div>
	);
}



// import {
// 	Dialog,
// 	DialogContent,
// 	DialogTrigger,
//   } from "@/components/ui/dialog";
  
//   export default function CustomPopUp({
// 	DialogTriggerComponent,
// 	DialogContentComponent,
//   }: {
// 	DialogTriggerComponent: () => JSX.Element;
// 	DialogContentComponent: ({ closePopup }: { closePopup?: () => void }) => JSX.Element;
//   }) {
// 	const [open, setOpen] = React.useState(false);
  
// 	const closePopup = () => setOpen(false);
  
// 	return (
// 	  <Dialog open={open} onOpenChange={setOpen}>
// 		<DialogTrigger asChild>
// 		  <div className="cursor-pointer">
// 			<DialogTriggerComponent />
// 		  </div>
// 		</DialogTrigger>
// 		<DialogContent className="max-w-md w-full p-6">
// 		  <DialogContentComponent closePopup={closePopup} />
// 		</DialogContent>
// 	  </Dialog>
// 	);
//   }
  