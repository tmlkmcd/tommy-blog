import * as React from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<{ theme: "light" | "dark" }>(
    "theme",
    { theme: "light" }
  );

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => ({
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  }, [setTheme]);

  return { ...theme, toggleTheme };
};
