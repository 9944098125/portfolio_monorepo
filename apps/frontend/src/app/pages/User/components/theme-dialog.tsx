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
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { useSlice } from "../slice";
import { toast } from "app/components/ui/use-toast";
import { Icons } from "app/components/ui/icons";
import { XIcon } from "lucide-react";
import { useTheme } from "app/components/ui/theme-provider";

interface ThemeDialogProps {
	open: { bool: boolean; themeId?: string | undefined };
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; themeId?: string | undefined }>
	>;
	create: (body: any) => void;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	error: string | null;
}

type FormValues = {
	name: string;
	primaryColor: string;
	secondaryColor: string;
	boldBg: string;
	background: string;
};

const ThemeDialog: React.FC<ThemeDialogProps> = ({
	open,
	setOpen,
	create,
	isLoading,
	isSuccess,
	isError,
	error,
}) => {
	const user = useSelector(selectUser);
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
		defaultValues: {
			name: "",
			primaryColor: "#000000",
			secondaryColor: "#000000",
			boldBg: "#000000",
			background: "#ffffff",
		},
	});

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

	const primaryColor = watch("primaryColor");
	const secondaryColor = watch("secondaryColor");
	const boldBg = watch("boldBg");
	const background = watch("background");
	const { useLazyGetThemeQuery } = useSlice();

	const [
		getTheme,
		{
			data: getThemeData,
			isLoading: getThemeLoading,
			isError: getThemeError,
			error: getThemeErrorMessage,
		},
	] = useLazyGetThemeQuery();

	const onSubmit = (data: FormValues) => {
		const body: any = {
			name: data.name,
			primaryColor: data.primaryColor,
			secondaryColor: data.secondaryColor,
			boldBg: data.boldBg,
			background: data.background,
		};
		if (open?.themeId) {
			body.themeId = open.themeId;
		} else {
			body.userId = user?._id;
		}
		create(body);
		reset();
		setOpen({ bool: false, themeId: "" });
	};

	useEffect(() => {
		if (open?.bool && open?.themeId) {
			getTheme({ themeId: open?.themeId });
		} else if (open?.bool && !open?.themeId) {
			reset();
		}
	}, [open?.bool, open?.themeId]);

	useEffect(() => {
		if (open?.bool && open?.themeId && getThemeData?.data) {
			const theme = getThemeData.data;
			setValue("name", theme.name || "");
			setValue("primaryColor", theme.primaryColor || "#000000");
			setValue("secondaryColor", theme.secondaryColor || "#000000");
			setValue("boldBg", theme.boldBg || "#000000");
			setValue("background", theme.background || "#ffffff");
		}
	}, [getThemeData, setValue, open?.bool, open?.themeId]);

	useEffect(() => {
		if (isSuccess) {
			toast({
				title: "Success",
				description: open?.themeId
					? "Updated theme successfully"
					: "Created a theme successfully",
				variant: "success",
			});
		}
	}, [isSuccess, open?.themeId]);

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				description: error as string,
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
						{open?.themeId ? "Edit Theme" : "Create Theme"}
					</DialogTitle>
					<DialogDescription>
						{open?.themeId
							? "Update your theme colors."
							: "Create a new theme with custom colors."}
					</DialogDescription>
				</div>
				<DialogClose asChild>
					<XIcon className={`cursor-pointer w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-500"}`} />
				</DialogClose>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
				{/* Theme Name */}
				<div>
					<label className={`block mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Theme Name <span className="text-red-500">*</span>
					</label>
					<Input
						{...register("name", { required: true })}
						placeholder="e.g., Dark Theme, Light Theme"
						key={`name-${open?.themeId || "new"}`}
					/>
				</div>

				{/* Primary Color */}
				<div>
					<label className={`block mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Primary Color <span className="text-red-500">*</span>
					</label>
					<div className="flex items-center gap-3">
						<input
							type="color"
							value={primaryColor || "#000000"}
							onChange={(e) => setValue("primaryColor", e.target.value)}
							className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
							key={`primaryColor-${open?.themeId || "new"}`}
						/>
						<Input
							{...register("primaryColor", { required: true })}
							placeholder="#000000"
							className="flex-1"
							key={`primaryColor-input-${open?.themeId || "new"}`}
						/>
					</div>
				</div>

				{/* Secondary Color */}
				<div>
					<label className={`block mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Secondary Color <span className="text-red-500">*</span>
					</label>
					<div className="flex items-center gap-3">
						<input
							type="color"
							value={secondaryColor || "#000000"}
							onChange={(e) => setValue("secondaryColor", e.target.value)}
							className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
							key={`secondaryColor-${open?.themeId || "new"}`}
						/>
						<Input
							{...register("secondaryColor", { required: true })}
							placeholder="#000000"
							className="flex-1"
							key={`secondaryColor-input-${open?.themeId || "new"}`}
						/>
					</div>
				</div>

				{/* Bold Background */}
				<div>
					<label className={`block mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Bold Background <span className="text-red-500">*</span>
					</label>
					<div className="flex items-center gap-3">
						<input
							type="color"
							value={boldBg || "#000000"}
							onChange={(e) => setValue("boldBg", e.target.value)}
							className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
							key={`boldBg-${open?.themeId || "new"}`}
						/>
						<Input
							{...register("boldBg", { required: true })}
							placeholder="#000000"
							className="flex-1"
							key={`boldBg-input-${open?.themeId || "new"}`}
						/>
					</div>
				</div>

				{/* Background */}
				<div>
					<label className={`block mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
						Background <span className="text-red-500">*</span>
					</label>
					<div className="flex items-center gap-3">
						<input
							type="color"
							value={background || "#ffffff"}
							onChange={(e) => setValue("background", e.target.value)}
							className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
							key={`background-${open?.themeId || "new"}`}
						/>
						<Input
							{...register("background", { required: true })}
							placeholder="#ffffff"
							className="flex-1"
							key={`background-input-${open?.themeId || "new"}`}
						/>
					</div>
				</div>

				{/* Footer Buttons */}
				<DialogFooter className="mt-6 flex justify-end gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							reset();
							setOpen({ bool: false, themeId: "" });
						}}>
						Cancel
					</Button>
					<Button
						variant="default"
						className="text-white"
						type="submit"
						disabled={isLoading || getThemeLoading}>
						{(isLoading || getThemeLoading) && (
							<Icons.Spinner className="animate-spin text-teal-600 mr-2" />
						)}
						{open?.themeId ? "Update Theme" : "Create Theme"}
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
};

export default ThemeDialog;

