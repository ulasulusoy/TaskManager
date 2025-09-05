import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TasksStackParamList } from './types';

// Import screens
import TasksListScreen from '../screens/tasks/TasksListScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import AddEditTaskScreen from '../screens/tasks/AddEditTaskScreen';

const Stack = createNativeStackNavigator<TasksStackParamList>();

const TasksNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TasksList"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="TasksList" 
        component={TasksListScreen} 
        options={{ title: 'My Tasks' }}
      />
      <Stack.Screen 
        name="TaskDetail" 
        component={TaskDetailScreen} 
        options={{ title: 'Task Details' }}
      />
      <Stack.Screen 
        name="AddEditTask" 
        component={AddEditTaskScreen} 
        options={({ route }) => ({ 
          title: route.params?.task ? 'Edit Task' : 'Add Task' 
        })}
      />
    </Stack.Navigator>
  );
};

export default TasksNavigator;
