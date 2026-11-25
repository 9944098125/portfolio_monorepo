import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import ThemeDialog from "./theme-dialog";
import { IUser } from "types/modules";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useTheme } from "app/components/ui/theme-provider";

type Props = {
  open: { bool: boolean; themeId?: string | undefined };
  setOpen: Dispatch<
    SetStateAction<{ bool: boolean; themeId?: string | undefined }>
  >;
  data: {
    message: string;
    data: IUser;
  };
  createTheme: (value: any) => void;
  createLoading: boolean;
  createSuccess: boolean;
  createError: boolean;
  createErrorMessage: string;
  updateTheme: (value: any) => void;
  updateLoading: boolean;
  updateSuccess: boolean;
  updateError: boolean;
  updateErrorMessage: string;
  deleteTheme: (val: { themeId: string }) => void;
  deleteThemeLoading: boolean;
};

export const Themes = (props: Props) => {
  const {
    open,
    setOpen,
    data,
    createTheme,
    createLoading,
    createSuccess,
    createError,
    createErrorMessage,
    updateTheme,
    updateLoading,
    updateSuccess,
    updateError,
    updateErrorMessage,
    deleteTheme,
    deleteThemeLoading,
  } = props;

  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [themeId, setThemeId] = useState<string | undefined>();

  const selectedTheme = data?.data?.selectedTheme;

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

  const deleteThemeById = () => {
    if (!themeId) {
      setShowConfirm(false);
      return;
    }
    deleteTheme({ themeId: themeId });
    setShowConfirm(false);
  };

  const handleCreateOrUpdate = (body: any) => {
    if (open?.themeId) {
      updateTheme(body);
    } else {
      createTheme(body);
    }
  };

  return (
    <React.Fragment>
      <div
        id="themes"
        className={`min-h-screen relative py-12 px-2 rounded-2xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <h2 className="text-[2.4rem] md:text-[4.1rem] font-extrabold bg-gradient-to-r from-teal-700 via-orange-300 to-violet-600 text-transparent bg-clip-text mb-6 font-dancing">
          Update Theme
        </h2>

        {selectedTheme ? (
          <div className="space-y-6 w-full md:w-1/2 mx-auto">
            {/* Theme Preview Section */}
            <div
              style={{
                backgroundColor: selectedTheme.background || "#ffffff",
                minHeight: "400px",
              }}
              className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Preview Container */}
              <div className="relative">
                {/* Navbar */}
                <div
                  className="w-[15rem] h-[15rem] m-5 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: selectedTheme.boldBg || "#000000",
                  }}
                >
                  <span
                    style={{ color: "white" }}
                    className=" font-semibold text-lg"
                  >
                    Bold Background
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-8 space-y-6">
                  {/* Heading with theme name */}
                  <h3
                    className="text-3xl font-bold text-center"
                    style={{
                      color: selectedTheme.primaryColor || "#000000",
                    }}
                  >
                    {selectedTheme.name || "Theme Name"}
                  </h3>

                  {/* Buttons */}
                  <div className="flex gap-4 justify-center items-center flex-wrap">
                    <button
                      className="px-6 py-3 rounded-lg font-semibold text-white"
                      style={{
                        backgroundColor:
                          selectedTheme.primaryColor || "#000000",
                      }}
                    >
                      Primary
                    </button>
                    <button
                      className="px-6 py-3 rounded-lg font-semibold text-white"
                      style={{
                        backgroundColor:
                          selectedTheme.secondaryColor || "#000000",
                      }}
                    >
                      Secondary
                    </button>
                  </div>

                  {/* Background text in center */}
                  <div className="flex items-center justify-center min-h-[200px]">
                    <span
                      className="text-2xl font-semibold"
                      style={{
                        color: selectedTheme.primaryColor || "#000000",
                      }}
                    >
                      Background
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center items-center">
              <Dialog
                open={open.bool}
                onOpenChange={(open) => {
                  setOpen({ bool: open, themeId: selectedTheme._id });
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() =>
                      setOpen({ bool: true, themeId: selectedTheme._id })
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Theme
                  </Button>
                </DialogTrigger>

                <ThemeDialog
                  open={open}
                  setOpen={setOpen}
                  create={handleCreateOrUpdate}
                  isSuccess={open?.themeId ? updateSuccess : createSuccess}
                  isLoading={open?.themeId ? updateLoading : createLoading}
                  isError={open?.themeId ? updateError : createError}
                  error={
                    open?.themeId
                      ? (updateErrorMessage as string)
                      : (createErrorMessage as string)
                  }
                />
              </Dialog>

              <Button
                variant="destructive"
                className="cursor-pointer text-white"
                onClick={() => {
                  setThemeId(selectedTheme._id);
                  setShowConfirm(true);
                }}
                disabled={deleteThemeLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Theme
              </Button>
            </div>
          </div>
        ) : (
          /* Create Button - Centered */
          <div className="flex items-center justify-center min-h-[400px]">
            <Dialog
              open={open.bool}
              onOpenChange={(open) => {
                setOpen({ bool: open, themeId: "" });
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer w-[10rem] h-[10rem] rounded-full transition-colors"
                  onClick={() => setOpen({ bool: true, themeId: "" })}
                >
                  <Plus className="text-gray-800 text-[4rem]" />
                </Button>
              </DialogTrigger>

              <ThemeDialog
                open={open}
                setOpen={setOpen}
                create={handleCreateOrUpdate}
                isSuccess={createSuccess}
                isLoading={createLoading}
                isError={createError}
                error={createErrorMessage as string}
              />
            </Dialog>
          </div>
        )}

        <ConfirmationDialog
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          confirmUpdate={deleteThemeById}
          purpose="delete"
        />
      </div>
    </React.Fragment>
  );
};
