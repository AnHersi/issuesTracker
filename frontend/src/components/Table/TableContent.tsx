import React, { Dispatch, SetStateAction } from "react";
import { TableData } from ".";
import TableSkeleton from "./TableSkeleton";
import DeleteModal from "../Modal/DeleteModal";
import ViewModal from "../Modal/ViewModal";

type Props = {
	table: any;
	selectedIssues: TableData[];
	setSelectedIssues: Dispatch<SetStateAction<TableData[]>>;
	handleToggle: (issue: TableData) => void;
	isLoading: boolean;
};

const Index: React.FunctionComponent<Props> = ({
	table,
	selectedIssues,
	setSelectedIssues,
	handleToggle,
	isLoading,
}) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

	return (
		<>
			<table
				{...getTableProps()}
				className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
			>
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="p-4 pr-12 py-6"></th>
						{headerGroups.map((headerGroup: any) =>
							headerGroup.headers.map((column: any, index: number) => {
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
					{rows.map((row: any) => {
						prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								onClick={() => {
									handleToggle(row.original);
								}}
								className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="w-4 p-4">
									<div className="flex items-center">
										<input
											id="checkbox-table-search-1"
											type="checkbox"
											checked={selectedIssues.includes(row.original)}
											onClick={() => handleToggle(row.original)}
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label htmlFor="checkbox-table-search-1" className="sr-only">
											checkbox
										</label>
									</div>
								</td>
								{row.cells.map((cell: any, index: number) => {
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
											return (
												<td className="px-6 py-4">
													{(() => {
														let date = new Date(parseFloat(cell.value));
														const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
															date.getMonth() + 1
														)
															.toString()
															.padStart(2, "0")}-${date.getFullYear()}`;
														return formattedDate;
													})()}
												</td>
											);
										case 3:
											return (
												<td className="flex justify-center items-center px-6 py-4 space-x-3">
													<button
														onClick={() => {
															document.querySelector("#view-modal")?.classList.remove("hidden");
															document.querySelector("#view-modal")?.classList.add("flex");
															setSelectedIssues([row.original]);
														}}
														className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
													>
														View
													</button>
													<button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
														Edit
													</button>
													<button
														onClick={() => {
															document.querySelector("#delete-modal")?.classList.remove("hidden");
															document.querySelector("#delete-modal")?.classList.add("flex");
															setSelectedIssues([row.original]);
														}}
														className="font-medium text-red-600 dark:text-red-500 hover:underline"
													>
														Delete
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

			<DeleteModal selectedIssues={selectedIssues} setSelectedIssues={setSelectedIssues} />
			<ViewModal selectedIssues={selectedIssues} setSelectedIssues={setSelectedIssues} />
			{isLoading && <TableSkeleton />}
		</>
	);
};

export default Index;
