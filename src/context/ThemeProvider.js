import React, {createContext, useState, useEffect, useMemo} from 'react';
import {Appearance} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';
// Define custom themes with onboarding background colors
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    error: '#d9534f',
    blue: '#97e5ea', // Deep Blue
    green: '#388E3C',
    appColor: '#000',
    appDark: '#6d9295',
    btn:"#05bbc9"

  },
  roundness: 8,
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000',
    blue: '#97e5ea', // Deep Blue
    green: '#388E3C',
    error: '#d9534f',
    appColor: '#000',
    appDark: '#6d9295',
    btn:"#05bbc9"

  },
  roundness: 8,
};

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    // Update theme when system theme changes
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const currentTheme = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme: currentTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
