import React, { useMemo, useContext, useState, ChangeEvent, useEffect } from "react";
import { Column, useFilters, useTable } from "react-table";
import { issuesContext, Issue } from "../../App";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

export type TableData = {
	id: string;
	issueTitle: string;
	status: string;
	created_at: string;
	action?: string | undefined;
};

const Index: React.FunctionComponent = () => {
	const { issues } = useContext(issuesContext);
	const [selectedIssues, setSelectedIssues] = useState<TableData[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const data: TableData[] = useMemo(() => {
		const filteredData = issues
			? issues
					.filter((issue) => issue.issueTitle.includes(searchTerm))
					.map((issue) => {
						const { id, issueTitle, status, created_at } = issue as Issue;
						return { id, issueTitle, status, created_at };
					})
			: [];
		return filteredData;
	}, [issues, searchTerm]);

	const columns: Column<TableData>[] = useMemo(
		() => [
			{ Header: "Issue Title", accessor: "issueTitle" },
			{ Header: "Status", accessor: "status", filter: "equals" },
			{ Header: "Date Created", accessor: "created_at" },
			{
				Header: "Action",
				accessor: "action",
			},
		],
		[]
	);

	const table = useTable(
		{
			columns,
			data,
		},
		useFilters
	);

	const { setFilter, setAllFilters, state } = table;

	const handleToggle = (issue: TableData): void => {
		if (selectedIssues.includes(issue)) {
			setSelectedIssues(selectedIssues.filter((item) => item !== issue));
		} else {
			setSelectedIssues([...selectedIssues, issue]);
		}
	};

	const handleFilter = (e: ChangeEvent<HTMLInputElement>): void => {
		const value = (e.target as HTMLInputElement).value;
		if (value == state.filters[0]?.value) {
			setAllFilters([]);
		} else {
			setFilter("status", value);
		}
	};

	useEffect(() => {
		if (issues.length) {
			setIsLoading(false);
		}
	}, [issues]);

	return (
		<section className="bg-white dark:bg-gray-900 py-3 sm:py-5 sm:ml-60">
			<div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
				<div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
					<TableHeader
						handleFilter={handleFilter}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
					<div className="overflow-x-auto mt-3">
						<TableContent
							table={table}
							selectedIssues={selectedIssues}
							setSelectedIssues={setSelectedIssues}
							handleToggle={handleToggle}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
