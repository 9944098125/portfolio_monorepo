import React, { useEffect, useState } from "react";
import { LoginButton } from "./login-button";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { AvatarDropdown } from "./avatar-dropdown";
import { Link } from "react-router-dom";
import { useTheme } from "app/components/ui/theme-provider";

export const Navbar = () => {
	const user = useSelector(selectUser);
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const updateDarkMode = () => {
			if (theme === "dark") {
				setIsDarkMode(true);
			} else if (theme === "light") {
				setIsDarkMode(false);
			} else if (theme === "system") {
				setIsDarkMode(
					window.matchMedia("(prefers-color-scheme: dark)").matches,
				);
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
		<React.Fragment>
			<div
				className={`h-[3.8rem] border-b border-2 flex items-center justify-between px-6 ${
					isDarkMode ? "bg-black text-white" : "bg-white text-black"
				}`}>
				<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
					<div className="h-[4rem] w-[10rem]">
						<img
							src="/images/logo.avif"
							alt="Logo"
							className="h-full w-full object-fit"
						/>
					</div>
				</Link>
				<div className="flex items-center space-x-5">
					{user ? <AvatarDropdown /> : <LoginButton />}
				</div>
			</div>
		</React.Fragment>
	);
};
