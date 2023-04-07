import React, { useContext, useEffect } from "react";
import axios from "axios";
import { fetchIssuesData, issuesContext } from "../../../App";
import { TableData } from "../../Table/TableContent";
import { toast } from "react-toastify";

type Props = {
	issues: TableData[];
};

const Index: React.FunctionComponent<Props> = ({ issues }) => {
	const { setIssues } = useContext(issuesContext);

	const issuesIds = issues.map((issue) => issue.id);

	const handleDelete = () => {
		console.log(issuesIds);
		axios
			.delete(`http://localhost:8080/issues?ids=${issuesIds.join(",")}`)
			.then((response) => {
				const modal = document.getElementById("delete-modal");
				(modal as HTMLElement).classList.add("hidden");
				fetchIssuesData().then((data) => {
					setIssues(data);
				});
				toast.success("Successfully deleted " + (issuesIds.length > 1 ? "issues" : "issue"), {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
				});
			})
			.catch((err: Error) => {
				console.log(err);
			});
	};

	return (
		<div
			id="delete-modal"
			tabIndex={-1}
			className="justify-center items-center hidden fixed top-0 left-0 right-0 z-50 p-4 bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
		>
			<div className="relative w-full h-full max-w-md md:h-auto">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<button
						type="button"
						className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
						data-modal-hide="delete-modal"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span className="sr-only">Close modal</span>
					</button>
					<div className="p-6">
						<svg
							aria-hidden="true"
							className="mx-auto mb-4 text-gray-500 w-14 h-14 dark:text-gray-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<div className="px-6">
							<h3 className="mb-5 mt-8 text-lg text-gray-700 font-medium dark:text-gray-300">
								Are you sure you want to delete {issues.length > 1 ? "these issues" : "this issue"}
							</h3>
							<h5 className="mb-5 text-sm text-gray-700 font-medium dark:text-gray-300">
								Once you delete, it's gone for good.
							</h5>
						</div>
						<div className="mt-14 w-full flex justify-end">
							<button
								data-modal-hide="popup-modal"
								type="button"
								onClick={handleDelete}
								className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded text-sm inline-flex items-center px-3 py-2 text-center mr-2"
							>
								Delete issue
							</button>
							<button
								data-modal-hide="delete-modal"
								type="button"
								className="text-gray-700 bg-white hover:bg-gray-100 rounded text-sm font-medium px-3 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-500 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
