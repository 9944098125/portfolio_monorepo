/**
 *
 * Admin
 *
 */
import React, { memo, useEffect, useState } from "react";
import { CreateUserDialog } from "./components/create-user-dialog";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { Button } from "app/components/ui/button";
import { User as UserIcon } from "lucide-react";
import { UpdateUser } from "./components/update-user";
import { useTheme } from "app/components/ui/theme-provider";

interface Props {}

export const User = memo((props: Props) => {
	const user = useSelector(selectUser);
	const [open, setOpen] = useState(false);
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
		<React.Fragment>
			<div
				style={{ padding: user?.is_admin ? "50px 0" : "20px 20px" }}
				className={`relative ${isDarkMode ? "bg-black text-white" : ""}`}>
				{user?.is_admin && (
					<React.Fragment>
						<Button
							onClick={() => setOpen(true)}
							variant="outline"
							className="absolute right-2 top-2 px-8 py-4 rounded-2xl">
							Create User <UserIcon />
						</Button>
						<CreateUserDialog open={open} setOpen={setOpen} />
					</React.Fragment>
				)}
				<UpdateUser />
			</div>
		</React.Fragment>
	);
});
