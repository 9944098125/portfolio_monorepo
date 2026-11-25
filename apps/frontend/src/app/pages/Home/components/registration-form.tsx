import { Button } from "app/components/ui/button";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSlice } from "../slice";
import { toast } from "app/components/ui/use-toast";
import { Form } from "app/components/ui/form";
import { Textarea } from "app/components/ui/textarea";
import { Upload, XIcon } from "lucide-react";
import { uploadToCloudinary } from "utils/cloudinary";

type RegisterFormInputs = {
  full_name: string;
  password: string;
  email: string;
  countryCode: string;
  phone: string;
  image: string;
  about: string;
  city: string;
  designation: string;
};

const RegistrationSection: React.FC = () => {
  const { useRegisterMutation } = useSlice();
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const form = useForm<RegisterFormInputs>({
    defaultValues: {
      full_name: "",
      password: "",
      email: "",
      countryCode: "+91",
      phone: "",
      image: "",
      about: "",
      city: "",
      designation: "",
    },
  });

  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = form;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, WEBP, GIF, SVG).",
      });
      return;
    }

    setUploadingImage(true);

    try {
      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        setValue("image", uploadedUrl);
        toast({
          variant: "success",
          title: "Image Uploaded",
          description: "Profile picture uploaded successfully!",
        });
      }
    } catch (err: any) {
      console.error("Cloudinary upload error:", err);
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: err?.message || "An error occurred while uploading your image.",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImageUrl("");
    setValue("image", "");
  };

  const onSubmit = (data: RegisterFormInputs) => {
    const body = {
      full_name: data.full_name,
      password: data.password,
      email: data.email,
      is_admin: false,
      countryCode: data.countryCode || "+91",
      phone: data.phone,
      image: imageUrl || data.image || "",
      about: data.about || "",
      city: data.city || "",
      designation: data.designation || "",
    };
    registerUser(body);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setImageUrl("");
      toast({
        variant: "success",
        title: "Success",
        description: "Registration completed successfully! Welcome aboard.",
      });
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (isError || error) {
      const errorMsg =
        typeof error === "string"
          ? error
          : (error as any)?.data?.message ||
            (error as any)?.message ||
            "An error occurred while registering. Please try again.";
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMsg,
      });
    }
  }, [isError, error]);

  return (
    <section className="w-full rounded-2xl shadow-lg bg-gradient-to-r from-teal-600 to-yellow-600 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Image Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <img
            src="/images/contact.webp"
            alt="Registration Illustration"
            className="w-[85%] max-w-md rounded-2xl drop-shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 ease-in-out"
          />
          <div className="mt-6 text-white max-w-md px-4">
            <h3 className="text-2xl md:text-3xl font-bold font-poppins">
              Join Our Platform
            </h3>
            <p className="text-sm md:text-base text-teal-50 mt-2 font-poppins">
              Showcase your skills, projects, and educational milestones with a
              stunning personal portfolio.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="mb-6">
            <h4 className="text-[1.8rem] md:text-[2.4rem] font-dancing font-[800] bg-gradient-to-r from-teal-600 via-yellow-500 to-pink-600 text-transparent bg-clip-text">
              Register Now
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              Fill in the details below to create your portfolio profile
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("full_name", {
                      required: "Full name is required",
                    })}
                    placeholder="e.g. Akella Srinivas Prasad"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="Enter password"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      validate: (value) =>
                        (value && value.replace(/\D/g, "").length >= 7) ||
                        "Enter a valid phone number",
                    }}
                    render={({ field }) => (
                      <div>
                        <PhoneInput
                          country={"in"}
                          enableSearch={true}
                          value={
                            field.value
                              ? `${(getValues("countryCode") || "").replace(
                                  "+",
                                  "",
                                )}${field.value}`
                              : ""
                          }
                          onChange={(value, countryData: any) => {
                            const dialCode = `+${countryData.dialCode}`;
                            const phoneNumber = value.slice(
                              countryData.dialCode.length,
                            );
                            setValue("countryCode", dialCode);
                            field.onChange(phoneNumber);
                          }}
                          inputClass="!w-full !h-[42px] !text-sm !rounded-lg !border !border-gray-300 focus:!border-teal-500 focus:!ring-2 focus:!ring-teal-400"
                          buttonClass="!border-gray-300"
                          dropdownClass="!rounded-lg !shadow-lg"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Designation & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("designation", {
                      required: "Designation is required",
                    })}
                    placeholder="e.g. Web Developer"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {errors.designation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.designation.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("city", {
                      required: "City is required",
                    })}
                    placeholder="e.g. Kakinada"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Image Upload (Cloudinary) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  {imageUrl ? (
                    <div className="relative group flex-shrink-0">
                      <img
                        src={imageUrl}
                        alt="Profile preview"
                        className="w-14 h-14 rounded-full object-cover border-2 border-teal-500 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        title="Remove image"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 flex-shrink-0">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleImageUpload}
                      className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                    />
                    {uploadingImage && (
                      <p className="text-xs text-teal-600 mt-1 font-medium animate-pulse">
                        Uploading image to Cloudinary...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About
                </label>
                <Textarea
                  {...register("about")}
                  placeholder="Tell us about yourself (e.g. MERN Stack Developer with 3+ years of experience...)"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="default"
                type="submit"
                disabled={isLoading || uploadingImage}
                className="w-full text-white text-[.9rem] md:text-[1.1rem] font-medium py-3 rounded-lg transition-colors bg-teal-600 hover:bg-teal-700"
              >
                {isLoading
                  ? "Registering..."
                  : uploadingImage
                  ? "Uploading Image..."
                  : "Register"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
