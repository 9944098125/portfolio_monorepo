import React, { useState, useEffect } from "react";
import {
	User,
	Star,
	Folder,
	Menu,
	GraduationCap,
	Info,
	Handshake,
	Palette,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "app/components/ui/theme-provider";

export const Sidebar = () => {
	const [open, setOpen] = useState<boolean>(false);
	const location = useLocation();
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);

	const linkBase =
		"flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer";

	const activeClass =
		"relative pl-3 font-semibold text-yellow-600 transition-all duration-300 " +
		"before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:bg-yellow-600 " +
		"after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-yellow-600";

	const inactiveClass =
		"relative pl-3 text-gray-900 transition-all duration-300 " +
		"before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-teal-500 before:transition-all before:duration-300 " +
		"after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-teal-500 after:transition-all after:duration-300 " +
		"hover:text-teal-600 hover:before:w-1.5 hover:after:w-full";

	const user = useSelector(selectUser);

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

	const isActiveLink = (to: string) => {
		const currentPath = location.pathname;
		const currentHash = location.hash;

		// For hash links
		if (to.includes("#")) {
			const [path, hash] = to.split("#");
			const expectedHash = `#${hash}`;

			// Check if pathname matches
			if (currentPath !== path) {
				return false;
			}

			// If no hash in URL and this is the first link (personal-details), consider it active
			if (!currentHash && hash === "personal-details") {
				return true;
			}

			// Otherwise, check if hash matches
			return currentHash === expectedHash;
		}

		// For regular links
		return currentPath === to;
	};

	return (
		<React.Fragment>
			<div className="hidden md:block">
				{/* Sidebar */}
				<div
					className={`
          fixed md:static top-0 left-0 h-full shadow-xl border-r p-6 flex flex-col gap-8 w-64 z-40 transition-transform duration-300
          ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
					<nav className="flex flex-col gap-3 text-xl">
						<HashLink
							smooth
							to={`/${user?._id}#personal-details`}
							className={`${linkBase} ${
								isActiveLink(`/${user?._id}#personal-details`)
									? activeClass
									: inactiveClass
							}`}>
							<User size={20} />
							<span className="font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing">
								Personal Details
							</span>
						</HashLink>

						<HashLink
							smooth
							to={`/${user?._id}#skills`}
							className={`${linkBase} ${
								isActiveLink(`/${user?._id}#skills`)
									? activeClass
									: inactiveClass
							}`}>
							<Star size={20} />
							<span className="font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing">
								Skills{" "}
							</span>
						</HashLink>

						<HashLink
							smooth
							to={`/${user?._id}#projects`}
							className={`${linkBase} ${
								isActiveLink(`/${user?._id}#projects`)
									? activeClass
									: inactiveClass
							}`}>
							<Folder size={20} />
							<span className="font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing">
								Projects{" "}
							</span>
						</HashLink>

						<HashLink
							smooth
							to={`/${user?._id}#educational-details`}
							className={`${linkBase} ${
								isActiveLink(`/${user?._id}#educational-details`)
									? activeClass
									: inactiveClass
							}`}>
							<GraduationCap size={20} />
							<span className="font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing">
								Experiences
							</span>
						</HashLink>

						<HashLink
							smooth
							to={`/${user?._id}#about`}
							className={`${linkBase} ${
								isActiveLink(`/${user?._id}#about`)
									? activeClass
									: inactiveClass
							}`}>
							<Info size={20} />
							<span className="font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing">
								About
							</span>
						</HashLink>

						<HashLink
							smooth
							to={`/${user?._id}#connections`}
							className={`${linkBase} ${
								isActiveLink(`/${user?._id}#connections`)
									? activeClass
									: inactiveClass
							}`}>
							<Handshake size={20} />
							<span className="font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing">
								Connections
							</span>
						</HashLink>

						<HashLink
							smooth
							to={`/${user?._id}#themes`}
							className={`${linkBase} ${
								isActiveLink(`/${user?._id}#themes`)
									? activeClass
									: inactiveClass
							}`}>
							<Palette size={20} />
							<span className="font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing">
								Theme
							</span>
						</HashLink>

						<Link
							to={`/${user?._id}/emoji-memory-game`}
							className={`${linkBase} ${
								isActiveLink(`/${user?._id}/emoji-memory-game`)
									? activeClass
									: inactiveClass
							}`}>
							<Handshake size={20} />
							<span className="font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing">
								Emoji Game
							</span>
						</Link>
					</nav>

					<div className="mt-auto pt-15">
						<a
							href={`/${user?._id}/portfolio`}
							target="_blank"
							style={{ textDecoration: "none" }}>
							<button type="button" className={`${linkBase} ${inactiveClass}`}>
								<span className="text-xl font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
									Portfolio Link
								</span>
							</button>
						</a>
					</div>
				</div>

				{/* Mobile Overlay */}
				{open && (
					<div
						className="fixed inset-0 bg-black/40 md:hidden z-30"
						onClick={() => setOpen(false)}
					/>
				)}
			</div>
		</React.Fragment>
	);
};
