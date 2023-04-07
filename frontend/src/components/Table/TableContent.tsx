import React, { useMemo, useContext, useState, ChangeEvent } from "react";
import { Column, useTable } from "react-table";
import { issuesContext, Issue } from "../../App";
import DeleteModal from "../Modal/DeleteModal";

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

	const data: TableData[] = useMemo(() => {
		const filteredData = issues
			? issues.map((issue) => {
					const { id, issueTitle, status, created_at } = issue as Issue;
					return { id, issueTitle, status, created_at };
			  })
			: [];
		return filteredData;
	}, [issues]);

	const columns: Column<TableData>[] = useMemo(
		() => [
			{ Header: "Issue Title", accessor: "issueTitle" },
			{ Header: "Status", accessor: "status" },
			{ Header: "Date Created", accessor: "created_at" },
			{
				Header: "Action",
				accessor: "action",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	});

	const handleToggle = (issue: TableData): void => {
		if (selectedIssues.includes(issue)) {
			setSelectedIssues(selectedIssues.filter((item) => item !== issue));
		} else {
			setSelectedIssues([...selectedIssues, issue]);
		}
	};

	const handleCheckAllIssues = (event: ChangeEvent<HTMLInputElement>) => {
		if ((event.target as HTMLInputElement).checked) {
			setSelectedIssues(issues);
		} else {
			setSelectedIssues([]);
		}
	};

	return (
		<>
			<table
				{...getTableProps()}
				className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
			>
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="p-4 pr-12">
							<div className="flex items-center">
								<input
									id="checkbox-all-search"
									type="checkbox"
									onChange={handleCheckAllIssues}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label htmlFor="checkbox-all-search" className="sr-only">
									checkbox
								</label>
							</div>
						</th>
						{headerGroups.map((headerGroup) =>
							headerGroup.headers.map((column, index) => {
								return index === 3 ? (
									<th scope="col" className="px-24 py-3 flex justify-center">
										Action
									</th>
								) : (
									<th {...column.getHeaderProps()} className="px-6 py-3">
										{column.render("Header")}
									</th>
								);
							})
						)}
					</tr>
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="w-4 p-4">
									<div className="flex items-center">
										<input
											id="checkbox-table-search-1"
											type="checkbox"
											checked={selectedIssues.includes(row.original)}
											onChange={() => handleToggle(row.original)}
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label htmlFor="checkbox-table-search-1" className="sr-only">
											checkbox
										</label>
									</div>
								</td>
								{row.cells.map((cell, index) => {
									switch (index) {
										case 0:
											return (
												<td
													scope="row"
													className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
												>
													{cell.value}
												</td>
											);
										case 1:
											return (
												<td className="px-6 py-4">
													{cell.value === "solved" ? (
														<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
															Solved
														</span>
													) : (
														<span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
															Unsolved
														</span>
													)}
												</td>
											);
										case 2:
											return <td className="px-6 py-4">{cell.value}</td>;
										case 3:
											return (
												<td className="flex justify-center items-center px-6 py-4 space-x-3">
													<button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
														Edit
													</button>
													<button
														type="button"
														onClick={() => {
															document.querySelector("#delete-modal")?.classList.remove("hidden");
															document.querySelector("#delete-modal")?.classList.add("flex");
															setSelectedIssues([row.original]);
														}}
														className="font-medium text-red-600 dark:text-red-500 hover:underline"
													>
														Remove
													</button>
												</td>
											);
									}
								})}
							</tr>
						);
					})}
				</tbody>
			</table>

			<DeleteModal issues={selectedIssues} />

			{/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-24">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="p-4 pr-12">
							<div className="flex items-center">
								<input
									id="checkbox-all-search"
									type="checkbox"
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label htmlFor="checkbox-all-search" className="sr-only">
									checkbox
								</label>
							</div>
						</th>
						<th scope="col" className="px-6 py-3 pr-36">
							Issue title
						</th>
						<th scope="col" className="px-6 py-3">
							Status
						</th>
						<th scope="col" className="px-6 py-3">
							Date created
						</th>
						<th scope="col" className="px-6 py-3 flex justify-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td className="w-4 p-4">
							<div className="flex items-center">
								<input
									id="checkbox-table-search-1"
									type="checkbox"
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label htmlFor="checkbox-table-search-1" className="sr-only">
									checkbox
								</label>
							</div>
						</td>
						<td
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							Null Pointer Exception when accessing database
						</td>
						<td className="px-6 py-4">
							<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
								Solved
							</span>
						</td>
						<td className="px-6 py-4">2022-08-10</td>
						<td className="flex justify-center items-center px-6 py-4 space-x-3">
							<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
								Edit
							</a>
							<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
								Remove
							</a>
						</td>
					</tr>
				</tbody>
			</table> */}
		</>
	);
};

export default Index;

// <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-1"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-1" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Null Pointer Exception when accessing database
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
// 							Solved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-08-10</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-2"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-2" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Unable to load module dependencies
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
// 							Unsolved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-03-05</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-3"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-3" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Application crash when printing large documents
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
// 							Solved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-09-17</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-3"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-3" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Failure to load external library dependencies
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
// 							Solved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-02-20</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-3"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-3" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Crash when using non-ASCII characters in search query
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
// 							Unsolved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-06-08</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-3"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-3" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Memory leak causing application slowdown
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
// 							Unsolved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-07-22</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-3"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-3" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Inaccurate data synchronization between servers
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
// 							Solved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-03-05</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-3"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-3" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Incorrect data aggregation in analytics dashboard
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
// 							Solved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-12-11</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-3"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-3" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Broken link in user account activation email
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
// 							Solved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-04-14</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
// 				<tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// 					<td className="w-4 p-4">
// 						<div className="flex items-center">
// 							<input
// 								id="checkbox-table-search-3"
// 								type="checkbox"
// 								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
// 							/>
// 							<label htmlFor="checkbox-table-search-3" className="sr-only">
// 								checkbox
// 							</label>
// 						</div>
// 					</td>
// 					<th
// 						scope="row"
// 						className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
// 					>
// 						Security vulnerability allowing unauthorized access to sensitive data
// 					</th>
// 					<td className="px-6 py-4">
// 						<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
// 							Solved
// 						</span>
// 					</td>
// 					<td className="px-6 py-4">2022-11-01</td>
// 					<td className="flex justify-center items-center px-6 py-4 space-x-3">
// 						<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
// 							Edit
// 						</a>
// 						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
// 							Remove
// 						</a>
// 					</td>
// 				</tr>
