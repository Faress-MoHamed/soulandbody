import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // <-- THIS WORKS FOR WEB (localStorage)

import rootReducer from "./store"; // your root reducers

const persistConfig = {
	key: "root",
	storage, // use web localStorage
	blacklist: ["employee"],
};

// apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// set up the store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
			
		}),
});

// set up persistor
export const persistor = persistStore(store);

// types for better TypeScript support
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
