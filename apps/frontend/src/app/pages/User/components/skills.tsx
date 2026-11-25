import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import SkillItem from "./skill-item";
import SkillDialog from "./skill-dialog";
import { ISkill, IUser } from "types/modules";
import { Plus } from "lucide-react"; // or any icon you prefer
import { Dialog, DialogTrigger } from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useTheme } from "app/components/ui/theme-provider";

type Props = {
	open: { bool: boolean; skillId: string | undefined };
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; skillId: string | undefined }>
	>;
	data: {
		message: string;
		data: IUser;
	};
	createSkill: (value: any) => void;
	createLoading: boolean;
	createSuccess: boolean;
	createError: boolean;
	createErrorMessage: string;
	deleteSkill: (val: { skillId: string }) => void;
	deleteSkillLoading: boolean;
};

export const Skills = (props: Props) => {
	const {
		open,
		setOpen,
		data,
		createSkill,
		createLoading,
		createSuccess,
		createError,
		createErrorMessage,
		deleteSkill,
		deleteSkillLoading,
	} = props;

	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [skillId, setSkillId] = useState<string | undefined>();

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

	const deleteSkillById = () => {
		if (!skillId) {
			setShowConfirm(false);
			return;
		}
		deleteSkill({ skillId: skillId });
		setShowConfirm(false);
	};

	return (
		<React.Fragment>
			<div id ="skills" className={`min-h-screen relative py-12 px-2 rounded-2xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
				<h2 className="text-[2.4rem] md:text-[4.1rem] font-extrabold bg-gradient-to-r from-teal-700 via-orange-300 to-violet-600 text-transparent bg-clip-text mb-6 font-dancing">
					Update Skills
				</h2>

				{/* Grid for skills */}
				<div className="flex flex-wrap justify-center items-center">
					{data?.data?.skills?.map((i: any, idx: number) => (
						<SkillItem
							key={i?._id}
							name={i?.name}
							level={i?.level}
							idx={idx}
							skillItem={i}
							setSkillId={setSkillId}
							setOpen={setOpen}
							deleteSkillLoading={deleteSkillLoading}
							setShowConfirm={setShowConfirm}
						/>
					))}

					{/* + Add Skill button */}
					<div className="col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-center p-4">
						<Dialog
							open={open.bool}
							onOpenChange={(open) => {
								setOpen({ bool: open, skillId: "" });
							}}>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="cursor-pointer w-[10rem] h-[10rem] rounded-full transition-colors border border-gray-200"
									onClick={() => setOpen({ bool: true, skillId: "" })}>
									<Plus className={`text-[10rem] ${isDarkMode ? "text-white" : "text-gray-800"}`} />
								</Button>
							</DialogTrigger>

							{/* Dialog content */}
							<SkillDialog
								open={open}
								setOpen={setOpen}
								create={createSkill}
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
					confirmUpdate={deleteSkillById}
					purpose="delete"
				/>
			</div>
		</React.Fragment>
	);
};
