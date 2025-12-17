import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Task } from '../../types/Task';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons'; // Ikonien käyttö
import PriorityBadge from './PriorityBadge';
import DueDateBadge from './DueDateBadge';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      backgroundColor: theme.colors.card,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.name === 'light' ? 0.1 : 0.4,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      textDecorationLine: task.completed ? 'line-through' : 'none',
      textDecorationColor: theme.colors.text,
      flex: 1,
    },
    description: {
      fontSize: 12,
      color: theme.colors.border,
      marginTop: 2,
    },
    badgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 4,
    },
    icon: {
      marginRight: 10,
    },
    thumbnail: {
      width: 44,
      height: 44,
      borderRadius: 10,
      marginLeft: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    deleteButton: {
      marginLeft: 12,
      padding: 5,
    },
  });

  return (
    <View style={dynamicStyles.card}>
      {/* 1. Valmis/Keskeneräinen ikoni */}
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={task.completed ? theme.colors.success : theme.colors.border}
          style={dynamicStyles.icon}
        />
      </TouchableOpacity>

      {/* 2. Teksti, prioriteetti ja määräaika */}
      <View style={dynamicStyles.textContainer}>
        <Text style={dynamicStyles.title} numberOfLines={1}>
          {task.title}
        </Text>

        {task.description && (
          <Text style={dynamicStyles.description} numberOfLines={1}>
            {task.description}
          </Text>
        )}

        {/* Badget prioriteetille ja määräajalle */}
        <View style={dynamicStyles.badgeRow}>
          <PriorityBadge priority={task.priority} />
          {task.dueDate && (
            <DueDateBadge dueDate={task.dueDate} completed={task.completed} />
          )}
        </View>
      </View>

      {/* 3. Kuva (jos valittu) */}
      {task.imageUri && (
        <Image source={{ uri: task.imageUri }} style={dynamicStyles.thumbnail} />
      )}

      {/* 4. Poisto ikoni */}
      <TouchableOpacity onPress={() => onDelete(task.id)} style={dynamicStyles.deleteButton}>
        <Ionicons
          name="trash-bin-outline"
          size={22}
          color={theme.colors.danger}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
