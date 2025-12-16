import { Theme } from '../types/Theme';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#0A84FF',       // Kirkkaampi sininen
    background: '#000000',    // Musta tausta
    text: '#E5E5E5',          // Vaalea teksti
    card: '#1C1C1E',          // Tumma kortin tausta
    border: '#3A3A3C',        // Tumman harmaa reuna
    success: '#30D158',       // Vihreä
    danger: '#FF453A',        // Punainen
    priorityHigh: '#FF453A',  // Punainen - korkea prioriteetti
    priorityMedium: '#FF9F0A', // Oranssi - keskitaso
    priorityLow: '#30D158',   // Vihreä - matala prioriteetti
  },
};