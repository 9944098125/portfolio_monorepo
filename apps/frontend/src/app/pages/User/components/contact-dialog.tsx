// src/components/ContactDialog.tsx
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
import { useForm, Controller } from "react-hook-form";
import { Icons } from "app/components/ui/icons";
import { toast } from "app/components/ui/use-toast";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { useSlice } from "../slice";
import { XIcon } from "lucide-react";
import { useTheme } from "app/components/ui/theme-provider";
import { uploadToCloudinary } from "utils/cloudinary";

interface ContactDialogProps {
  open: { bool: boolean; contactId?: string | undefined };
  setOpen: Dispatch<
    SetStateAction<{ bool: boolean; contactId?: string | undefined }>
  >;
  create: (body: any) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
}

type FormValues = {
  medium: string;
  logo: string;
};

const ContactDialog: React.FC<ContactDialogProps> = ({
  open,
  setOpen,
  create,
  isLoading,
  isSuccess,
  isError,
  error,
}) => {
  const { register, handleSubmit, reset, setValue, control } =
    useForm<FormValues>({
      defaultValues: {
        medium: "",
        logo: "",
      },
    });

  const { useLazyGetContactQuery } = useSlice();

  const [
    getContact,
    {
      data: getContactData,
      isError: getContactError,
      error: getContactErrorMessage,
    },
  ] = useLazyGetContactQuery();

  const user = useSelector(selectUser);
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

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

  // Cloudinary upload
  const handleImageUpload = async (file: File | null) => {
    setUploading(true);
    if (!file) {
      setUploading(false);
      return;
    }
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
      setValue("logo", url);
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleImageUpload(file);
  };

  const removeImage = () => {
    setImageUrl("");
    setValue("logo", "");
  };

  const onSubmit = (data: FormValues) => {
    const body = {
      medium: data.medium,
      logo: imageUrl || data.logo || "",
      userId: user?._id,
      ...(open?.contactId && { contactId: open.contactId }),
    };

    create(body);
    reset();
    setImageUrl("");
    setUploading(false);
    setOpen({ bool: false, contactId: undefined });
  };

  useEffect(() => {
    if (open?.bool && open?.contactId) {
      getContact({ contactId: open?.contactId });
    } else if (open?.bool && !open?.contactId) {
      // Reset form when opening for create
      reset();
      setImageUrl("");
    }
  }, [open?.bool, open?.contactId]);

  useEffect(() => {
    // Only populate form when dialog is open for edit and we have data
    if (open?.bool && open?.contactId && getContactData?.data) {
      const { medium = "", logo = "" } = getContactData.data;

      // set form values
      setValue("medium", medium);
      setValue("logo", logo);

      // show preview
      setImageUrl(logo || "");
    }
  }, [getContactData, setValue, open?.bool, open?.contactId]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: open?.contactId ? "Contact updated" : "Contact created",
        description: open?.contactId
          ? "Your contact was updated successfully."
          : "Your contact was created successfully.",
        variant: "success",
      });
    }
  }, [isSuccess, open?.contactId]);

  useEffect(() => {
    if (isError || error) {
      toast({
        title: "Error",
        description: error || "Failed to save contact.",
        variant: "destructive",
      });
    }
  }, [isError, error]);

  return (
    <DialogContent
      onInteractOutside={(e) => e.preventDefault()}
      className={`sm:max-w-[640px] p-6 rounded-2xl ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <DialogTitle>
            {open?.contactId ? "Edit Contact" : "Add Contact"}
          </DialogTitle>
          <DialogDescription>
            {open?.contactId
              ? "Update your contact information."
              : "Add a new contact with medium and logo."}
          </DialogDescription>
        </div>
        <DialogClose asChild>
          <XIcon
            className={`cursor-pointer w-5 h-5 ${
              isDarkMode ? "text-white" : "text-gray-500"
            }`}
          />
        </DialogClose>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* Medium */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Medium <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("medium", { required: true })}
            placeholder="e.g., LinkedIn, GitHub, Email"
            key={`medium-${open?.contactId || "new"}`}
          />
        </div>

        {/* Logo upload */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Logo (optional)
          </label>
          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={onFileChange} />
            {uploading && (
              <div className="flex items-center gap-2">
                <Icons.Spinner className="animate-spin" />
                <span className="text-sm">Uploading...</span>
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="mt-3 flex items-center gap-3">
              <img
                src={imageUrl}
                alt="logo preview"
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div className="flex flex-col">
                <span
                  className={`text-sm break-all max-w-xs ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  {imageUrl}
                </span>
                <div className="mt-2 flex gap-2">
                  <Button type="button" variant="ghost" onClick={removeImage}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setImageUrl("");
              setOpen({ bool: false, contactId: undefined });
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="default"
            className="text-white"
            disabled={uploading || isLoading}
          >
            {(uploading || isLoading) && (
              <Icons.Spinner className="animate-spin mr-2" />
            )}
            {open?.contactId ? "Update" : "Add"} Contact
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ContactDialog;
