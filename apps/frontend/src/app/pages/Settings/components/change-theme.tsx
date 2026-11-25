import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "app/components/ui/select";
import { Button } from "app/components/ui/button";
import { Label } from "app/components/ui/label";
import { Loader2 } from "lucide-react";
import { useSlice } from "../slice";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { toast } from "app/components/ui/use-toast";
import { useTheme } from "app/components/ui/theme-provider";

type ChangeThemeFormData = {
	theme: string;
};

const themeOptions = [
	{ value: "light", label: "Light Mode" },
	{ value: "dark", label: "Dark Mode" },
	{ value: "system", label: "System" },
];

export default function ChangeTheme() {
	const { useChangeUserThemeMutation } = useSlice();
	const user = useSelector(selectUser);
	const { setTheme, theme: currentTheme } = useTheme();
	const [changeUserTheme, { isLoading, isSuccess, isError, error }] =
		useChangeUserThemeMutation();
	const [selectedTheme, setSelectedTheme] = useState<string>("system");
	const [isDarkMode, setIsDarkMode] = useState(false);

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ChangeThemeFormData>({
		defaultValues: {
			theme: currentTheme || "system",
		},
	});

	const themeValue = watch("theme");

	// Initialize form with current theme from theme provider
	useEffect(() => {
		if (currentTheme) {
			setValue("theme", currentTheme);
			setSelectedTheme(currentTheme);
		}
	}, [currentTheme, setValue]);

	// Update dark mode state based on theme
	useEffect(() => {
		const updateDarkMode = () => {
			if (currentTheme === "dark") {
				setIsDarkMode(true);
			} else if (currentTheme === "light") {
				setIsDarkMode(false);
			} else if (currentTheme === "system") {
				setIsDarkMode(
					window.matchMedia("(prefers-color-scheme: dark)").matches,
				);
			}
		};

		updateDarkMode();

		if (currentTheme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			mediaQuery.addEventListener("change", updateDarkMode);
			return () => mediaQuery.removeEventListener("change", updateDarkMode);
		}
	}, [currentTheme]);

	const onSubmit = (data: ChangeThemeFormData) => {
		// Determine isDarkMode: true for Dark Mode or System, false for Light Mode
		// As per requirement: isDarkMode true if Dark Mode or System is selected
		const isDarkMode = data.theme === "dark" || data.theme === "system";

		changeUserTheme({
			userId: user?._id,
			isDarkMode: isDarkMode,
		});

		setSelectedTheme(data.theme);
		// Store theme in localStorage with key asp-portfolios-theme
		localStorage.setItem("asp-portfolios-theme", data.theme);
	};

	useEffect(() => {
		if (isSuccess) {
			toast({
				title: "Success",
				description: "Theme changed successfully",
				variant: "success",
			});
			// Apply the theme immediately after successful submission
			const themeToApply = selectedTheme as "dark" | "light" | "system";
			setTheme(themeToApply);
			// Store theme in localStorage with key asp-portfolios-theme
			localStorage.setItem("asp-portfolios-theme", themeToApply);
		}
	}, [isSuccess, setTheme, selectedTheme]);

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				description:
					(error as string) || "Failed to change theme. Please try again.",
				variant: "destructive",
			});
		}
	}, [isError, error]);

	return (
		<div
			className={`w-full p-6 ${
				isDarkMode ? "bg-gray-100 text-gray-800" : "bg-white text-gray-800"
			}`}>
			<h2
				className={`text-2xl font-semibold mb-6 ${
					isDarkMode ? "text-gray-800" : "text-gray-800"
				}`}>
				Change Theme
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<div>
					<Label
						htmlFor="theme"
						className={isDarkMode ? "text-gray-800" : "text-gray-800"}>
						Theme
					</Label>
					<Controller
						name="theme"
						control={control}
						rules={{ required: "Please select a theme" }}
						render={({ field }) => (
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setSelectedTheme(value);
								}}
								defaultValue={field.value}
								value={field.value}>
								<SelectTrigger
									className={`mt-1 ${
										isDarkMode
											? "text-gray-800 bg-gray-100 border-gray-700"
											: "text-gray-800 bg-white border-gray-300"
									}`}>
									<SelectValue placeholder="Select a theme" />
								</SelectTrigger>
								<SelectContent
									className={
										isDarkMode
											? "bg-gray-100 text-gray-800"
											: "bg-white text-gray-800"
									}>
									{themeOptions.map((option) => (
										<SelectItem
											key={option.value}
											value={option.value}
											className={
												isDarkMode
													? "text-gray-800 hover:bg-gray-100"
													: "text-gray-800 hover:bg-gray-100"
											}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					{errors.theme && (
						<p
							className={`${
								isDarkMode ? "text-red-400" : "text-red-500"
							} text-sm mt-1`}>
							{errors.theme.message}
						</p>
					)}
				</div>

				<Button
					variant="default"
					type="submit"
					className={`w-full ${
						isDarkMode
							? "text-black bg-white hover:bg-gray-100"
							: "text-gray-800 bg-gray-900 hover:bg-gray-800"
					}`}
					disabled={isLoading}>
					{isLoading ? (
						<span className="flex items-center justify-center gap-2">
							<Loader2 className="h-4 w-4 animate-spin" />
							Saving theme...
						</span>
					) : (
						"Save Theme"
					)}
				</Button>
			</form>
		</div>
	);
}
