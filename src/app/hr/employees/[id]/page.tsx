"use client";

import React, { useEffect, useState } from "react";
import EmployeesForm from "../add";
import CuEmployee from "../CuEmployee";
import { useEmployee } from "../useEmployee";
import { useDispatch } from "react-redux";
import { setEmployeeData } from "../add/createNewEmployee.slice";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
	const [id, setId] = useState<string | null>(null);
	const { data } = useEmployee(id || "");
	console.log(data);
	const dispatch = useDispatch();
	dispatch(
		setEmployeeData({
			...data?.data,
			attachments:
				typeof data?.data?.attachments === "string"
					? [data?.data?.attachments]
					: data?.data?.attachments,
		})
	);
	console.log(data);
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
	return <CuEmployee />;
};
export default Page;
