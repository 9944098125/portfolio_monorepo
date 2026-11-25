/**
 *
 * Layout
 *
 */
import React, { memo, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";
import { useTheme } from "app/components/ui/theme-provider";

interface Props {}

export const Layout = memo((props: Props) => {
  const user = useSelector(selectUser);
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user]);

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
      {user ? (
        <div className="h-screen w-full">
          <Navbar />
          <div className="flex w-full h-[calc(100%-3.8rem)]">
            <Sidebar />
            <div
              id="dashboard-scroll-container"
              className={`p-2 h-full w-full overflow-y-auto ${isDarkMode ? "bg-black" : "bg-[#FFF5EE]"}`}
            >
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full">
          <Navbar />
          <div className={`h-[calc(100%-3.8rem)] w-full ${isDarkMode ? "bg-black" : "bg-[#FFF5EE]"}`}>
            <Outlet />
          </div>
        </div>
      )}
    </React.Fragment>
  );
});
