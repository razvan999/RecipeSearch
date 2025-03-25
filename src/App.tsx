import { createContext, useState } from "react";
import Homepage from "./components/Homepage";

export const ThemeContext = createContext<{
  isLightTheme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<{ isLightTheme: boolean }>>;
}>({
  isLightTheme: true,
  setTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState<{ isLightTheme: boolean }>({
    isLightTheme: true,
  });

  return (
    <ThemeContext.Provider
      value={{ isLightTheme: theme.isLightTheme, setTheme }}
    >
      <Homepage />
    </ThemeContext.Provider>
  );
}

export default App;
