import * as React from "react";
import SideBar from "../../components/SideBar";
import Table from "../../components/Table/index";
//@ts-ignore
import { Sugar } from "react-preloaders";

const Index: React.FunctionComponent = () => {
	let background = document.documentElement.classList.contains("dark")
		? "rgb(14, 23, 41)"
		: "rgb(255, 255, 255)";

	return (
		<div className="dark:bg-slate-900 w-screen min-h-screen absolute top-0 left-0">
			<SideBar />
			<Table />
			{/* <Sugar color={"rgb(45, 104, 233)"} background={background} /> */}
		</div>
	);
};

export default Index;
