import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import ProgressBar from '../components/UI/ProgressBar';
import StatsCard from '../components/UI/StatsCard';
import PriorityStatsBar from '../components/UI/PriorityStatsBar';

// Tilastonäkymä tehtävien edistymisen seurantaan

type Props = {
  onBack: () => void;
  onLogout: () => void;
};

const StatsScreen: React.FC<Props> = ({ onBack, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { tasks } = useTasks();

  // Lasketaan tilastot
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Prioriteettien mukaan
    const byPriority = {
      high: tasks.filter(t => t.priority === 'high' && !t.completed).length,
      medium: tasks.filter(t => t.priority === 'medium' && !t.completed).length,
      low: tasks.filter(t => t.priority === 'low' && !t.completed).length,
    };

    // Myöhässä olevat tehtävät
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const overdue = tasks.filter(t => {
      if (t.completed || !t.dueDate) return false;
      const due = new Date(t.dueDate);
      due.setHours(0, 0, 0, 0);
      return due < now;
    }).length;

    // Tänään erääntyvät
    const dueToday = tasks.filter(t => {
      if (t.completed || !t.dueDate) return false;
      const due = new Date(t.dueDate);
      due.setHours(0, 0, 0, 0);
      return due.getTime() === now.getTime();
    }).length;

    // Tällä viikolla tehdyt (viimeisen 7 päivän aikana luodut ja valmiit)
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const completedThisWeek = tasks.filter(
      t => t.completed && t.createdAt >= weekAgo
    ).length;

    return {
      total,
      completed,
      active,
      completionRate,
      byPriority,
      overdue,
      dueToday,
      completedThisWeek,
    };
  }, [tasks]);

  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginLeft: 10,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 12,
    },
    progressContainer: {
      backgroundColor: theme.colors.card,
      padding: 20,
      borderRadius: 12,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    progressTitle: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
    },
    progressPercent: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    progressSubtext: {
      fontSize: 12,
      color: theme.colors.border,
      marginTop: 8,
    },
    cardsRow: {
      flexDirection: 'row',
      gap: 12,
    },
    priorityContainer: {
      backgroundColor: theme.colors.card,
      padding: 20,
      borderRadius: 12,
    },
    backButton: {
      padding: 4,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <View style={dynamicStyles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={dynamicStyles.backButton}>
            <Ionicons
              name="arrow-back"
              size={26}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <Text style={dynamicStyles.headerTitle}>
            Tilastot
          </Text>
        </View>

        <View style={dynamicStyles.headerRight}>
          {/* Teeman vaihto */}
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={theme.name === 'light' ? 'moon' : 'sunny'}
              size={26}
              color={theme.colors.primary}
            />
          </TouchableOpacity>

          {/* Kirjaudu ulos */}
          <TouchableOpacity onPress={onLogout}>
            <Ionicons
              name="log-out-outline"
              size={26}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={dynamicStyles.content}>
        {/* Edistyminen */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Kokonaisedistyminen</Text>
          <View style={dynamicStyles.progressContainer}>
            <View style={dynamicStyles.progressHeader}>
              <Text style={dynamicStyles.progressTitle}>Valmiusaste</Text>
              <Text style={dynamicStyles.progressPercent}>
                {stats.completionRate}%
              </Text>
            </View>
            <ProgressBar 
              progress={stats.completionRate} 
              height={14}
              fillColor={theme.colors.success}
            />
            <Text style={dynamicStyles.progressSubtext}>
              {stats.completed} / {stats.total} tehtävää tehty
            </Text>
          </View>
        </View>

        {/* Yhteenveto kortit */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Yhteenveto</Text>
          <View style={dynamicStyles.cardsRow}>
            <StatsCard
              title="Aktiiviset"
              value={stats.active}
              icon="list-outline"
              color={theme.colors.primary}
            />
            <StatsCard
              title="Valmiit"
              value={stats.completed}
              icon="checkmark-circle-outline"
              color={theme.colors.success}
            />
          </View>
          <View style={[dynamicStyles.cardsRow, { marginTop: 12 }]}>
            <StatsCard
              title="Myöhässä"
              value={stats.overdue}
              icon="alert-circle-outline"
              color={theme.colors.danger}
            />
            <StatsCard
              title="Tänään"
              value={stats.dueToday}
              icon="today-outline"
              color={theme.colors.priorityMedium}
            />
          </View>
        </View>

        {/* Viikon tilasto */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Tämä viikko</Text>
          <View style={dynamicStyles.cardsRow}>
            <StatsCard
              title="Tehty tällä viikolla"
              value={stats.completedThisWeek}
              icon="trophy-outline"
              color={theme.colors.success}
              subtitle="viimeisen 7 päivän aikana"
            />
          </View>
        </View>

        {/* Prioriteettien jakauma */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Aktiiviset prioriteetin mukaan</Text>
          <View style={dynamicStyles.priorityContainer}>
            <PriorityStatsBar
              high={stats.byPriority.high}
              medium={stats.byPriority.medium}
              low={stats.byPriority.low}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatsScreen;