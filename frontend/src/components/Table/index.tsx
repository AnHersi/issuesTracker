import * as React from "react";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

const Index: React.FunctionComponent = () => {
	return (
		<section className="bg-white dark:bg-gray-900 py-3 sm:py-5 sm:ml-60">
			<div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
				<div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
					<TableHeader />
					<div className="overflow-x-auto mt-3">
						<TableContent />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
