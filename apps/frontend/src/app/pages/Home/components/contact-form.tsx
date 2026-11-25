import { Button } from "app/components/ui/button";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSlice } from "../slice";
import { toast } from "app/components/ui/use-toast";
import { Form } from "app/components/ui/form";
import { Textarea } from "app/components/ui/textarea";

type ContactFormInputs = {
	name: string;
	email: string;
	phone: string;
	countryCode: string;
	profession: string;
	message: string;
};

const ContactSection: React.FC = () => {
	const { useContactAdminMutation } = useSlice();

	const [contactAdmin, { isLoading, isSuccess, isError, error }] =
		useContactAdminMutation();
	const form = useForm();
	const {
		register,
		control,
		setValue,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<ContactFormInputs>();

	const onSubmit = (data: ContactFormInputs) => {
		console.log("Form Data:", data);
		const body = {
			name: data.name,
			email: data.email,
			countryCode: data.countryCode,
			phone: data.phone,
			profession: data.profession,
			message: data.message,
		};
		contactAdmin(body);
	};

	useEffect(() => {
		if (isSuccess) {
			reset();
			toast({
				variant: "success",
				title: "Success",
				description: "Your message has been sent successfully !",
			});
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError || error) {
			toast({
				variant: "destructive",
				title: "Error",
				description:
					"An error occurred while sending your message. Please try again later.",
			});
		}
	}, [isError, error]);

	return (
		<section className="w-full rounded-2xl shadow-lg bg-gradient-to-r from-teal-600 to-yellow-600 py-16 px-6">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
				{/* Left Image Section */}
				<div className="flex-1 flex justify-center items-center">
					<img
						src="/images/contact.webp"
						alt="Contact Illustration"
						className="w-[85%] max-w-md rounded-2xl drop-shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 ease-in-out"
					/>
				</div>

				{/* Right Form Section */}
				<div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
					<h4 className="text-[1.8rem] md:text-[2.4rem] font-dancing font-[800] bg-gradient-to-r from-teal-600 via-yellow-500 to-pink-600 text-transparent bg-clip-text">
						Get In Touch
					</h4>

					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							{/* Name */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Name
								</label>
								<input
									type="text"
									{...register("name", { required: "Name is required" })}
									placeholder="Your full name"
									className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
								/>
								{errors.name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.name.message}
									</p>
								)}
							</div>

							{/* Email */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>
								<input
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

							{/* Phone */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
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
														? `${
																getValues("countryCode")?.replace("+", "") || ""
														  }${field.value}`
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
												inputClass="!w-full !h-[3rem] !text-base !rounded-lg !border !border-gray-300 focus:!border-teal-500 focus:!ring-2 focus:!ring-teal-400"
												buttonClass="!border-gray-300"
												dropdownClass="!rounded-lg !shadow-lg"
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

							{/* Profession */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Profession
								</label>
								<input
									type="text"
									{...register("profession", {
										required: "Profession is required",
									})}
									placeholder="Your profession"
									className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
								/>
								{errors.profession && (
									<p className="text-red-500 text-sm mt-1">
										{errors.profession.message}
									</p>
								)}
							</div>

							{/* Message */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Message
								</label>
								<Textarea
									{...register("message", {
										required: "Message is required",
									})}
									placeholder="Your message"
									rows={4}
									className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
								/>
								{errors.message && (
									<p className="text-red-500 text-sm mt-1">
										{errors.message.message}
									</p>
								)}
							</div>

							{/* Submit Button */}
							<Button
								variant="default"
								type="submit"
								disabled={isLoading}
								className="w-full text-white text-[.8rem] md:text-[1.2rem] font-medium py-4 rounded-lg transition-colors">
								{isLoading ? "Submitting..." : "Send Message"}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
