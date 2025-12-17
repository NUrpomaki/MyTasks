import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/Task/TaskItem';
import { Ionicons } from '@expo/vector-icons';
import FABButton from '../components/UI/FABButton';
import AddTaskModal from '../components/Task/AddTaskModal';
import SearchBar from '../components/UI/SearchBar';
import FilterTabs, { FilterType } from '../components/UI/FilterTabs';
import { TaskPriority } from '../types/Task';

type Props = {
  onLogout: () => void;
  onOpenStats: () => void;
};

const TaskListScreen: React.FC<Props> = ({ onLogout, onOpenStats }) => {
  const { theme, toggleTheme } = useTheme();
  const { tasks, deleteTask, toggleTask, addTask } = useTasks();

  // Modal auki / kiinni
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Haku- ja suodatintila
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    list: {
      flex: 1,
    },
    emptyText: {
      color: theme.colors.text,
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
    },
  });

  const filterCounts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (activeFilter === 'active') {
      result = result.filter(t => !t.completed);
    } else if (activeFilter === 'completed') {
      result = result.filter(t => t.completed);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(t =>
        t.title.toLowerCase().includes(query) ||
        (t.description && t.description.toLowerCase().includes(query))
      );
    }

    return result.sort((a, b) =>
      a.completed === b.completed
        ? b.createdAt - a.createdAt
        : a.completed
        ? 1
        : -1
    );
  }, [tasks, activeFilter, searchQuery]);

  const activeTasksCount = tasks.filter(t => !t.completed).length;

  const handleAddTask = (
    title: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: number,
    imageUri?: string
  ) => {
    addTask(title, description, priority, dueDate, imageUri);
    setIsAddModalVisible(false);
  };

  const getEmptyMessage = () => {
    if (searchQuery.trim()) return 'Ei hakutuloksia.';
    if (activeFilter === 'active') return 'Ei aktiivisia tehtäviä.';
    if (activeFilter === 'completed') return 'Ei valmiita tehtäviä.';
    return 'Ei tehtäviä. Lisää uusi!';
  };

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <View style={dynamicStyles.headerLeft}>
          <Ionicons name="list" size={26} color={theme.colors.primary} />
          <Text style={dynamicStyles.headerTitle}>
            Omat Tehtävät ({activeTasksCount})
          </Text>
        </View>

        <View style={dynamicStyles.headerRight}>
          <TouchableOpacity onPress={onOpenStats}>
            <Ionicons name="stats-chart" size={26} color={theme.colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={theme.name === 'light' ? 'moon' : 'sunny'}
              size={26}
              color={theme.colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onLogout}>
            <Ionicons name="log-out-outline" size={26} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <FilterTabs
        selected={activeFilter}
        onSelect={setActiveFilter}
        counts={filterCounts}
      />

      <FlatList
        style={dynamicStyles.list}
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
        ListEmptyComponent={
          <Text style={dynamicStyles.emptyText}>
            {getEmptyMessage()}
          </Text>
        }
      />

      <FABButton onPress={() => setIsAddModalVisible(true)} />

      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </SafeAreaView>
  );
};

export default TaskListScreen;
