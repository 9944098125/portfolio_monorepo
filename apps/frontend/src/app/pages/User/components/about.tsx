"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "app/components/ui/textarea";
import { Edit3, FileText } from "lucide-react";
import { Button } from "app/components/ui/button";
import { IUser } from "types/modules";
import { useParams } from "react-router-dom";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useTheme } from "app/components/ui/theme-provider";

type Props = {
	data: {
		message: string;
		data: Partial<IUser>;
	};
	isLoading: boolean;
	update: (values: Partial<IUser>) => void;
};

export const UpdateAbout = (props: Props) => {
	const { data, update, isLoading } = props;
	const userFromParams = useParams();
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [isEditable, setIsEditable] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [formData, setFormData] = useState<any>(null);

	const user = data?.data;

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

	// Prefill about data when available
	useEffect(() => {
		if (user) {
			reset({
				about: user.about || "",
			});
		}
	}, [user, reset]);

	const onSubmit = (formData: any) => {
		// open confirmation dialog before update
		setShowConfirm(true);
		setFormData(formData);
	};

	const confirmUpdate = () => {
		const body = {
			userId: userFromParams?.userId || "",
			about: formData?.about || "",
		};
		update(body);
		setShowConfirm(false);
		setIsEditable(false);
	};

	return (
		<div id = "about" className={`rounded-2xl backdrop-blur-2xl flex flex-col items-center py-12 px-4 relative ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
			<div className="w-full">
				<h2 className="text-[2.4rem] md:text-[4.1rem] font-extrabold bg-gradient-to-r from-teal-700 via-orange-300 to-violet-600 text-transparent bg-clip-text font-dancing">
					Update About
				</h2>
				{/* Edit Button */}
				<div className="absolute top-6 right-8">
					<Button
						variant={isEditable ? "secondary" : "default"}
						onClick={() => setIsEditable(!isEditable)}
						className="flex items-center text-white gap-2">
						<Edit3 size={18} />
						{isEditable ? "Cancel Edit" : "Edit About"}
					</Button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="mt-8">
					{/* About Textarea */}
					<div>
						<label className="block mb-2 text-sm font-semibold text-gray-300">
							About
						</label>
						<div className="flex items-start gap-2">
							<FileText className="text-gray-400 mt-2" size={20} />
							<Textarea
								{...register("about", {
									required: "About section is required",
									minLength: {
										value: 10,
										message: "About must be at least 10 characters",
									},
								})}
								disabled={!isEditable}
								placeholder="Tell us about yourself..."
								className="min-h-[200px] resize-y"
								rows={8}
							/>
						</div>
						{errors.about && (
							<p className="text-red-400 text-sm mt-1">
								{errors.about.message as string}
							</p>
						)}
					</div>

					{/* Save Button */}
					{isEditable && (
						<div className="mt-6">
							<Button
								variant="default"
								type="submit"
								className="w-full py-6 text-white text-lg">
								{isLoading ? "Saving About..." : "Save About"}
							</Button>
						</div>
					)}
				</form>
			</div>
			<ConfirmationDialog
				showConfirm={showConfirm}
				setShowConfirm={setShowConfirm}
				confirmUpdate={confirmUpdate}
			/>
		</div>
	);
};
