import React, { useState } from "react";
import { StatusBar } from "react-native";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";

import TaskListScreen from "./screens/TaskListScreen";
import LoginScreen from "./screens/LoginScreen";

// Pääkomponentti, jossa päätetään mitä näytetään
const RootComponent = () => {
  const { currentThemeName } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const barStyle =
    currentThemeName === "light" ? "dark-content" : "light-content";

  return (
    <>
      <StatusBar barStyle={barStyle} />
      {isLoggedIn ? (
        <TaskListScreen onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
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
