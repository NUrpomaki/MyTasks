import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/Task/TaskItem';
import { Ionicons } from '@expo/vector-icons';
import FABButton from '../components/UI/FABButton';
import AddTaskModal from '../components/Task/AddTaskModal';

type Props = {
  onLogout: () => void;
};

const TaskListScreen: React.FC<Props> = ({ onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { tasks, deleteTask, toggleTask, addTask } = useTasks();

  // Modal auki / kiinni
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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

  const activeTasksCount = tasks.filter(t => !t.completed).length;

  const handleAddTask = (title: string, description?: string, imageUri?: string) => {
    addTask(title, description, imageUri);
    setIsAddModalVisible(false);
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

      {/* Tehtävälista */}
      <FlatList
        style={dynamicStyles.list}
        data={[...tasks].sort((a, b) =>
          a.completed === b.completed
            ? b.createdAt - a.createdAt
            : a.completed
            ? 1
            : -1
        )}
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
            Ei tehtäviä. Lisää uusi!
          </Text>
        }
      />

      {/* Floating Action Button */}
      <FABButton onPress={() => setIsAddModalVisible(true)} />

      {/* Add Task Modal */}
      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={handleAddTask}
      />
    </SafeAreaView>
  );
};

export default TaskListScreen;
