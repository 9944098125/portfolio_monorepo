import { Button } from "app/components/ui/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSlice } from "../slice";
import { toast } from "app/components/ui/use-toast";
import { useGlobalSlice } from "app/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "app/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

type LoginFormData = {
	emailOrPhone: string;
	password: string;
	rememberMe: boolean;
};

export const LoginForm: React.FC = () => {
	const { useLoginMutation } = useSlice();
	const { actions } = useGlobalSlice();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { isLoading, isSuccess, data, isError, error }] =
		useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<LoginFormData>({
		defaultValues: {
			emailOrPhone: "",
			password: "",
			rememberMe: false,
		},
	});

	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = (formData: LoginFormData) => {
		const body = {
			emailOrPhone: formData.emailOrPhone,
			password: formData.password,
		};
		login(body);
	};

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				description: (error as string) || "Something went wrong",
				variant: "destructive",
			});
		}
	}, [isError, error]);

	useEffect(() => {
		if (isSuccess || data) {
			dispatch(
				actions.setUserWithStorage({
					user: data?.user,
					token: data?.token,
					rememberMe: watch("rememberMe"), // ✅ use rememberMe state
				})
			);
			navigate(`/${data?.user?._id}`);
		}
	}, [isSuccess, data]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-5">
			<h2 className="text-2xl font-semibold text-center text-teal-600">
				Login
			</h2>

			{/* Email or Phone */}
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Email or Phone
				</label>
				<Input
					type="text"
					{...register("emailOrPhone", {
						required: "Email or phone is required",
						validate: (value) =>
							/\S+@\S+\.\S+/.test(value) || /^[0-9]{10}$/.test(value)
								? true
								: "Enter a valid email or 10-digit phone number",
					})}
					placeholder="example@mail.com or 9876543210"
					className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
				/>
				{errors.emailOrPhone && (
					<p className="text-red-500 text-sm mt-1">
						{errors.emailOrPhone.message}
					</p>
				)}
			</div>

			{/* Password */}
			<div className="relative">
				<label className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<Input
					type={showPassword ? "text" : "password"}
					{...register("password", {
						required: "Password is required",
						validate: {
							minLength: (value) =>
								value.length >= 8 ||
								"Password must be at least 8 characters long",
							hasUpperCase: (value) =>
								/[A-Z]/.test(value) ||
								"Password must include at least one uppercase letter",
							hasLowerCase: (value) =>
								/[a-z]/.test(value) ||
								"Password must include at least one lowercase letter",
							hasNumber: (value) =>
								/\d/.test(value) || "Password must include at least one number",
							hasSpecialChar: (value) =>
								/[!@#$%^&*(),.?\":{}|<>]/.test(value) ||
								"Password must include at least one special character",
						},
					})}
					placeholder="••••••••"
					className="w-full mt-1 p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
				/>

				{/* 👁️ Show/Hide Password Toggle */}
				<button
					type="button"
					onClick={() => setShowPassword((prev) => !prev)}
					className="absolute right-3 top-9 text-gray-500 hover:text-teal-600 focus:outline-none">
					{showPassword ? (
						<EyeOff className="w-5 h-5" />
					) : (
						<Eye className="w-5 h-5" />
					)}
				</button>

				{errors.password && (
					<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
				)}
			</div>

			{/* Remember Me */}
			<div className="flex items-center justify-between">
				<label className="flex items-center space-x-2 text-sm text-gray-700">
					<input
						type="checkbox"
						{...register("rememberMe")}
						className="w-4 h-4 accent-teal-600 rounded"
					/>
					<span>Remember me</span>
				</label>
				<a
					href="#"
					className="text-sm text-teal-600 hover:text-teal-700 font-medium">
					Forgot password?
				</a>
			</div>

			{/* Submit Button */}
			<Button
				variant="default"
				type="submit"
				className="w-full text-white py-2.5 rounded-lg transition-colors duration-200">
				{isLoading ? "Logging In..." : "Log In"}
			</Button>
		</form>
	);
};
