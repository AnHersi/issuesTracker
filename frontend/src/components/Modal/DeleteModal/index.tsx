import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import axios from "axios";
import { fetchIssuesData, issuesContext } from "../../../App";
import { TableData } from "../../Table";
import { toast } from "react-toastify";

type Props = {
	selectedIssues: TableData[];
	setSelectedIssues: Dispatch<SetStateAction<TableData[]>>;
};

const Index: React.FunctionComponent<Props> = ({ selectedIssues, setSelectedIssues }) => {
	const { setIssues } = useContext(issuesContext);

	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const issuesIds = selectedIssues.map((issue) => issue.id);

	const handleDelete = (): void => {
		setIsDeleting(true);

		axios
			.delete(`http://localhost:8080/issues?ids=${issuesIds.join(",")}`)
			.then(() => {
				hideModal();
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
				setIsDeleting(false);
			})
			.catch((err: Error) => {
				console.error(err);
				setIsDeleting(false);
			});
	};

	const hideModal = (): void => {
		const modal = document.getElementById("delete-modal");
		(modal as HTMLElement).classList.add("hidden");
		setSelectedIssues([]);
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
						onClick={hideModal}
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
								Are you sure you want to delete{" "}
								{selectedIssues.length > 1 ? "these issues" : "this issue"}
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
								{isDeleting && (
									<div role="status">
										<svg
											aria-hidden="true"
											className="w-5 h-5 mr-2 text-gray-200 animate-spin fill-blue-700"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
										<span className="sr-only">Loading...</span>
									</div>
								)}
								Delete issue
							</button>
							<button
								onClick={hideModal}
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
