import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import { Task, TaskPriority } from '../types/Task';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// 1. Määritellään kontekstin muoto
interface TaskContextType {
  tasks: Task[];
  addTask: (
    title: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: number,
    imageUri?: string
  ) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

// 2. Luodaan konteksti
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 3. Provider
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: uuidv4(),
      title: 'Suunnittele komponentit',
      description: 'Aloita TaskItemin ja FlatListin luomisella.',
      completed: true,
      createdAt: Date.now() - 3600000,
      priority: 'high',
      dueDate: Date.now() - 86400000,
    },
    {
      id: uuidv4(),
      title: 'Tee ThemeContext',
      description: 'Toteuta tumman ja vaalean teeman vaihtomekanismi.',
      completed: true,
      createdAt: Date.now() - 1800000,
      priority: 'medium',
    },
    {
      id: uuidv4(),
      title: 'Koodaa TaskListScreen',
      description: 'Tämä on pääsivu, jolla tehtävät näkyvät.',
      completed: false,
      createdAt: Date.now(),
      priority: 'high',
      dueDate: Date.now(),
    },
    {
      id: uuidv4(),
      title: 'Lisää navigointi',
      description: 'React Navigationin käyttöönotto kirjautumiseen ja listanäkymään.',
      completed: false,
      createdAt: Date.now() - 600000,
      priority: 'low',
      dueDate: Date.now() + 86400000 * 3,
    },
  ]);

  const addTask = useCallback(
    (
      title: string,
      description?: string,
      priority: TaskPriority = 'medium',
      dueDate?: number,
      imageUri?: string
    ) => {
      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        completed: false,
        createdAt: Date.now(),
        priority,
        dueDate,
        imageUri,
      };

      setTasks(prev => [newTask, ...prev]);
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// 4. Hook
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
