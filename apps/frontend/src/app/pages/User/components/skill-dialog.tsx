// src/components/SkillDialog.tsx
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "app/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { useSlice } from "../slice";
import { toast } from "app/components/ui/use-toast";
import { Icons } from "app/components/ui/icons";
import { XIcon } from "lucide-react";
import { useTheme } from "app/components/ui/theme-provider";
import { uploadToCloudinary } from "utils/cloudinary";

interface SkillDialogProps {
  open: { bool: boolean; skillId: string | undefined };
  setOpen: Dispatch<
    SetStateAction<{ bool: boolean; skillId: string | undefined }>
  >;
  create: (body: any) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;
}

const SkillDialog: React.FC<SkillDialogProps> = (props: SkillDialogProps) => {
  const { open, setOpen, create, isLoading, isSuccess, isError, error } = props;
  const user = useSelector(selectUser);
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: { name: "", level: "", logo: "" },
  });
  const { useLazyGetSkillQuery } = useSlice();

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

  const [
    getSkill,
    {
      data: getSkillData,
      isLoading: getSkillLoading,
      isError: getSkillError,
      error: getSkillErrorMessage,
    },
  ] = useLazyGetSkillQuery();

  // Local state for upload & preview
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  // Cloudinary upload adapted from provided function
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
      // minimal UI response; you can replace with toast if you prefer
      alert("Invalid file type. Please upload an image file.");
      setUploading(false);
      return;
    }

    try {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
      setValue("logo", url); // keep form in sync
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: any) => {
    const body: any = {
      skillId: open?.skillId || undefined,
      name: data.name,
      level: data.level,
      logo: imageUrl || data.logo || "", // prefer uploaded imageUrl
      userId: user?._id,
    };
    if (!open?.skillId) {
      delete body.skillId;
    }
    create(body);
    reset();
    setImageUrl("");
    setUploading(false);
    setOpen({ bool: false, skillId: "" });
  };

  useEffect(() => {
    if (open?.bool && open?.skillId) {
      getSkill({ skillId: open?.skillId });
    } else if (open?.bool && !open?.skillId) {
      // Reset form when opening for create
      reset();
      setImageUrl("");
    }
  }, [open?.bool, open?.skillId]);

  useEffect(() => {
    // Only populate form when dialog is open for edit and we have data
    if (open?.bool && open?.skillId && getSkillData?.skill) {
      setValue("name", getSkillData.skill.name || "");
      setValue("level", getSkillData.skill.level || "");
      // set logo preview if skill has it
      const existingLogo = getSkillData.skill.logo || "";
      setImageUrl(existingLogo);
      setValue("logo", existingLogo);
    }
  }, [getSkillData, setValue, open?.bool, open?.skillId]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: open?.skillId
          ? "Updated skill successfully"
          : "Created a skill successfully",
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleImageUpload(file);
  };

  const removeImage = () => {
    setImageUrl("");
    setValue("logo", "");
  };

  return (
    <DialogContent
      onInteractOutside={(e) => e.preventDefault()}
      className={`sm:max-w-[480px] p-5 rounded-2xl ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          {open?.skillId ? (
            <DialogTitle>Update Skill</DialogTitle>
          ) : (
            <DialogTitle>Add New Skill</DialogTitle>
          )}
          <DialogDescription>
            Enter the name, level, and optional logo for your skill below.
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
        {/* Skill Name */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Skill Name
          </label>
          <Input
            {...register("name", { required: true })}
            placeholder="React / Node"
          />
        </div>

        {/* Skill Level Select */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Level
          </label>
          <Controller
            name="level"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full text-gray-700">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            )}
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
            <input
              id="skill-logo"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block"
            />
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
                className="w-14 h-14 object-cover rounded-md border"
              />
              <div className="flex flex-col">
                {/* <span className="text-sm text-gray-700 break-all max-w-xs">
									{imageUrl}
								</span> */}
                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      // trigger re-upload by clearing file input (can't access file input value directly)
                      removeImage();
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setImageUrl("");
              setOpen({ bool: false, skillId: "" });
            }}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="text-white"
            type="submit"
            disabled={uploading || isLoading}
          >
            {(uploading || isLoading) && (
              <Icons.Spinner className="animate-spin text-teal-600 mr-2" />
            )}
            {open?.skillId ? "Update Skill" : "Add Skill"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default SkillDialog;
