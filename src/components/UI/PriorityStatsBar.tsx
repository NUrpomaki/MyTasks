import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Prioriteettien jakaumaa näyttävä palkki

interface PriorityStatsBarProps {
  high: number;
  medium: number;
  low: number;
}

const PriorityStatsBar: React.FC<PriorityStatsBarProps> = ({ high, medium, low }) => {
  const { theme } = useTheme();
  const total = high + medium + low;

  // Jos ei tehtäviä, näytetään tyhjä palkki
  if (total === 0) {
    return (
      <View style={styles.container}>
        <View 
          style={[
            styles.bar, 
            { backgroundColor: theme.colors.border + '40' }
          ]} 
        />
        <Text style={[styles.emptyText, { color: theme.colors.border }]}>
          Ei tehtäviä
        </Text>
      </View>
    );
  }

  // Lasketaan prosenttiosuudet
  const highPercent = (high / total) * 100;
  const mediumPercent = (medium / total) * 100;
  const lowPercent = (low / total) * 100;

  return (
    <View style={styles.container}>
      {/* Jakauma palkki */}
      <View style={styles.bar}>
        {high > 0 && (
          <View 
            style={[
              styles.segment, 
              { 
                width: `${highPercent}%`, 
                backgroundColor: theme.colors.priorityHigh,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                borderTopRightRadius: medium === 0 && low === 0 ? 6 : 0,
                borderBottomRightRadius: medium === 0 && low === 0 ? 6 : 0,
              }
            ]} 
          />
        )}
        {medium > 0 && (
          <View 
            style={[
              styles.segment, 
              { 
                width: `${mediumPercent}%`, 
                backgroundColor: theme.colors.priorityMedium,
                borderTopLeftRadius: high === 0 ? 6 : 0,
                borderBottomLeftRadius: high === 0 ? 6 : 0,
                borderTopRightRadius: low === 0 ? 6 : 0,
                borderBottomRightRadius: low === 0 ? 6 : 0,
              }
            ]} 
          />
        )}
        {low > 0 && (
          <View 
            style={[
              styles.segment, 
              { 
                width: `${lowPercent}%`, 
                backgroundColor: theme.colors.priorityLow,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
                borderTopLeftRadius: high === 0 && medium === 0 ? 6 : 0,
                borderBottomLeftRadius: high === 0 && medium === 0 ? 6 : 0,
              }
            ]} 
          />
        )}
      </View>

      {/* Selitteet */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.priorityHigh }]} />
          <Text style={[styles.legendText, { color: theme.colors.text }]}>
            Korkea ({high})
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.priorityMedium }]} />
          <Text style={[styles.legendText, { color: theme.colors.text }]}>
            Keski ({medium})
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.priorityLow }]} />
          <Text style={[styles.legendText, { color: theme.colors.text }]}>
            Matala ({low})
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bar: {
    height: 16,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
  },
});

export default PriorityStatsBar;