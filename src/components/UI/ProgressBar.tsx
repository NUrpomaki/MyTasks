import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Edistymispalkki tehtävien valmiusasteen näyttämiseen

interface ProgressBarProps {
  progress: number; // 0-100 välillä
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  height = 12,
  backgroundColor,
  fillColor,
}) => {
  const { theme } = useTheme();

  // Varmistetaan että progress on 0-100 välillä
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View 
      style={[
        styles.container, 
        { 
          height,
          backgroundColor: backgroundColor || theme.colors.border + '40',
        }
      ]}
    >
      <View 
        style={[
          styles.fill,
          { 
            width: `${clampedProgress}%`,
            backgroundColor: fillColor || theme.colors.primary,
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
});

export default ProgressBar;