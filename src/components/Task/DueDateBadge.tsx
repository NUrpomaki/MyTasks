import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Näyttää tehtävän määräajan ja ilmaisee onko se myöhässä

interface DueDateBadgeProps {
  dueDate: number;
  completed: boolean;
}

const DueDateBadge: React.FC<DueDateBadgeProps> = ({ dueDate, completed }) => {
  const { theme } = useTheme();

  // Tarkistetaan onko tehtävä myöhässä
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Nollataan aika vertailua varten
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const isOverdue = !completed && due < now;
  const isToday = due.getTime() === now.getTime();

  // Muotoillaan päivämäärä
  const formatDueDate = () => {
    const day = due.getDate();
    const month = due.getMonth() + 1;
    
    if (isToday) {
      return 'Tänään';
    }
    
    // Tarkistetaan onko huomenna
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (due.getTime() === tomorrow.getTime()) {
      return 'Huomenna';
    }

    return `${day}.${month}.`;
  };

  // Valitaan väri tilan mukaan
  const getColor = () => {
    if (completed) {
      return theme.colors.success;
    }
    if (isOverdue) {
      return theme.colors.danger;
    }
    if (isToday) {
      return theme.colors.priorityMedium;
    }
    return theme.colors.border;
  };

  const color = getColor();

  return (
    <View style={[styles.container, { backgroundColor: color + '20' }]}>
      <Ionicons 
        name={isOverdue ? 'alert-circle' : 'calendar-outline'} 
        size={12} 
        color={color} 
      />
      <Text style={[styles.text, { color }]}>
        {formatDueDate()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default DueDateBadge;