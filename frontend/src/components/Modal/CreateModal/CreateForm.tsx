import React, {
	ChangeEvent,
	FormEvent,
	useRef,
	useState,
	forwardRef,
	useImperativeHandle,
	useContext,
} from "react";
import axios from "axios";
import { ImBin } from "react-icons/im";
import { toast } from "react-toastify";
import { fetchIssuesData, issuesContext } from "../../../App";

type Props = {
	quills: any[];
	quillRefs: React.RefObject<any>[];
};

type FormData = {
	issueTitle?: string;
	description?: any;
	solution?: any;
};

type CreateFormRef = {
	clear: () => void;
};

const CreateForm: React.ForwardRefRenderFunction<CreateFormRef, Props> = (
	{ quills, quillRefs },
	ref
) => {
	const [formData, setFormData] = useState<FormData>({ issueTitle: "" });
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const { setIssues } = useContext(issuesContext);

	const toggleRef = useRef(null);
	const containerRef = useRef(null);
	const formRef = useRef(null);

	const toggle = toggleRef.current as unknown as HTMLElement;
	const container = containerRef.current as unknown as HTMLElement;

	const solutionToggle = (): void => {
		toggle.classList.toggle("hidden");
		container.classList.toggle("hidden");
		clearEditor([1]);
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			issueTitle: event.target.value,
		});
	};

	const clearForm = (): void => {
		setFormData({ issueTitle: "" });
		clearEditor([0, 1]);
	};

	const hideModal = (): void => {
		const modal = document.getElementById("create-modal");
		(modal as HTMLElement).classList.add("hidden");
	};

	const hideContainer = (): void => {
		if (!container.classList.contains("hidden")) {
			toggle.classList.remove("hidden");
			container.classList.toggle("hidden");
		}
	};

	const clearEditor = (indexes: number[]): void => {
		indexes.forEach((index) => {
			quills[index]?.setContents([]);
		});
	};

	useImperativeHandle(ref, () => ({
		clear: clearForm,
	}));

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		setIsSubmitting(true);

		axios
			.post("http://localhost:8080/issues/new", formData)
			.then(() => {
				hideModal();
				clearForm();
				hideContainer();
				fetchIssuesData().then((data) => {
					setIssues(data);
				});
				setIsSubmitting(false);
				toast.success("Successfully created issue", {
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
				console.error(err);
				setIsSubmitting(false);
			});
	};

	[0, 1].forEach((index) => {
		quills[index]?.on("text-change", () => {
			const field = index === 0 ? "description" : "solution";
			const value = quills[index]?.getContents() || "";

			setFormData((prev) => ({ ...prev, [field]: value }));
		});
	});

	return (
		<form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
			<div>
				<label
					htmlFor="issue_title"
					className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
				>
					Issue title
				</label>
				<input
					type="text"
					id="issue_title"
					className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 focus:bg-white block w-full px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:bg-transparent"
					placeholder=""
					value={formData.issueTitle}
					onChange={(event) => handleInputChange(event)}
					required
				/>
			</div>

			<div className="w-full min-h-lg">
				<label
					htmlFor="description"
					className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
				>
					Description
				</label>
				<div id="description" ref={quillRefs[0]} />
			</div>

			<button
				type="button"
				ref={toggleRef}
				onClick={solutionToggle}
				className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded text-sm px-2.5 py-1.5 mb-36 text-center"
			>
				Add solution
			</button>

			<div ref={containerRef} className="hidden w-full min-h-lg">
				<div className="flex w-full justify-between items-center">
					<label
						htmlFor="solution"
						className="block mb-2 text-md font-medium text-gray-600 dark:text-white"
					>
						Solution
					</label>
					<button
						type="button"
						onClick={solutionToggle}
						className="flex items-center justify-between w-24 scale-[0.9] text-white bg-red-600 hover:bg-red-500 font-medium rounded text-sm px-2.5 py-1.5 mb-3 mr-3 text-center dark:bg-red-700 dark:hover:bg-red-600"
					>
						<ImBin /> Remove
					</button>
				</div>
				<div id="solution" ref={quillRefs[1]} />
			</div>

			<div className="flex items-center justify-end">
				<button
					type="submit"
					disabled={isSubmitting}
					className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded text-sm inline-flex items-center px-3 py-2 text-center mr-3"
				>
					{isSubmitting && (
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
					Create issue
				</button>
				<button
					type="button"
					data-modal-hide="create-modal"
					className="flex items-center text-gray-700 bg-white hover:bg-gray-100 rounded text-sm font-medium px-3 py-2 focus:z-10 dark:bg-gray-500 dark:text-white dark:border-gray-500 dark:hover:bg-gray-600"
					onClick={clearForm}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default forwardRef(CreateForm);
