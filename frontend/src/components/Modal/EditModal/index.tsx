import React, { Dispatch, SetStateAction, useRef } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import EditForm from "./EditForm";

import "quill/dist/quill.snow.css";
import { TableData } from "../../Table";

type Props = {
	selectedIssues: TableData[];
	setSelectedIssues: Dispatch<SetStateAction<TableData[]>>;
};

const Index: React.FunctionComponent<Props> = ({ selectedIssues, setSelectedIssues }) => {
	const formRef = useRef(null);

	const {
		quill: quillDesc,
		quillRef: quillRefDesc,
		Quill: QuillDesc,
	} = useQuill({ ...quillConfig });

	const { quill: quillSol, quillRef: quillRefSol, Quill: QuillSol } = useQuill({ ...quillConfig });

	const handleClearForm = () => {
		(formRef as React.RefObject<any>).current.clear();
	};

	if (QuillDesc && QuillSol && !quillDesc && !quillSol) {
		QuillDesc.register("modules/blotFormatter", BlotFormatter);
		QuillSol.register("modules/blotFormatter", BlotFormatter);

		let icons = QuillDesc.import("ui/icons");

		icons.bold = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.8 19V5h5.525q1.625 0 3 1T16.7 8.775q0 1.275-.575 1.963t-1.075.987q.625.275 1.388 1.025T17.2 15q0 2.225-1.625 3.113t-3.05.887H6.8Zm3.025-2.8h2.6q1.2 0 1.463-.613t.262-.887q0-.275-.263-.887T12.35 13.2H9.825v3Zm0-5.7h2.325q.825 0 1.2-.425t.375-.95q0-.6-.425-.975t-1.1-.375H9.825V10.5Z"/></svg>`;
		icons.italic = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19v-2.5h4l3-9H8V5h10v2.5h-3.5l-3 9H15V19H5Z"/></svg>`;
		icons.underline = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"/></svg>`;
		icons.strike = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.154 14c.23.516.346 1.09.346 1.72c0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316c2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03c-2.48 0-3.719.782-3.719 2.346c0 .42.218.786.654 1.099c.436.313.974.562 1.613.75c.62.18 1.297.414 2.03.699z"/></svg>`;
		icons.blockquote = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.17 17c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94zm10 0c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94z"/></svg>`;
		icons[
			"code-block"
		] = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z"/></svg>`;
		icons.list.ordered = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>`;
		icons.list.bullet = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>`;
		icons.image = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21V3h7v2H5v14h14v-5.35l2 2V21H3Zm18.55-7.6l-3.1-3.1q-.525.35-1.125.525T16.05 11q-1.85 0-3.15-1.312T11.6 6.5q0-1.875 1.313-3.188T16.1 2q1.875 0 3.188 1.313T20.6 6.5q0 .675-.2 1.3t-.5 1.15L22.95 12l-1.4 1.4ZM16.1 9q1.05 0 1.775-.725T18.6 6.5q0-1.05-.725-1.775T16.1 4q-1.05 0-1.775.725T13.6 6.5q0 1.05.725 1.775T16.1 9ZM6 17l3-4l2.25 3l3-4L18 17H6Z"/></svg>`;
	}

	const hideModal = (): void => {
		handleClearForm();
		const modal = document.getElementById("edit-modal");
		(modal as HTMLElement).classList.add("hidden");
		setSelectedIssues([]);
	};

	return (
		<div
			id="edit-modal"
			tabIndex={-1}
			aria-hidden="true"
			className=" justify-center items-center fixed top-0 left-0 right-0 z-50 hidden w-full p-4 bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
		>
			<div className="relative w-full h-90% max-w-2xl md:h-auto">
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
						<h3 className="mb-8 text-xl font-medium text-gray-900 dark:text-white">Edit Issue</h3>
						<EditForm
							quillRefs={[quillRefDesc, quillRefSol]}
							quills={[quillDesc, quillSol]}
							ref={formRef}
							selectedIssues={selectedIssues}
							setSelectedIssues={setSelectedIssues}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const quillConfig = {
	theme: "snow",
	modules: {
		blotFormatter: {},
		toolbar: [
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],
			[{ list: "ordered" }, { list: "bullet" }],
			["image"],
		],
	},
};

export default Index;
