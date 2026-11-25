// src/components/projects/projects.tsx
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import ProjectItem from "./project-item";
import ProjectDialog from "./project-dialog";
import { IProject, IUser } from "types/modules";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useTheme } from "app/components/ui/theme-provider";

type Props = {
	open: { bool: boolean; projectId?: string | undefined };
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; projectId?: string | undefined }>
	>;
	data: {
		message: string;
		data: IUser;
	};
	createProject: (value: any) => void;
	createLoading: boolean;
	createSuccess: boolean;
	createError: boolean;
	createErrorMessage: string;
	deleteProject: (val: any) => void;
	deleteProjectLoading: boolean;
};

export const Projects: React.FC<Props> = (props: Props) => {
	const {
		open,
		setOpen,
		data,
		createProject,
		createLoading,
		createSuccess,
		createError,
		createErrorMessage,
		deleteProject,
		deleteProjectLoading,
	} = props;

	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [projectId, setProjectId] = useState<string | undefined>();

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

	const deleteProjectById = () => {
		if (!projectId) {
			setShowConfirm(false);
			return;
		}
		// match your API shape — pass object or id depending on backend
		deleteProject({ projectId });
		setShowConfirm(false);
	};

	return (
		<React.Fragment>
			<div id= "projects" className={`min-h-screen relative py-12 px-2 rounded-2xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
				<h2 className="text-[2.4rem] md:text-[4.1rem] font-extrabold bg-gradient-to-r from-teal-700 via-orange-300 to-violet-600 text-transparent bg-clip-text mb-6 font-dancing">
					Update Projects
				</h2>

				<div className="grid grid-cols-12 gap-4">
					{((data?.data?.projects ?? []) as Array<IProject | string>)
						.filter((p): p is IProject => typeof p !== "string")
						.map((proj: IProject, idx: number) => (
							<ProjectItem
								key={proj?._id || idx}
								thumbnail={proj?.thumbnail}
								name={proj?.name}
								skills={proj?.skills}
								description={proj?.description}
								liveDemo={proj?.liveDemo}
								githubLink={proj?.githubLink}
								idx={idx}
								projectItem={proj}
								setProjectId={setProjectId}
								setOpen={setOpen}
								deleteProjectLoading={deleteProjectLoading}
								setShowConfirm={setShowConfirm}
							/>
						))}

					{/* + Add Project button */}
					<div className="col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-center p-4">
						<Dialog
							open={open.bool}
							onOpenChange={(isOpen) => {
								setOpen({ bool: isOpen, projectId: "" });
							}}>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="cursor-pointer w-[10rem] h-[10rem] rounded-full transition-colors border border-gray-200"
									onClick={() => setOpen({ bool: true, projectId: "" })}>
									<Plus className={`text-[10rem] ${isDarkMode ? "text-white" : "text-gray-800"}`} />
								</Button>
							</DialogTrigger>

							{/* Dialog content */}
							<ProjectDialog
								open={open}
								setOpen={setOpen}
								create={createProject}
								isSuccess={createSuccess}
								isLoading={createLoading}
								isError={createError}
								error={createErrorMessage}
							/>
						</Dialog>
					</div>
				</div>

				<ConfirmationDialog
					showConfirm={showConfirm}
					setShowConfirm={setShowConfirm}
					confirmUpdate={deleteProjectById}
					purpose="delete"
				/>
			</div>
		</React.Fragment>
	);
};

export default Projects;
