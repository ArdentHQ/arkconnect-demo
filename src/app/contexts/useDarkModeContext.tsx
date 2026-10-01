import { createContext, useState, useEffect, useContext } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Reads browser-only APIs (localStorage/matchMedia), so this has to run after
    // mount rather than during the initial render, to avoid a hydration mismatch.
    /* eslint-disable react-hooks/set-state-in-effect */
    const storedDarkModePreference = localStorage.getItem("darkMode");
    if (storedDarkModePreference) {
      setDarkMode(Boolean(JSON.parse(storedDarkModePreference)));
    } else {
      const isPrefersDarkMode = matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setDarkMode(isPrefersDarkMode);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error(
      "useDarkModeContext must be within ArkConnectContext.Provider",
    );
  }

  return context;
};
