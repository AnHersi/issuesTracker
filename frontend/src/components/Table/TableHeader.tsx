import React, { MouseEvent, Dispatch, SetStateAction, ChangeEvent } from "react";

type Props = {
	handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
};

const Index: React.FunctionComponent<Props> = ({ handleFilter, searchTerm, setSearchTerm }) => {
	const handleClick = (event: MouseEvent<HTMLInputElement>): void => {
		const checkboxes = document.getElementsByName("status");
		checkboxes.forEach((checkbox) => {
			if (checkbox !== event.target) {
				(checkbox as HTMLInputElement).checked = false;
			}
		});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
			<div className="w-full md:w-1/2">
				<form className="flex items-center">
					<label htmlFor="simple-search" className="sr-only">
						Search
					</label>
					<div className="relative w-full">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<input
							type="text"
							id="simple-search"
							className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="Search"
							value={searchTerm}
							onChange={handleChange}
						/>
					</div>
				</form>
			</div>
			<div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-4 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
				<button
					type="button"
					data-modal-target="delete-modal"
					data-modal-toggle="delete-modal"
					className="flex items-center justify-between w-[5.75rem] text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-3 py-[0.69rem] text-center  mr-2  dark:bg-blue-700 dark:hover:bg-blue-800"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
						<g fill="currentColor">
							<path d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877Z" />
							<path
								fill-rule="evenodd"
								d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886Zm-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.043.713-.43.672-.864l-.5-5.263Zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707Z"
								clip-rule="evenodd"
							/>
						</g>
					</svg>
					Delete
				</button>
				<div className="flex items-center w-full space-x-3 md:w-auto">
					<button
						id="filterDropdownButton"
						data-dropdown-toggle="filterDropdown"
						className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md md:w-auto hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
						type="button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							className="w-4 h-4 mr-2 text-gray-400"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
								clip-rule="evenodd"
							/>
						</svg>
						Filter
						<svg
							className="-mr-1 ml-1.5 w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								clip-rule="evenodd"
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							/>
						</svg>
					</button>
					<div
						id="filterDropdown"
						className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
					>
						<h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Status</h6>
						<ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
							<li className="flex items-center select-none">
								<input
									id="apple"
									type="checkbox"
									name="status"
									value="solved"
									onClick={handleClick}
									onChange={handleFilter}
									className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									htmlFor="apple"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
								>
									Solved
								</label>
							</li>
							<li className="flex items-center select-none">
								<input
									id="fitbit"
									type="checkbox"
									name="status"
									value="unsolved"
									onClick={handleClick}
									onChange={handleFilter}
									className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									htmlFor="fitbit"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
								>
									Unsolved
								</label>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
