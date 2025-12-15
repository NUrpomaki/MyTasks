import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Task } from '../types/Task';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // Käytetään luomaan uniikkeja ID:itä

// 1. Määritellään kontekstin muoto
interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description?: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void; // Merkitse tehdyksi/keskeneräiseksi
}

// 2. Luodaan konteksti
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 3. Luo provider komponentti
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Alkuperäinen esimerkki dataa testausta varten
  const [tasks, setTasks] = useState<Task[]>([
    { id: uuidv4(), title: 'Suunnittele komponentit', description: 'Aloita TaskItemin ja FlatListin luomisella.', completed: true, createdAt: Date.now() - 3600000 },
    { id: uuidv4(), title: 'Tee ThemeContext', description: 'Toteuta tumman ja vaalean teeman vaihtomekanismi.', completed: true, createdAt: Date.now() - 1800000 },
    { id: uuidv4(), title: 'Koodaa TaskListScreen', description: 'Tämä on pääsivu, jolla tehtävät näkyvät.', completed: false, createdAt: Date.now() },
    { id: uuidv4(), title: 'Lisää navigointi', description: 'React Navigationin käyttöönotto kirjautumiseen ja listanäkymään.', completed: false, createdAt: Date.now() + 600000 },
  ]);

  // Lisää uusi tehtävä
  const addTask = useCallback((title: string, description?: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]); // Lisätään uusi tehtävä listan alkuun
  }, []);

  // Poista tehtävä
  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  // Merkitse tehdyksi/keskeneräiseksi
  const toggleTask = useCallback((id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// 4. Custom Hook kontekstin käyttämiseen
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};