import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { TableData } from "../../Table";
import { issuesContext } from "../../../App";

type Props = {
	selectedIssues: TableData[];
	setSelectedIssues: Dispatch<SetStateAction<TableData[]>>;
};

const Index: React.FunctionComponent<Props> = ({ selectedIssues, setSelectedIssues }) => {
	let { issues: issueData } = useContext(issuesContext);

	const hideModal = (): void => {
		const modal = document.getElementById("view-modal");
		(modal as HTMLElement).classList.add("hidden");
		setSelectedIssues([]);
	};

	const issues = issueData.filter((issue) => issue.id === selectedIssues[0]?.id);

	return (
		<div>
			<div
				id="view-modal"
				tabIndex={-1}
				aria-hidden="true"
				className="justify-center items-center fixed top-0 left-0 right-0 z-50 hidden w-full p-4 bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
			>
				<div className="relative w-full h-full max-w-2xl md:h-auto">
					<div className="relative bg-white rounded shadow dark:bg-gray-700">
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
						<div className="px-6 py-6 lg:px-8">
							<div className="mb-3 text-md font-medium text-gray-600 dark:text-white">Title</div>
							<div className="block mb-8 text-xl font-medium text-gray-600 dark:text-white">
								{issues[0]?.issueTitle}
							</div>
							<div className="mb-2 text-md font-medium  text-gray-600 dark:text-white">
								Description
							</div>
							<div
								className="text-black text-sm dark:text-white mb-8 border border-gray-300 dark:border-gray-500 rounded-[3px] p-3"
								dangerouslySetInnerHTML={{ __html: issues[0]?.description }}
							></div>
							<div className="mb-2 text-md font-medium text-gray-600 dark:text-white">Solution</div>
							<div
								className="text-black text-sm dark:text-white  border border-gray-300 dark:border-gray-500 rounded-[3px] p-3"
								dangerouslySetInnerHTML={{ __html: issues[0]?.solution }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
