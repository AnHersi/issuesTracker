import * as React from "react";
import SideBar from "../../components/SideBar";
import Table from "../../components/Table/index";
import AboutModal from "../../components/Modal/AboutModal/index";
import CreateModal from "../../components/Modal/CreateModal/index";

const Index: React.FunctionComponent = () => {
	return (
		<div className="dark:bg-slate-900 w-screen min-h-screen absolute top-0 left-0">
			<SideBar />
			<Table />
			<AboutModal />
			<CreateModal />
		</div>
	);
};

export default Index;
