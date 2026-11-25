// src/components/ProjectDialog.tsx
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
import { Textarea } from "app/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { Icons } from "app/components/ui/icons";
import { toast } from "app/components/ui/use-toast";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { useSlice } from "../slice";
import { XIcon } from "lucide-react";
import { useTheme } from "app/components/ui/theme-provider";
import { uploadToCloudinary } from "utils/cloudinary";

interface ProjectDialogProps {
  open: { bool: boolean; projectId?: string | undefined };
  setOpen: Dispatch<
    SetStateAction<{ bool: boolean; projectId?: string | undefined }>
  >;
  create: (body: any) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
}

type FormValues = {
  name: string;
  skills: string; // comma-separated input
  description: string;
  liveDemo: string;
  githubLink: string;
  thumbnail: string;
};

const ProjectDialog: React.FC<ProjectDialogProps> = ({
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
        name: "",
        skills: "",
        description: "",
        liveDemo: "",
        githubLink: "",
        thumbnail: "",
      },
    });

  const { useLazyGetProjectQuery } = useSlice();

  const [
    getProject,
    {
      data: getProjectData,
      isError: getProjectError,
      error: getProjectErrorMessage,
    },
  ] = useLazyGetProjectQuery();

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
      alert("Invalid file type. Please upload an image file.");
      setUploading(false);
      return;
    }

    try {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
      setValue("thumbnail", url);
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
    setValue("thumbnail", "");
  };

  const onSubmit = (data: FormValues) => {
    const skillsArray = (data.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const body: any = {
      thumbnail: imageUrl || data.thumbnail || "",
      name: data.name,
      skills: skillsArray,
      description: data.description || "",
      liveDemo: data.liveDemo || "",
      githubLink: data.githubLink || "",
      userId: user?._id,
    };

    // Only include projectId when updating, not when creating
    if (open?.projectId) {
      body.projectId = open.projectId;
    }

    create(body);
    // optimistic reset; parent should close on success or you can rely on isSuccess effect
    reset();
    setImageUrl("");
    setUploading(false);
    setOpen({ bool: false, projectId: undefined });
  };

  useEffect(() => {
    if (open?.bool && open?.projectId) {
      getProject({ projectId: open?.projectId });
    } else if (open?.bool && !open?.projectId) {
      // Reset form when opening for create
      reset();
      setImageUrl("");
    }
    // Note: We don't reset when dialog closes (open?.bool becomes false)
    // to prevent interfering with other dialogs
  }, [open?.bool, open?.projectId]);

  useEffect(() => {
    // Only populate form when dialog is open for edit and we have data
    if (open?.bool && open?.projectId && getProjectData?.data) {
      const {
        name = "",
        skills = [],
        description = "",
        liveDemo = "",
        githubLink = "",
        thumbnail = "",
      } = getProjectData.data;

      // set form values
      setValue("name", name);
      // convert skills array -> comma separated string for your skills input
      setValue(
        "skills",
        Array.isArray(skills) ? skills.join(", ") : skills || "",
      );
      setValue("description", description);
      setValue("liveDemo", liveDemo);
      setValue("githubLink", githubLink);
      setValue("thumbnail", thumbnail);

      // show preview
      setImageUrl(thumbnail || "");
    }
  }, [getProjectData, setValue, open?.bool, open?.projectId]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: open?.projectId ? "Project updated" : "Project created",
        description: open?.projectId
          ? "Your project was updated successfully."
          : "Your project was created successfully.",
        variant: "success",
      });
    }
  }, [isSuccess, open?.projectId]);

  useEffect(() => {
    if (isError || error) {
      toast({
        title: "Error",
        description: error || "Failed to create project.",
        variant: "destructive",
      });
    }
  }, [isError, error]);

  return (
    <DialogContent
      onInteractOutside={(e) => e.preventDefault()}
      className={`sm:max-w-[640px] p-6 rounded-2xl left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <DialogTitle>
            {open?.projectId ? "Edit Project" : "Add Project"}
          </DialogTitle>
          <DialogDescription>
            {open?.projectId
              ? "Update your project information."
              : "Create a project with thumbnail, skills, links and description."}
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
        {/* Name */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Project Name
          </label>
          <Input
            {...register("name", { required: true })}
            placeholder="Portfolio Website"
          />
        </div>

        {/* Skills (comma-separated) */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Skills (comma-separated)
          </label>
          <Input
            {...register("skills")}
            placeholder="React, TypeScript, Node"
          />
        </div>

        {/* Description */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Description
          </label>
          <Textarea
            {...register("description")}
            placeholder="Short description of the project"
          />
        </div>

        {/* Live Demo */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Live Demo (URL)
          </label>
          <Input {...register("liveDemo")} placeholder="https://example.com" />
        </div>

        {/* Github Link */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            GitHub Link (URL)
          </label>
          <Input
            {...register("githubLink")}
            placeholder="https://github.com/username/repo"
          />
        </div>

        {/* Thumbnail upload */}
        <div>
          <label
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Thumbnail (optional)
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
                alt="thumbnail preview"
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
              setOpen({ bool: false, projectId: undefined });
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
            {open?.projectId ? "Update" : "Add"} Project
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ProjectDialog;
