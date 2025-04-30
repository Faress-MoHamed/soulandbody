"use client"; // 👈 Add this

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoadingIndicator from "@/components/loadingIndicator";
import { persistor, store } from "@/redux/persist";

const ReduxProvider = ({ children }: any) => {
	return (
		<Provider store={store}>
			<PersistGate loading={<LoadingIndicator />} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default ReduxProvider;
