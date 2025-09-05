import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList } from '../../navigation/types';
import { TaskList, TaskFilter } from '../../components/tasks';
import { AnimatedFAB } from '../../components/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchTasks, updateTask, deleteTask, setFilter } from '../../store/slices/tasksSlice';
import { spacing } from '../../utils/responsive';
import { Task } from '../../types';

type Props = NativeStackScreenProps<TasksStackParamList, 'TasksList'>;

const TasksListScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { filteredTasks, isLoading, filter } = useAppSelector(state => state.tasks);
  
  useEffect(() => {
    // Fetch tasks when component mounts
    dispatch(fetchTasks());
  }, [dispatch]);
  
  const handleTaskPress = (task: Task) => {
    navigation.navigate('TaskDetail', { taskId: task.id });
  };
  
  const handleToggleComplete = (task: Task) => {
    dispatch(updateTask({ id: task.id, updates: { completed: !task.completed } }));
  };
  
  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };
  
  const handleFilterChange = (newFilter: Partial<typeof filter>) => {
    dispatch(setFilter(newFilter));
  };
  
  const handleAddTask = () => {
    navigation.navigate('AddEditTask', {});
  };
  
  const handleRefresh = () => {
    dispatch(fetchTasks());
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TaskFilter filter={filter} onFilterChange={handleFilterChange} />
      
      <TaskList
        tasks={filteredTasks}
        onTaskPress={handleTaskPress}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
        refreshing={isLoading}
        onRefresh={handleRefresh}
      />
      
      <AnimatedFAB
        icon="plus"
        onPress={handleAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: spacing.m,
    right: 0,
    bottom: 0,
  },
});

export default TasksListScreen;
