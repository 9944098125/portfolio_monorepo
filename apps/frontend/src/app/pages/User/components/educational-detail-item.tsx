// src/components/educational-details/educational-detail-item.tsx
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
import { IEducationalDetails } from "types/modules";
import { useTheme } from "app/components/ui/theme-provider";

// Helper function to format date like "23rd April 2018"
const formatDate = (dateStr: string | undefined): string => {
	if (!dateStr) return "";
	try {
		// Handle year-only strings (backward compatibility)
		if (/^\d{4}$/.test(dateStr.trim())) {
			return dateStr; // Return year as-is if it's just a year
		}

		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return dateStr; // Return original if invalid date

		const day = date.getDate();
		const month = date.toLocaleString("en-US", { month: "long" });
		const year = date.getFullYear();

		// Get ordinal suffix (st, nd, rd, th)
		const getOrdinalSuffix = (day: number): string => {
			if (day > 3 && day < 21) return "th";
			switch (day % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		};

		return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
	} catch (error) {
		return dateStr; // Return original if parsing fails
	}
};

interface EducationalDetailItemProps {
	name_of_education?: string;
	start_year?: string;
	passout_year?: string;
	createdAt?: string;
	// additional props from parent EducationalDetails component
	idx?: number;
	educationalDetailItem?: IEducationalDetails;
	setEducationId: Dispatch<SetStateAction<string | undefined>>;
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; educationId?: string | undefined }>
	>;
	deleteEducationalDetailLoading?: boolean;
	setShowConfirm: Dispatch<SetStateAction<boolean>>;
}

const EducationalDetailItem: React.FC<EducationalDetailItemProps> = ({
	name_of_education,
	start_year,
	passout_year,
	createdAt,
	idx,
	educationalDetailItem,
	setEducationId,
	setOpen: setParentDialogOpen,
	deleteEducationalDetailLoading,
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

	// Open parent edit dialog for this educational detail/experience
	const handleEdit = () => {
		if (educationalDetailItem && educationalDetailItem._id) {
			// open parent EducationalDetailDialog in edit mode
			setParentDialogOpen({ bool: true, educationId: educationalDetailItem._id });
		}
		// close local details dialog
		setOpen(false);
	};

	// Ask parent to confirm deletion
	const handleDelete = () => {
		if (educationalDetailItem && educationalDetailItem._id) {
			setEducationId(educationalDetailItem._id);
			setShowConfirm(true);
		}
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* GRID ITEM (click to open details) */}
			<DialogTrigger asChild>
				<div className={`p-4 cursor-pointer border rounded-xl shadow-sm hover:shadow-md transition-all col-span-12 sm:col-span-6 md:col-span-4 gap-2 ${isDarkMode ? "bg-black text-white border-gray-700" : "bg-white text-black border-gray-200"}`}>
					<div className="h-36 w-full rounded-md bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
						<div className="text-center">
							<h3 className="text-lg font-semibold text-gray-800">
								{name_of_education || "Education"}
							</h3>
							<p className="text-sm text-gray-600 mt-2">
								{start_year && passout_year
									? `${formatDate(start_year)} - ${formatDate(passout_year)}`
									: start_year
									? `Started: ${formatDate(start_year)}`
									: passout_year
									? `Passed: ${formatDate(passout_year)}`
									: ""}
							</p>
						</div>
					</div>
				</div>
			</DialogTrigger>

			{/* FULL DETAILS DIALOG */}
			<DialogContent className={`p-4 max-w-xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
				<div className="flex items-center justify-between">
					<DialogTitle>{name_of_education || "Educational Detail/Experience"}</DialogTitle>
					<DialogClose className={`p-2 rounded-lg ${isDarkMode ? "text-red-400 bg-red-900" : "text-red-600 bg-red-100"}`}>
						<XIcon className="w-4 h-4" />
					</DialogClose>
				</div>

				<div className="text-sm space-y-4 mt-3">
					{name_of_education && (
						<p>
							<strong>Name of Education:</strong> {name_of_education}
						</p>
					)}

					{start_year && (
						<p>
							<strong>Start Date:</strong> {formatDate(start_year)}
						</p>
					)}

					{passout_year && (
						<p>
							<strong>Passout/End Date:</strong> {formatDate(passout_year)}
						</p>
					)}

					{start_year && passout_year && !educationalDetailItem?.present && (
						<p>
							<strong>Duration:</strong>{" "}
							{(() => {
								try {
									const start = new Date(start_year);
									const end = new Date(passout_year);
									if (isNaN(start.getTime()) || isNaN(end.getTime())) {
										return "N/A";
									}
									return `${Math.floor(
										(end.getTime() - start.getTime()) /
											(1000 * 60 * 60 * 24 * 365.25)
									)} years`;
								} catch {
									return "N/A";
								}
							})()}
						</p>
					)}

					{educationalDetailItem?.present && (
						<p>
							<strong>Status:</strong> Currently Pursuing/Working
						</p>
					)}

					{createdAt && (
						<p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
							Added At: {new Date(createdAt).toLocaleString()}
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
						disabled={deleteEducationalDetailLoading}
						className="flex items-center gap-2 text-white">
						{deleteEducationalDetailLoading ? (
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

export default EducationalDetailItem;

