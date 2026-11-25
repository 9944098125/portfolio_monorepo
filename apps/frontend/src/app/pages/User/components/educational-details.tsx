// src/components/educational-details/educational-details.tsx
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import EducationalDetailItem from "./educational-detail-item";
import EducationalDetailDialog from "./educational-detail-dialog";
import { IEducationalDetails, IUser } from "types/modules";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useTheme } from "app/components/ui/theme-provider";

type Props = {
	open: { bool: boolean; educationId?: string | undefined };
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; educationId?: string | undefined }>
	>;
	data: {
		message: string;
		data: IUser;
	};
	createEducationalDetail: (value: any) => void;
	createLoading: boolean;
	createSuccess: boolean;
	createError: boolean;
	createErrorMessage: string;
	deleteEducationalDetail: (val: any) => void;
	deleteEducationalDetailLoading: boolean;
};

export const EducationalDetails: React.FC<Props> = (props: Props) => {
	const {
		open,
		setOpen,
		data,
		createEducationalDetail,
		createLoading,
		createSuccess,
		createError,
		createErrorMessage,
		deleteEducationalDetail,
		deleteEducationalDetailLoading,
	} = props;

	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [educationId, setEducationId] = useState<string | undefined>();

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

	const deleteEducationalDetailById = () => {
		if (!educationId) {
			setShowConfirm(false);
			return;
		}
		deleteEducationalDetail({ educationId });
		setShowConfirm(false);
	};

	return (
		<React.Fragment>
			<div id="educational-details" className={`min-h-screen relative py-12 px-2 rounded-2xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
				<h2 className="text-[2.4rem] md:text-[4.1rem] font-extrabold bg-gradient-to-r from-teal-700 via-orange-300 to-violet-600 text-transparent bg-clip-text mb-6 font-dancing">
					Update Educational Details/Experiences
				</h2>

				<div className="grid grid-cols-12 gap-4">
					{((data?.data?.educationalDetails ?? []) as Array<
						IEducationalDetails | string
					>)
						.filter(
							(ed): ed is IEducationalDetails => typeof ed !== "string"
						)
						.map((eduDetail: IEducationalDetails, idx: number) => (
							<EducationalDetailItem
								key={eduDetail?._id || idx}
								name_of_education={eduDetail?.name_of_education}
								start_year={eduDetail?.start_year}
								passout_year={eduDetail?.passout_year}
								createdAt={eduDetail?.createdAt}
								idx={idx}
								educationalDetailItem={eduDetail}
								setEducationId={setEducationId}
								setOpen={setOpen}
								deleteEducationalDetailLoading={deleteEducationalDetailLoading}
								setShowConfirm={setShowConfirm}
							/>
						))}

					{/* + Add Educational Detail/Experience button */}
					<div className="col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-center p-4">
						<Dialog
							open={open.bool}
							onOpenChange={(isOpen) => {
								setOpen({ bool: isOpen, educationId: "" });
							}}>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="cursor-pointer w-[10rem] h-[10rem] rounded-full transition-colors border border-gray-200"
									onClick={() => setOpen({ bool: true, educationId: "" })}>
									<Plus className={`text-[10rem] ${isDarkMode ? "text-white" : "text-gray-800"}`} />
								</Button>
							</DialogTrigger>

							{/* Dialog content */}
							<EducationalDetailDialog
								open={open}
								setOpen={setOpen}
								create={createEducationalDetail}
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
					confirmUpdate={deleteEducationalDetailById}
					purpose="delete"
				/>
			</div>
		</React.Fragment>
	);
};
