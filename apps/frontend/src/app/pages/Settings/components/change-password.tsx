import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { Label } from "app/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useSlice } from "../slice";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { toast } from "app/components/ui/use-toast";

type ChangePasswordFormData = {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
};

export default function ChangePassword() {
	const { useChangePasswordMutation } = useSlice();
	const user = useSelector(selectUser);
	const [changePassword, { isLoading, isSuccess, isError, error }] =
		useChangePasswordMutation();

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm<ChangePasswordFormData>({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const newPassword = watch("newPassword");
	const oldPassword = watch("oldPassword");

	const onSubmit = (data: ChangePasswordFormData) => {
		changePassword({
			userId: user?._id,
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			toast({
				title: "Success",
				description: "Password changed successfully",
				variant: "success",
			});
			reset();
		}
	}, [isSuccess, reset]);

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				description: (error as string) || "Failed to change password. Please try again.",
				variant: "destructive",
			});
		}
	}, [isError, error]);

	return (
		<div className="w-full p-6">
			<h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
				Change Password
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				{/* Old Password */}
				<div>
					<Label htmlFor="oldPassword">Old Password</Label>
					<div className="relative mt-1">
						<Input
							id="oldPassword"
							type={showOldPassword ? "text" : "password"}
							placeholder="Enter your old password"
							className="pr-10"
							{...register("oldPassword", {
								required: "Old password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
							})}
						/>
						<button
							type="button"
							onClick={() => setShowOldPassword(!showOldPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							{showOldPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</button>
					</div>
					{errors.oldPassword && (
						<p className="text-red-500 text-sm mt-1">
							{errors.oldPassword.message}
						</p>
					)}
				</div>

				{/* New Password */}
				<div>
					<Label htmlFor="newPassword">New Password</Label>
					<div className="relative mt-1">
						<Input
							id="newPassword"
							type={showNewPassword ? "text" : "password"}
							placeholder="Enter your new password"
							className="pr-10"
							{...register("newPassword", {
								required: "New password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
								validate: (value) => {
									if (value === oldPassword) {
										return "New password must be different from old password";
									}
									return true;
								},
							})}
						/>
						<button
							type="button"
							onClick={() => setShowNewPassword(!showNewPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							{showNewPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</button>
					</div>
					{errors.newPassword && (
						<p className="text-red-500 text-sm mt-1">
							{errors.newPassword.message}
						</p>
					)}
				</div>

				{/* Confirm New Password */}
				<div>
					<Label htmlFor="confirmNewPassword">Confirm New Password</Label>
					<div className="relative mt-1">
						<Input
							id="confirmNewPassword"
							type={showConfirmPassword ? "text" : "password"}
							placeholder="Confirm your new password"
							className="pr-10"
							{...register("confirmNewPassword", {
								required: "Please confirm your new password",
								validate: (value) => {
									if (value !== newPassword) {
										return "Passwords do not match";
									}
									return true;
								},
							})}
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							{showConfirmPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</button>
					</div>
					{errors.confirmNewPassword && (
						<p className="text-red-500 text-sm mt-1">
							{errors.confirmNewPassword.message}
						</p>
					)}
				</div>

				<Button
					variant="default"
					type="submit"
					className="w-full text-white"
					disabled={isLoading}
				>
					{isLoading ? (
						<span className="flex items-center justify-center gap-2">
							<Loader2 className="h-4 w-4 animate-spin" />
							Changing password...
						</span>
					) : (
						"Change Password"
					)}
				</Button>
			</form>
		</div>
	);
}
