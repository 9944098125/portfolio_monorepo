// src/components/projects/project-item.tsx
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { XIcon, Edit3, Trash2 } from "lucide-react";
import { useTheme } from "app/components/ui/theme-provider";

interface ProjectItemProps {
	thumbnail?: string;
	name?: string;
	skills?: string[];
	description?: string;
	liveDemo?: string;
	githubLink?: string;
	createdAt?: string;
	// additional props from parent Projects component
	idx?: number;
	projectItem?: any; // use your IProject type if available
	setProjectId: Dispatch<SetStateAction<string | undefined>>;
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; projectId?: string | undefined }>
	>;
	deleteProjectLoading?: boolean;
	setShowConfirm: Dispatch<SetStateAction<boolean>>;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
	thumbnail,
	name,
	skills,
	description,
	liveDemo,
	githubLink,
	createdAt,
	idx,
	projectItem,
	setProjectId,
	setOpen: setParentDialogOpen,
	deleteProjectLoading,
	setShowConfirm,
}) => {
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [open, setOpen] = useState(false);

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

	// Open parent edit dialog for this project
	const handleEdit = () => {
		if (projectItem && projectItem._id) {
			// open parent ProjectDialog in edit mode
			setParentDialogOpen({ bool: true, projectId: projectItem._id });
		}
		// close local details dialog
		setOpen(false);
	};

	// Ask parent to confirm deletion
	const handleDelete = () => {
		if (projectItem && projectItem._id) {
			setProjectId(projectItem._id);
			setShowConfirm(true);
		}
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* GRID ITEM (click to open details) */}
			<DialogTrigger asChild>
				<div
					className={`p-4 cursor-pointer border rounded-xl shadow-sm hover:shadow-md transition-all col-span-12 sm:col-span-6 md:col-span-4 gap-2 ${
						isDarkMode
							? "bg-black text-white border-gray-700"
							: "bg-white text-black border-gray-200"
					}`}>
					{thumbnail ? (
						<img
							src={thumbnail}
							alt={`${name} thumbnail`}
							className="h-36 w-full object-cover rounded-md"
						/>
					) : (
						<div className="h-36 w-full rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
							No thumbnail
						</div>
					)}

					<h3 className="text-lg font-semibold mt-2">{name}</h3>

					{skills && skills.length > 0 && (
						<div className="flex flex-wrap gap-2 mt-2">
							{skills.map((s, i) => (
								<span
									key={i}
									className={`px-2 py-1 text-xs rounded-md ${
										isDarkMode
											? "bg-gray-600 text-white"
											: "bg-gray-200 text-black"
									}`}>
									{s}
								</span>
							))}
						</div>
					)}
				</div>
			</DialogTrigger>

			{/* FULL DETAILS DIALOG */}
			<DialogContent
				className={`p-4 max-w-xl ${
					isDarkMode ? "bg-black text-white" : "bg-white text-black"
				}`}>
				<div className="flex items-center justify-between">
					<DialogTitle>{name}</DialogTitle>
					<DialogClose
						className={`p-2 rounded-lg ${
							isDarkMode ? "text-red-400 bg-red-900" : "text-red-600 bg-red-100"
						}`}>
						<XIcon className="w-4 h-4" />
					</DialogClose>
				</div>

				<div className="text-sm space-y-4 mt-3">
					{thumbnail && (
						<img
							src={thumbnail}
							alt="thumb"
							className="w-full h-48 object-cover rounded-lg"
						/>
					)}

					{description && (
						<p>
							<strong>Description:</strong> {description}
						</p>
					)}

					{skills && skills.length > 0 && (
						<div>
							<strong>Skills:</strong>
							<div className="flex flex-wrap gap-2 mt-2">
								{skills.map((skill, i) => (
									<span
										key={i}
										className={`px-2 py-1 text-xs bg-gray-600 rounded-md ${
											isDarkMode
												? "bg-gray-600 text-white"
												: "bg-gray-200 text-black"
										}`}>
										{skill}
									</span>
								))}
							</div>
						</div>
					)}

					{liveDemo && (
						<p>
							<strong>Live Demo:</strong>{" "}
							<a
								href={liveDemo}
								target="_blank"
								rel="noreferrer"
								className="text-blue-600 underline">
								{liveDemo}
							</a>
						</p>
					)}

					{githubLink && (
						<p>
							<strong>GitHub:</strong>{" "}
							<a
								href={githubLink}
								target="_blank"
								rel="noreferrer"
								className="text-blue-600 underline">
								{githubLink}
							</a>
						</p>
					)}

					{createdAt && (
						<p
							className={`text-xs ${
								isDarkMode ? "text-gray-400" : "text-gray-400"
							}`}>
							Developed At: {new Date(createdAt).toLocaleString()}
						</p>
					)}
				</div>

				{/* Actions */}
				<div className="mt-4 flex gap-2 justify-end">
					<Button
						type="button"
						variant="outline"
						onClick={handleEdit}
						className="flex items-center gap-2">
						<Edit3 className="w-4 h-4" />
						Edit
					</Button>

					<Button
						type="button"
						variant="destructive"
						onClick={handleDelete}
						disabled={deleteProjectLoading}
						className="flex items-center gap-2 text-white">
						{deleteProjectLoading ? (
							<span className="animate-spin inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent" />
						) : (
							<Trash2 className="w-4 h-4" />
						)}
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectItem;
