import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { useAppSelector } from '../hooks';

// Custom colors
const customColors = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  error: '#B00020',
};

// Light theme
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
  },
};

// Dark theme
const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...customColors,
  },
};

// Combined themes with navigation colors
const CombinedLightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

// Hook to get the current theme
export const useAppTheme = () => {
  const systemColorScheme = useColorScheme();
  const { settings } = useAppSelector(state => state.settings);

  // Determine which theme to use based on settings and system preference
  const themePreference = settings.theme;
  const isDarkMode = 
    themePreference === 'dark' || 
    (themePreference === 'system' && systemColorScheme === 'dark');

  return isDarkMode ? CombinedDarkTheme : CombinedLightTheme;
};
