import { ExitIcon } from "@radix-ui/react-icons";
import { useGlobalSlice } from "app/slice";
import { selectUser } from "app/slice/selectors";
import { use } from "i18next";
import { SettingsIcon, UserIcon } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useClickOutside } from "utils/hooks/use-click-outside";
import { useTheme } from "app/components/ui/theme-provider";

export const AvatarDropdown = () => {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { actions } = useGlobalSlice();
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);

	const [showDropdown, setShowDropdown] = useState(false);
	const avatarRef = useRef<HTMLDivElement>(null);
	useClickOutside(avatarRef, () => setShowDropdown(false));

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

	const logoutUser = () => {
		dispatch(actions.logout());
		navigate("/");
	};

	return (
		<React.Fragment>
			<div ref={avatarRef} className="relative">
				<div
					onClick={() => setShowDropdown(!showDropdown)}
					className="h-[2.5rem] w-[2.5rem] md:h-[3.5rem] md:w-[3.5rem] rounded-full border-4 border-teal-600 p-1 cursor-pointer">
					<img
						src={user?.image ? user.image : "/images/user.png"}
						alt="User"
						className="rounded-full h-full w-full"
					/>
				</div>
				{showDropdown && (
					<div className={`absolute z-[99999] w-[10rem] md:w-[20rem] right-2 top-[3rem] rounded-2xl cursor-pointer ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
						<Link to={`/${user?._id}/settings`}>
							<div className={`p-2 border-b flex items-center space-x-5 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
								<SettingsIcon className={isDarkMode ? "text-white" : "text-black"} />
								<p className={`font-[600] font-poppins text-[.9rem] md:text-[1.2rem] ${isDarkMode ? "text-white" : "text-black"}`}>
									Settings
								</p>
							</div>
						</Link>
						<div
							onClick={logoutUser}
							className="rounded-bl-2xl rounded-br-2xl p-2 bg-red-600 hover:bg-red-800 text-white border-b flex items-center space-x-5">
							<ExitIcon />
							<p className="font-[600] font-poppins text-[.9rem] md:text-[1.2rem]">
								Logout
							</p>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};
