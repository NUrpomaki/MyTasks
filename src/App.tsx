import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext'; // <-- Tuo TaskProvider
import TaskListScreen from './screens/TaskListScreen'; // <-- Tuo uusi näyttö
import { StatusBar } from 'react-native';
import { useTheme } from './context/ThemeContext';

// Pääkomponentti, joka asettaa status barin teeman mukaan
const RootComponent = () => {
  const { currentThemeName } = useTheme();
  // Status barin väri riippuen teemasta
  const barStyle = currentThemeName === 'light' ? 'dark-content' : 'light-content';

  return (
    <>
      <StatusBar barStyle={barStyle} />
      {/* Tähän tulee myöhemmin navigointi, joka päättää, näytetäänkö AuthScreen vai TaskListScreen */}
      <TaskListScreen />
    </>
  );
}

const App = () => {
  return (
    // Järjestys on tärkeä: ThemeProvider ensin, koska TaskListScreen käyttää teemaa
    <ThemeProvider>
        <TaskProvider>
            <RootComponent />
        </TaskProvider>
    </ThemeProvider>
  );
};

export default App;