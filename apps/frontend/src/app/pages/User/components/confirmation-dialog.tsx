import { Button } from "app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "app/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IUser } from "types/modules";
import { XIcon } from "lucide-react";
import { useTheme } from "app/components/ui/theme-provider";

type Props = {
  purpose?: string;
  showConfirm: boolean;
  setShowConfirm: (value: boolean) => void;
  confirmUpdate: (values: Partial<IUser>) => void;
};
export function ConfirmationDialog(props: Props) {
  const { showConfirm, setShowConfirm, confirmUpdate, purpose } = props;
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const form = useForm();
  const { handleSubmit } = form;

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

  return (
    <React.Fragment>
      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className={`p-4 rounded-2xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
        >
          <div className={`flex items-center p-5 justify-between relative ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
            <div className="absolute right-2 top-2">
              <DialogClose asChild>
                <XIcon className={`cursor-pointer w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-500"}`} />
              </DialogClose>
            </div>
            <div className="flex flex-col space-y-4">
              <DialogTitle>
                {purpose === "delete" ? "Confirm Deletion" : "Confirm Changes"}
              </DialogTitle>
              <DialogDescription>
                {purpose === "delete"
                  ? "Are you sure you want to delete this user? This action cannot be undone."
                  : "Are you sure you want to save these changes to your personal details?"}
              </DialogDescription>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant={purpose === "delete" ? "destructive" : "default"}
              className="text-white"
              onClick={handleSubmit(confirmUpdate)}
            >
              Yes, {purpose === "delete" ? "Delete" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
