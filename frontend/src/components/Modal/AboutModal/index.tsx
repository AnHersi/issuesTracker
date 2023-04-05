import * as React from "react";
import { AiOutlineGithub } from "react-icons/ai";
import AboutImage from "../../../assets/about.png";

const Index: React.FunctionComponent = () => {
	return (
		<div>
			<div
				id="popup-modal"
				tabIndex={-1}
				className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
			>
				<div className="absolute sm:bottom-4 sm:left-60 w-72">
					<div className="relative bg-white rounded shadow dark:bg-gray-700">
						<div className="p-6 pt-0 flex flex-col items-center">
							<img src={AboutImage} className="w-48 h-42" alt="about image" />
							<h3 className="mb-5 text-sm font-normal text-slate-900 dark:text-white">
								This issues tracker application built with React on the front-end and NodeJS on the
								back-end.
								<br />
								<br />
								Read more on my website or check out the github repo.
							</h3>
							<div className="flex items-center justify-evenly">
								<a href="https://www.anashersi.co.uk" target="_blank">
									<button
										data-modal-hide="popup-modal"
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-xs inline-flex items-center px-5 py-2.5 text-center mr-2"
									>
										Visit Website
									</button>
								</a>
								<a href="https://github.com/AnHersi/issuesTracker" target="_blank">
									<button
										data-modal-hide="popup-modal"
										type="button"
										className="flex items-center text-gray-600 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-500 dark:text-white dark:border-gray-500 dark:hover:bg-gray-600"
									>
										<AiOutlineGithub className="w-5 h-4 mr-2" />
										Github
									</button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
