import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Theme, ThemeName } from '../types/Theme';
import { lightTheme } from '../styles/lightTheme';
import { darkTheme } from '../styles/darkTheme';

// 1. Määritellään kontekstin muoto
interface ThemeContextType {
  theme: Theme;
  currentThemeName: ThemeName;
  toggleTheme: () => void; // Funktio teeman vaihtamiseen
}

// 2. Luodaan konteksti
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Luo Provider komponentti, joka tarjoaa tilan
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>('light'); // Aloitetaan vaalealla teemalla

  // Valitsee oikean teemaobjektin nimen perusteella
  const theme = currentThemeName === 'light' ? lightTheme : darkTheme;

  // Funktio vaihtaa teeman (light <-> dark)
  const toggleTheme = useCallback(() => {
    setCurrentThemeName(prevName => (prevName === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, currentThemeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Custom Hook kontekstin käyttämiseen
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};