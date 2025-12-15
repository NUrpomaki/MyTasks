import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/Task/TaskItem'; // Tuo TaskItem
import { Ionicons } from '@expo/vector-icons';

const TaskListScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { tasks, deleteTask, toggleTask } = useTasks();

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
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    // Flexboxia käytetään headerissä
    list: {
        flex: 1,
    },
    emptyText: {
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
    }
  });

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      
      {/* Yläpalkki (Header) */}
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.headerTitle}>Omat Tehtävät ({tasks.filter(t => !t.completed).length})</Text>
        
        {/* Teemanvaihtopainike */}
        <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
                name={theme.name === 'light' ? 'moon' : 'sunny'} 
                size={28} 
                color={theme.colors.primary} 
            />
        </TouchableOpacity>
      </View>

      {/* Tehtävälista */}
      <FlatList
        style={dynamicStyles.list}
        data={tasks.sort((a, b) => (a.completed === b.completed) ? (b.createdAt - a.createdAt) : a.completed ? 1 : -1)} // Lajittelu: keskeneräiset ensin
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
        ListEmptyComponent={<Text style={dynamicStyles.emptyText}>Ei tehtäviä. Lisää uusi!</Text>}
      />
      
      {/* Tähän tulisi myöhemmin painike uuden tehtävän lisäämiseksi */}
      
    </SafeAreaView>
  );
};

export default TaskListScreen;