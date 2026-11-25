/**
 *
 * Settings
 *
 */
import * as React from "react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "app/components/ui/tabs";
import ChangePassword from "./components/change-password";
import ChangeTheme from "./components/change-theme";
import { useSlice } from "./slice";
import { useTheme } from "app/components/ui/theme-provider";

interface Props {}

export function Settings(props: Props) {
	useSlice();
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	
	useEffect(() => {
		const updateDarkMode = () => {
			if (theme === "dark") {
				setIsDarkMode(true);
			} else if (theme === "light") {
				setIsDarkMode(false);
			} else if (theme === "system") {
				setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
			}
		};
		
		updateDarkMode();
		
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			mediaQuery.addEventListener("change", updateDarkMode);
			return () => mediaQuery.removeEventListener("change", updateDarkMode);
		}
	}, [theme]);
	
	return (
		<div className={`relative rounded-2xl p-6 w-full ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"}`}>
			<h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
				Settings
			</h1>
			<Tabs defaultValue="password" className="w-full">
				<TabsList className="flex items-center justify-start">
					<TabsTrigger 
						value="password"
						className={`data-[state=active]:border-b-4 data-[state=active]:border-teal-600 data-[state=active]:border-solid data-[state=active]:bg-transparent ${isDarkMode ? "data-[state=active]:text-white" : "data-[state=active]:text-gray-800"}`}
					>
						Change Password
					</TabsTrigger>
					<TabsTrigger 
						value="theme"
						className={`data-[state=active]:border-b-4 data-[state=active]:border-teal-600 data-[state=active]:border-solid data-[state=active]:bg-transparent ${isDarkMode ? "data-[state=active]:text-white" : "data-[state=active]:text-gray-800"}`}
					>
						Change Theme
					</TabsTrigger>
				</TabsList>
				<TabsContent value="password" className="mt-6">
					<ChangePassword />
				</TabsContent>
				<TabsContent value="theme" className="mt-6">
					<ChangeTheme />
				</TabsContent>
			</Tabs>
		</div>
	);
}
