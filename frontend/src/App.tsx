import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
//@ts-ignore
import { Sugar } from "react-preloaders";

export type Issue = {
	id: string;
	issueTitle: string;
	description: any;
	solution: any;
	status: string;
	created_at: string;
	__v: string;
	_id: string;
};

export type IssuesContext = {
	issues: Issue[];
	setIssues: Dispatch<SetStateAction<Issue[]>>;
};

export const issuesContext = createContext<IssuesContext>({
	issues: [],
	setIssues: () => {},
});

export const fetchIssuesData = (): Promise<Issue[]> => {
	return axios
		.get("http://localhost:8080/issues/all")
		.then((response) => {
			const filteredData = response.data.map((issue: Issue) => {
				const { _id, __v, ...rest } = issue;
				return rest;
			});
			return filteredData;
		})
		.catch((err: Error) => {
			return [];
		});
};

const App: React.FunctionComponent = () => {
	const [issues, setIssues] = useState<Issue[]>([]);

	useEffect(() => {
		fetchIssuesData().then((data) => {
			setIssues(data);
		});
	}, []);

	return (
		<issuesContext.Provider value={{ issues, setIssues }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</issuesContext.Provider>
	);
};
export default App;
