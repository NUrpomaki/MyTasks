import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Suodatinvälilehdet tehtävien tilan mukaan (Kaikki, Aktiiviset, Valmiit)

export type FilterType = 'all' | 'active' | 'completed';

interface FilterTabsProps {
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const FilterTabs: React.FC<FilterTabsProps> = ({ selected, onSelect, counts }) => {
  const { theme } = useTheme();

  // Välilehtien määrittelyt
  const tabs: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Kaikki' },
    { value: 'active', label: 'Aktiiviset' },
    { value: 'completed', label: 'Valmiit' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isSelected = selected === tab.value;
        const count = counts[tab.value];

        return (
          <TouchableOpacity
            key={tab.value}
            onPress={() => onSelect(tab.value)}
            style={[
              styles.tab,
              {
                backgroundColor: isSelected 
                  ? theme.colors.primary 
                  : 'transparent',
                borderColor: isSelected 
                  ? theme.colors.primary 
                  : theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                { 
                  color: isSelected 
                    ? '#fff' 
                    : theme.colors.text 
                },
              ]}
            >
              {tab.label}
            </Text>
            {/* Määrä pienessä ympyrässä */}
            <View 
              style={[
                styles.countBadge,
                {
                  backgroundColor: isSelected 
                    ? 'rgba(255,255,255,0.3)' 
                    : theme.colors.border + '40',
                },
              ]}
            >
              <Text 
                style={[
                  styles.countText,
                  { 
                    color: isSelected 
                      ? '#fff' 
                      : theme.colors.text 
                  },
                ]}
              >
                {count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default FilterTabs;