// src/components/EducationalDetailDialog.tsx
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { Input } from "app/components/ui/input";
import { Checkbox } from "app/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import { Icons } from "app/components/ui/icons";
import { toast } from "app/components/ui/use-toast";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { useSlice } from "../slice";
import DatePicker from "react-datepicker";
import { cn } from "utils/shadcn";
import { XIcon } from "lucide-react";
import { useTheme } from "app/components/ui/theme-provider";

interface EducationalDetailDialogProps {
	open: { bool: boolean; educationId?: string | undefined };
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; educationId?: string | undefined }>
	>;
	create: (body: any) => void;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	error: string | null;
}

type FormValues = {
	name_of_education: string;
	start_year: string;
	passout_year: string;
	present: boolean;
	is_education: boolean;
};

const EducationalDetailDialog: React.FC<EducationalDetailDialogProps> = ({
	open,
	setOpen,
	create,
	isLoading,
	isSuccess,
	isError,
	error,
}) => {
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const { register, handleSubmit, reset, setValue, control, watch } = useForm<FormValues>({
		defaultValues: {
			name_of_education: "",
			start_year: "",
			passout_year: "",
			present: false,
			is_education: true,
		},
	});

	const presentValue = watch("present");

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

	const { useLazyGetEducationalDetailQuery } = useSlice();

	const [
		getEducationalDetail,
		{
			data: getEducationalDetailData,
			isError: getEducationalDetailError,
			error: getEducationalDetailErrorMessage,
		},
	] = useLazyGetEducationalDetailQuery();

	const user = useSelector(selectUser);

	const onSubmit = (data: FormValues) => {
		const body = {
			name_of_education: data.name_of_education,
			start_year: data.start_year,
			passout_year: data.passout_year,
			present: data.present || false,
			is_education: data.is_education !== undefined ? data.is_education : true,
			userId: user?._id,
			...(open?.educationId && { educationId: open.educationId }),
		};

		create(body);
		reset();
		setOpen({ bool: false, educationId: undefined });
	};

	// Helper function to convert date string to Date object
	const dateStringToDate = (dateStr: string | undefined): Date | null => {
		if (!dateStr) return null;
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return null;
		return date;
	};

	// Helper function to convert Date object to ISO string
	const dateToISOString = (date: Date | null): string => {
		if (!date) return "";
		return date.toISOString();
	};

	useEffect(() => {
		if (open?.bool && open?.educationId) {
			getEducationalDetail({ edId: open?.educationId });
		} else if (open?.bool && !open?.educationId) {
			// Reset form when opening for create
			reset();
		}
	}, [open?.bool, open?.educationId]);

	useEffect(() => {
		// Only populate form when dialog is open for edit and we have data
		if (open?.bool && open?.educationId && getEducationalDetailData?.data) {
			const {
				name_of_education = "",
				start_year = "",
				passout_year = "",
				present = false,
				is_education = true,
			} = getEducationalDetailData.data;

			// set form values
			setValue("name_of_education", name_of_education);
			setValue("start_year", start_year);
			setValue("passout_year", passout_year);
			setValue("present", present);
			setValue("is_education", is_education);
		}
	}, [getEducationalDetailData, setValue, open?.bool, open?.educationId]);

	useEffect(() => {
		if (isSuccess) {
			toast({
				title: open?.educationId ? "Educational detail/experience updated" : "Educational detail/experience created",
				description: open?.educationId
					? "Your educational detail/experience was updated successfully."
					: "Your educational detail/experience was created successfully.",
				variant: "success",
			});
		}
	}, [isSuccess, open?.educationId]);

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				description: error || "Failed to save educational detail/experience.",
				variant: "destructive",
			});
		}
	}, [isError, error]);

	return (
		<DialogContent 
			onInteractOutside={(e) => e.preventDefault()}
			className={`sm:max-w-[640px] p-6 rounded-2xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
			<div className="flex items-center justify-between">
				<div>
					<DialogTitle>
						{open?.educationId ? "Edit Educational Detail/Experience" : "Add Educational Detail/Experience"}
					</DialogTitle>
					<DialogDescription>
						{open?.educationId
							? "Update your educational detail/experience information."
							: "Add a new educational detail/experience with name, start year, and passout year."}
					</DialogDescription>
				</div>
				<DialogClose asChild>
					<XIcon className={`cursor-pointer w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-500"}`} />
				</DialogClose>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
				{/* Name of Education */}
				<div>
					<label className={`block mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Name of Education/Experience <span className="text-red-500">*</span>
					</label>
					<Input
						{...register("name_of_education", { required: true })}
						placeholder="e.g., Bachelor of Science in Computer Science"
					/>
				</div>

				{/* Start Date */}
				<div>
					<label className={`block mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Start Date <span className="text-red-500">*</span>
					</label>
					<Controller
						control={control}
						name="start_year"
						rules={{ required: true }}
						render={({ field }) => (
							<div className="relative">
								<DatePicker
									selected={dateStringToDate(field.value)}
									onChange={(date: Date | null) => {
										const dateStr = dateToISOString(date);
										field.onChange(dateStr);
									}}
									dateFormat="dd MMMM yyyy"
									placeholderText="Select start date"
									wrapperClassName="w-full"
									className={cn(
										"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									)}
									showYearDropdown
									showMonthDropdown
									dropdownMode="select"
									yearDropdownItemNumber={15}
									scrollableYearDropdown
									maxDate={new Date()}
								/>
							</div>
						)}
					/>
				</div>

				{/* Passout/End Date */}
				<div>
					<label className={`block mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Passout/End Date <span className="text-red-500">*</span>
					</label>
					<Controller
						control={control}
						name="passout_year"
						rules={{ required: !presentValue }}
						render={({ field }) => (
							<div className="relative">
								<DatePicker
									selected={dateStringToDate(field.value)}
									onChange={(date: Date | null) => {
										const dateStr = dateToISOString(date);
										field.onChange(dateStr);
									}}
									dateFormat="dd MMMM yyyy"
									placeholderText="Select passout/end date"
									wrapperClassName="w-full"
									className={cn(
										"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									)}
									showYearDropdown
									showMonthDropdown
									dropdownMode="select"
									yearDropdownItemNumber={15}
									scrollableYearDropdown
									maxDate={new Date()}
									disabled={presentValue}
								/>
							</div>
						)}
					/>
				</div>

				{/* Is Education Checkbox */}
				<div className="flex items-center space-x-2">
					<Controller
						control={control}
						name="is_education"
						render={({ field }) => (
							<Checkbox
								id="is_education"
								checked={field.value}
								onCheckedChange={(checked) => {
									field.onChange(checked);
								}}
							/>
						)}
					/>
					<label
						htmlFor="is_education"
						className={`text-sm font-medium cursor-pointer ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						This is an Education/Qualification
					</label>
				</div>

				{/* Present Checkbox */}
				<div className="flex items-center space-x-2">
					<Controller
						control={control}
						name="present"
						render={({ field }) => (
							<Checkbox
								id="present"
								checked={field.value}
								onCheckedChange={(checked) => {
									field.onChange(checked);
									if (checked) {
										setValue("passout_year", "");
									}
								}}
							/>
						)}
					/>
					<label
						htmlFor="present"
						className={`text-sm font-medium cursor-pointer ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Presently Pursuing/working
					</label>
				</div>

				<DialogFooter className="mt-6 flex justify-end gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							reset();
							setOpen({ bool: false, educationId: undefined });
						}}>
						Cancel
					</Button>

					<Button
						type="submit"
						variant="default"
						className="text-white"
						disabled={isLoading}>
						{isLoading && <Icons.Spinner className="animate-spin mr-2" />}
						{open?.educationId ? "Update" : "Add"} Educational Detail/Experience
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
};

export default EducationalDetailDialog;

