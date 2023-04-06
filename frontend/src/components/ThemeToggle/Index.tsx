import { useState, useEffect } from "react";

const Index: React.FunctionComponent = () => {
	const [isDark, setIsDark] = useState<boolean>(false);

	const [themeText, setThemeText] = useState("Light mode");

	useEffect(() => {
		setTimeout(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		}, 1000);
	}, []);

	useEffect(() => {
		setThemeText(isDark ? "Dark mode" : "Light mode");
	}, [isDark]);

	const toggleClass = (selector: string, className: string): void => {
		document.querySelectorAll(selector).forEach((element) => {
			element.classList.toggle(className);
		});
	};

	const handleToggle = (): void => {
		document.documentElement.classList.toggle("dark");
		setIsDark(!isDark);
		toggleClass(
			".ql-snow.ql-toolbar, .ql-snow.ql-container, .ql-snow.ql-toolbar button svg",
			"dark"
		);
		themeText == "Light mode" ? setThemeText("Dark mode") : setThemeText("Light mode");
	};

	return (
		<div className="flex justify-around items-center">
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					value=""
					className="sr-only peer"
					checked={isDark}
					onClick={handleToggle}
				/>
				<div className="w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="ml-3 select-none text-sm font-medium text-gray-900 dark:text-gray-300">
					{themeText}
				</span>
			</label>
		</div>
	);
};

export default Index;
