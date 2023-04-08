import * as React from "react";
import logo from "../../assets/logo.png";
import ThemeToggle from "../ThemeToggle/Index";
import SidebarToggle from "./SidebarToggle";
import AboutModal from "../Modal/AboutModal";
import { TfiPlus } from "react-icons/tfi";
import { TfiSearch } from "react-icons/tfi";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Index: React.FunctionComponent = () => {
	return (
		<div>
			<SidebarToggle />
			<AboutModal />
			<aside
				id="sidebar"
				className="fixed top-0 left-0 z-40 w-56 h-screen transition-tranform duration-200 -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-100 border border-gray-100 dark:border-0 dark:bg-gray-800">
					<ul className="space-y-2 font-medium">
						<li>
							<a
								href="/"
								className="flex items-center p-2 text-gray-900 rounded-md mb-10 dark:text-white"
							>
								<img src={logo} className="w-8 h-8 rounded-md" alt="logo" />
								<span className="ml-3">Issues Tracker</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex justify-evenly items-center p-2 text-gray-900 text-sm rounded dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								<TfiSearch className="w-6 h-6 scale-90" />
								<span>SEARCH ISSUE</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								data-modal-target="create-modal"
								data-modal-toggle="create-modal"
								className="flex justify-evenly items-center p-2 text-gray-900 text-sm rounded dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								<TfiPlus className="w-6 h-6" />
								<span>CREATE ISSUE</span>
							</a>
						</li>
					</ul>
					<div>
						<ThemeToggle />
						<div
							data-modal-target="popup-modal"
							data-modal-toggle="popup-modal"
							className="flex justify-around items-center p-2 mt-6 text-gray-900 text-sm rounded cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
						>
							<IoMdInformationCircleOutline className="w-6 h-6" />
							<span className="-translate-x-8 select-none">ABOUT</span>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Index;
