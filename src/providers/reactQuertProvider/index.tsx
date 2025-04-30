"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function ReactQueryProvider({ children }: any) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 0, // Always consider data stale
						// cacheTime: 10 * 60 * 1000, // 10 minutes
						refetchOnWindowFocus: true, // Refetch when window regains focus
						refetchOnMount: true, // Refetch when component mounts
						refetchOnReconnect: true, // Refetch when network reconnects
						retry: 1, // Retry failed queries once
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
