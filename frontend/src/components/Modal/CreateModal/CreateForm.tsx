import React, {
	ChangeEvent,
	FormEvent,
	useRef,
	useState,
	forwardRef,
	useImperativeHandle,
} from "react";
import { ImBin } from "react-icons/im";
import axios from "axios";

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

	const toggleRef = useRef(null);
	const containerRef = useRef(null);
	const formRef = useRef(null);

	const solutionToggle = (): void => {
		(toggleRef.current as unknown as HTMLElement).classList.toggle("hidden");
		(containerRef.current as unknown as HTMLElement).classList.toggle("hidden");
		clearEditor([1]);
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			issueTitle: event.target.value,
		});
	};

	const clearForm = () => {
		setFormData({ issueTitle: "" });
		clearEditor([0, 1]);
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

		axios
			.post("http://localhost:8080/issues/new", formData)
			.then((response) => {
				console.log(response);
				clearForm();
				const modal = document.getElementById("create-modal");
				(modal as HTMLElement).classList.add("hidden");
			})
			.catch((err: Error) => {
				console.log(err);
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
					className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded text-sm inline-flex items-center px-3 py-2 text-center mr-3"
				>
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
