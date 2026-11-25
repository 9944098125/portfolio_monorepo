"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "app/components/ui/input";
import {
  Upload,
  User,
  Mail,
  Building2,
  MapPin,
  Phone,
  Edit3,
} from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "app/components/ui/button";
import { IUser } from "types/modules";
import { useParams } from "react-router-dom";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useTheme } from "app/components/ui/theme-provider";
import { uploadToCloudinary } from "utils/cloudinary";

type Props = {
  data: {
    message: string;
    data: Partial<IUser>;
  };
  isLoading: boolean;
  update: (values: Partial<IUser>) => void;
};

export const PersonalDetails = (props: Props) => {
  const { data, update, isLoading } = props;
  const userFromParams = useParams();
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const [phoneValue, setPhoneValue] = useState("");

  const user = data?.data;

  useEffect(() => {
    const updateDarkMode = () => {
      if (theme === "dark") {
        setIsDarkMode(true);
      } else if (theme === "light") {
        setIsDarkMode(false);
      } else if (theme === "system") {
        setIsDarkMode(
          window.matchMedia("(prefers-color-scheme: dark)").matches,
        );
      }
    };

    updateDarkMode();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateDarkMode);
      return () => mediaQuery.removeEventListener("change", updateDarkMode);
    }
  }, [theme]);

  // ✅ Prefill user data properly when available
  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name || "",
        email: user.email || "",
        designation: user.designation || "",
        city: user.city || "",
      });
      setImageUrl(user.image || null);
      if (user?.countryCode && user?.phone) {
        const combined = `${user.countryCode.replace("+", "")}${user.phone}`;
        setPhoneValue(combined);
        setValue("phone", combined);
        setValue("countryCode", user.countryCode);
        setValue("phoneNumber", user.phone);
      }
    }
  }, [user, reset, setValue]);

  const onSubmit = (formData: any) => {
    // open confirmation dialog before update
    setShowConfirm(true);
    setFormData(formData);
  };

  const confirmUpdate = () => {
    const body = {
      userId: userFromParams?.userId || "",
      full_name: formData?.full_name || "",
      email: formData?.email || "",
      designation: formData?.designation || "",
      image: imageUrl || "",
      phone: formData?.phoneNumber || "",
      countryCode: formData?.countryCode || "",
      city: formData?.city || "",
    };
    update(body);
    setShowConfirm(false);
    setIsEditable(false);
  };

  const handleImageUpload = async (file: File | null) => {
    setUploading(true);
    if (!file) return;
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload an image file.");
      setUploading(false);
      return;
    }

    try {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      id="personal-details"
      className={`rounded-2xl backdrop-blur-2xl flex flex-col items-center py-12 px-4 relative ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full">
        <h2 className="text-[2.4rem] md:text-[4.1rem] font-extrabold bg-gradient-to-r from-teal-700 via-orange-300 to-violet-600 text-transparent bg-clip-text font-dancing">
          Personal Details
        </h2>
        {/* Edit Button */}
        <div className="absolute top-6 right-8">
          <Button
            variant={isEditable ? "secondary" : "default"}
            onClick={() => setIsEditable(!isEditable)}
            className="flex items-center text-white gap-2"
          >
            <Edit3 size={18} />
            {isEditable ? "Cancel Edit" : "Edit Details"}
          </Button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4"
        >
          <div className="col-span-12 md:col-span-6">
            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold">
                Full Name
              </label>
              <div className="flex items-center gap-2">
                <User className="text-gray-400" size={20} />
                <Input
                  {...register("full_name", {
                    required: "Full name is required",
                  })}
                  disabled={!isEditable}
                  placeholder="John Doe"
                />
              </div>
              {errors.full_name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.full_name.message as string}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-300">
                Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="text-gray-400" size={20} />
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  disabled={!isEditable}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            {/* City */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-300">
                City
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-400" size={20} />
                <Input
                  {...register("city", { required: "City is required" })}
                  disabled={!isEditable}
                  placeholder="New York"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Phone
              </label>
              <div className="flex items-center gap-2">
                <Phone className="text-gray-400" size={20} />
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      disabled={!isEditable}
                      country={
                        user?.countryCode
                          ? user.countryCode.replace("+", "").toLowerCase()
                          : "in"
                      }
                      enableSearch
                      // ✅ controlled value from local state
                      value={phoneValue}
                      onChange={(value, country: any) => {
                        setPhoneValue(value); // keep local state in sync
                        field.onChange(value); // update react-hook-form too

                        const dial = `+${country.dialCode}`;
                        const localNumber = value
                          .replace(country.dialCode, "")
                          .trim();

                        setValue("countryCode", dial);
                        setValue("phoneNumber", localNumber);
                      }}
                      inputStyle={{
                        width: "100%",
                        borderRadius: "0.5rem",
                        border: isEditable
                          ? isDarkMode
                            ? "1px solid #4b5563"
                            : "1px solid #9ca3af"
                          : isDarkMode
                          ? "1px solid #374151"
                          : "1px solid #d8d8d8ff",
                        height: "45px",
                        color: isEditable
                          ? isDarkMode
                            ? "#ffffff"
                            : "#111827"
                          : isDarkMode
                          ? "#9ca3af"
                          : "lightgray",
                        backgroundColor: isDarkMode ? "#1f2937" : "transparent",
                      }}
                      buttonStyle={{
                        background: "transparent",
                        border: "none",
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                      dropdownStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Designation */}
          <div className="col-span-12 md:col-span-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-300">
                Designation
              </label>
              <div className="flex items-center gap-2">
                <Building2 className="text-gray-400" size={20} />
                <Input
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  disabled={!isEditable}
                  placeholder="Frontend Developer"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="col-span-12">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-300">
                Profile Image
              </label>
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed ${
                  isEditable
                    ? "cursor-pointer hover:border-purple-500"
                    : "cursor-not-allowed"
                } border-gray-600 rounded-xl p-6 transition-all`}
                onClick={() =>
                  isEditable && document.getElementById("fileUpload")?.click()
                }
              >
                {imageUrl && uploading ? (
                  <div
                    className="relative h-[25rem] w-[20rem] rounded-2xl shadow-lg border border-purple-500 overflow-hidden bg-cover"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  >
                    {/* Background overlay for opacity */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Loader on top of everything */}
                    {uploading && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                        <div className="animate-spin border-4 border-purple-500 border-t-transparent rounded-full h-10 w-10"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <Upload size={28} className="text-gray-400 mb-2" />
                      <p className="text-gray-400 text-sm mb-2">
                        {uploading ? "Uploading..." : "Click to upload image"}
                      </p>
                    </div>
                  </div>
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-[20rem] h-[25rem] rounded-2xl object-cover shadow-lg border border-purple-500"
                  />
                ) : (
                  <>
                    <Upload size={28} className="text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm mb-2">
                      {uploading ? "Uploading..." : "Click to upload image"}
                    </p>
                  </>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => handleImageUpload(e.target?.files?.[0])}
                  className="hidden"
                  id="fileUpload"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditable && (
            <div className="col-span-12">
              <Button
                variant="default"
                type="submit"
                className="w-full py-6 text-white text-lg"
              >
                {isLoading ? "Saving Details..." : "Save Details"}
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
