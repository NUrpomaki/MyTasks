import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // <-- Tuo useTheme
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar } from 'react-native';

// --- Placeholder-komponentti testaukseen ---
const DummyScreen = () => {
  // 1. Käytä useTheme-hookia teeman ja vaihtotoiminnon saamiseksi
  const { theme, toggleTheme, currentThemeName } = useTheme(); 

  // 2. Dynaamiset tyylit käyttäen teeman värejä
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background, // Käytä teeman taustaväriä
    },
    text: {
      fontSize: 20,
      color: theme.colors.text, // Käytä teeman tekstin väriä
      marginBottom: 20,
    }
  });

  return (
    <View style={dynamicStyles.container}>
      <StatusBar barStyle={currentThemeName === 'light' ? 'dark-content' : 'light-content'} />
      <Text style={dynamicStyles.text}>
        Tämänhetkinen teema: {currentThemeName.toUpperCase()}
      </Text>
      {/* 3. Lisää painike teeman vaihtamiseksi */}
      <Button 
        title={`Vaihda ${currentThemeName === 'light' ? 'Tummaan' : 'Vaaleaan'}`} 
        onPress={toggleTheme} 
        color={theme.colors.primary} // Käytä teeman pääväriä
      />
    </View>
  );
};
// ------------------------------------------

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <DummyScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;