import React from "react";

const TableSkeleton: React.FunctionComponent = (props) => {
	return (
		<div
			role="status"
			className="w-full space-y-2 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
		>
			<div className="flex justify-between items-center pb-1">
				<div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-6"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="flex ml-12">
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 mr-2 w-12"></div>
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
				</div>
			</div>
			<div className="flex justify-between items-center pt-3 pb-1">
				<div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-6"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="flex ml-12">
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 mr-2 w-12"></div>
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
				</div>
			</div>
			<div className="flex justify-between items-center pt-3 pb-1">
				<div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-6"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="flex ml-12">
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 mr-2 w-12"></div>
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
				</div>
			</div>
			<div className="flex justify-between items-center pt-3 pb-1">
				<div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-6"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="flex ml-12">
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 mr-2 w-12"></div>
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
				</div>
			</div>
			<div className="flex justify-between items-center pt-3 pb-1">
				<div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-6"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="flex ml-12">
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 mr-2 w-12"></div>
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
				</div>
			</div>
			<div className="flex justify-between items-center pt-3 pb-1">
				<div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-6"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="flex ml-12">
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 mr-2 w-12"></div>
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
				</div>
			</div>
			<div className="flex justify-between items-center pt-3">
				<div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-6"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[12%]"></div>
				<div className="flex ml-12">
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 mr-2 w-12"></div>
					<div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
				</div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default TableSkeleton;
