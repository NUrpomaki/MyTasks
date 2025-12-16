import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { TaskPriority } from '../../types/Task';

// Komponentti prioriteetin valitsemiseen uutta tehtävää lisättäessä

interface PriorityPickerProps {
  selected: TaskPriority;
  onSelect: (priority: TaskPriority) => void;
}

const PriorityPicker: React.FC<PriorityPickerProps> = ({ selected, onSelect }) => {
  const { theme } = useTheme();

  // Prioriteettivaihtoehdot
  const priorities: { value: TaskPriority; label: string }[] = [
    { value: 'low', label: 'Matala' },
    { value: 'medium', label: 'Keski' },
    { value: 'high', label: 'Korkea' },
  ];

  // Haetaan väri prioriteetin mukaan
  const getColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return theme.colors.priorityHigh;
      case 'medium':
        return theme.colors.priorityMedium;
      case 'low':
        return theme.colors.priorityLow;
    }
  };

  return (
    <View style={styles.container}>
      {priorities.map((p) => {
        const isSelected = selected === p.value;
        const color = getColor(p.value);

        return (
          <TouchableOpacity
            key={p.value}
            onPress={() => onSelect(p.value)}
            style={[
              styles.option,
              {
                backgroundColor: isSelected ? color + '20' : 'transparent',
                borderColor: isSelected ? color : theme.colors.border,
              },
            ]}
          >
            {/* Pieni väripallo */}
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text
              style={[
                styles.label,
                { color: isSelected ? color : theme.colors.text },
              ]}
            >
              {p.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default PriorityPicker;