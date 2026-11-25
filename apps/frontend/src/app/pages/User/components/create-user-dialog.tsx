import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "app/components/ui/dialog";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { XIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSlice } from "../slice";
import { toast } from "app/components/ui/use-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTheme } from "app/components/ui/theme-provider";

type Props = {
	open: boolean;
	setOpen: (val: boolean) => void;
};

type FormValues = {
	name: string;
	email: string;
	password: string;
	countryCode: string;
	phone: string;
	city: string;
};

export const CreateUserDialog = (props: Props) => {
	const { open, setOpen } = props;
	const { useRegisterMutation } = useSlice();
	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);

	const [createUser, { isLoading, isSuccess, isError, error }] =
		useRegisterMutation();

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

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		control,
		getValues,
	} = useForm<FormValues>();

	const onSubmit = (data: FormValues) => {
		createUser(data);
	};

	useEffect(() => {
		if (isSuccess) {
			reset();
			setOpen(false);
			toast({
				title: "Success",
				description: "Created a User Successfully !",
				variant: "success",
			});
		}
	}, [isSuccess]);

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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				onInteractOutside={(e) => e.preventDefault()}
				className={`md:max-w-lg w-full rounded-2xl p-6 font-poppins ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
				<div className="flex items-center justify-between mb-4">
					<DialogTitle>
						<h3 className="text-teal-600 font-semibold text-2xl">
							Create User
						</h3>
					</DialogTitle>
					<DialogClose asChild>
						<XIcon className={`cursor-pointer ${isDarkMode ? "text-white" : "text-gray-500"}`} />
					</DialogClose>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Name */}
					<div>
						<label className={`block font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>Name</label>
						<Input
							type="text"
							placeholder="Enter full name"
							{...register("name")}
						/>
					</div>

					{/* Email */}
					<div>
						<label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
							Email
						</label>
						<Input
							type="text"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Enter a valid email address",
								},
							})}
							placeholder="you@example.com"
							className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password  */}
					<div>
						<label className={`block font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>Password</label>
						<Input
							type="password"
							placeholder="Enter password"
							{...register("password", {
								required: "Password is required",
								pattern: {
									value:
										/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message:
										"Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character",
								},
							})}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Phone */}
					<div>
						<label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
							Phone
						</label>

						<Controller
							name="phone"
							control={control}
							rules={{
								required: "Phone number is required",
								validate: (value) =>
									value.replace(/\D/g, "").length >= 10 ||
									"Enter a valid phone number",
							}}
							render={({ field }) => (
								<div>
									<PhoneInput
										country={"in"}
										enableSearch={true}
										// 👇 Keep full value (country code + number)
										value={
											field.value
												? `${getValues("countryCode")?.replace("+", "") || ""}${
														field.value
												  }`
												: ""
										}
										onChange={(value, countryData: any) => {
											const dialCode = `+${countryData.dialCode}`;

											// full value from component includes dialCode, e.g. "919876543210"
											const phoneNumber = value.slice(
												countryData.dialCode.length
											);

											// ✅ Update both values in form
											setValue("countryCode", dialCode);
											field.onChange(phoneNumber);
										}}
										inputClass={`!w-full !h-[3rem] !text-base !rounded-lg !border focus:!border-teal-500 focus:!ring-2 focus:!ring-teal-400 ${isDarkMode ? "!border-gray-600 !bg-gray-800 !text-white" : "!border-gray-300 !bg-white !text-black"}`}
										buttonClass={`${isDarkMode ? "!border-gray-600 !text-white" : "!border-gray-300 !text-black"}`}
										dropdownClass={`!rounded-lg !shadow-lg ${isDarkMode ? "!bg-gray-800 !text-white" : "!bg-white !text-black"}`}
									/>

									{errors.phone && (
										<p className="text-red-500 text-sm mt-1">
											{errors.phone.message}
										</p>
									)}
								</div>
							)}
						/>
					</div>

					{/* City */}
					<div>
						<label className={`block font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>City</label>
						<Input type="text" placeholder="Enter city" {...register("city")} />
					</div>

					{/* Submit */}
					<div className="pt-2 flex justify-end">
						<Button
							type="submit"
							className="bg-teal-600 hover:bg-teal-700 text-white">
							Create User
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
