"use client";

import React, { useEffect, useState } from "react";
import EmployeesForm from "../add";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
	const [id, setId] = useState<string | null>(null);

	useEffect(() => {
		async function fetchParams() {
			const resolvedParams = await params;
			setId(resolvedParams.id);
		}
		fetchParams();
	}, [params]);

	if (!id) {
		return <p>loading ...</p>;
	}
	return <EmployeesForm employeeId={id} />;
};
export default Page;
