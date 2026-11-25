import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ColorTheme = 'black' | 'red' | 'green' | 'blue';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  defaultColor?: ColorTheme;
  colorStorageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setColor: (color: ColorTheme) => void;
  color: ColorTheme;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  setColor: () => null,
  color: 'black',
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  defaultColor = 'black',
  colorStorageKey = 'vite-ui-color',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const [color, setColor] = useState<ColorTheme>(
    () => (localStorage.getItem(colorStorageKey) as ColorTheme) || defaultColor,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.forEach(className => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className);
      }
    });

    document.body.classList.add(`theme-${color}`);
  }, [color]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    color: color,
    setColor: (color: ColorTheme) => {
      localStorage.setItem(colorStorageKey, color);
      setColor(color);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
