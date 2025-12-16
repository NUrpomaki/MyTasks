import React, { useState } from "react";
import { StatusBar } from "react-native";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";

import TaskListScreen from "./screens/TaskListScreen";
import LoginScreen from "./screens/LoginScreen";
import StatsScreen from "./screens/StatsScreen";

// Näkymien tyypit navigointia varten
type Screen = 'tasks' | 'stats';

// Pääkomponentti, jossa päätetään mitä näytetään
const RootComponent = () => {
  const { currentThemeName } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('tasks');

  const barStyle =
    currentThemeName === "light" ? "dark-content" : "light-content";

  // Kirjaudu ulos ja palaa aloitusnäkymään
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('tasks');
  };

  // Jos ei kirjautunut, näytetään kirjautumissivu
  if (!isLoggedIn) {
    return (
      <>
        <StatusBar barStyle={barStyle} />
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      </>
    );
  }

  // Kirjautuneena näytetään joko tehtävälista tai tilastot
  return (
    <>
      <StatusBar barStyle={barStyle} />
      {currentScreen === 'tasks' ? (
        <TaskListScreen 
          onLogout={handleLogout} 
          onOpenStats={() => setCurrentScreen('stats')}
        />
      ) : (
        <StatsScreen 
          onBack={() => setCurrentScreen('tasks')}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <RootComponent />
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;