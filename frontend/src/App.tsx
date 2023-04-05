import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

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

export const issuesContext = createContext<Array<Object>>([]);

const App: React.FunctionComponent = () => {
	const [issues, setIssues] = useState<Array<Object>>([]);

	useEffect(() => {
		axios.get("http://localhost:8080/issues/all").then((response) => {
			const filteredData = response.data.map((issue: Issue) => {
				const { _id, __v, ...rest } = issue;
				return rest;
			});
			setIssues(filteredData);
		});
	}, []);

	return (
		<issuesContext.Provider value={issues}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</issuesContext.Provider>
	);
};
export default App;
