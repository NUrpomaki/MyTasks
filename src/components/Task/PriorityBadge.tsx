import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { TaskPriority } from '../../types/Task';

// Näyttää tehtävän prioriteetin värillisenä badgena

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const { theme } = useTheme();

  // Haetaan oikea väri prioriteetin mukaan
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return theme.colors.priorityHigh;
      case 'medium':
        return theme.colors.priorityMedium;
      case 'low':
        return theme.colors.priorityLow;
      default:
        return theme.colors.border;
    }
  };

  // Käännetään prioriteetti suomeksi
  const getPriorityLabel = () => {
    switch (priority) {
      case 'high':
        return 'Korkea';
      case 'medium':
        return 'Keski';
      case 'low':
        return 'Matala';
      default:
        return '';
    }
  };

  const badgeColor = getPriorityColor();

  return (
    <View style={[styles.badge, { backgroundColor: badgeColor + '20', borderColor: badgeColor }]}>
      <Text style={[styles.text, { color: badgeColor }]}>
        {getPriorityLabel()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default PriorityBadge;