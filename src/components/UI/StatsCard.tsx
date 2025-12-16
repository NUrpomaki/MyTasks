import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Tilastokortti yksittäisen tilaston näyttämiseen

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  subtitle,
}) => {
  const { theme } = useTheme();
  const iconColor = color || theme.colors.primary;

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      {/* Ikoni */}
      <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>

      {/* Teksti */}
      <Text style={[styles.title, { color: theme.colors.border }]}>
        {title}
      </Text>
      <Text style={[styles.value, { color: theme.colors.text }]}>
        {value}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.colors.border }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default StatsCard;