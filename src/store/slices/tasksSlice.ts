import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  isLoading: false,
  error: null,
  filter: {
    status: 'all',
    priority: 'all',
    searchQuery: '',
  },
};

// Helper function to store tasks in AsyncStorage
const storeTasks = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error storing tasks:', error);
  }
};

// Helper function to apply filters
const applyFilters = (tasks: Task[], filter: TasksState['filter']) => {
  let filtered = [...tasks];
  
  // Filter by status
  if (filter.status !== 'all') {
    filtered = filtered.filter(task => 
      filter.status === 'completed' ? task.completed : !task.completed
    );
  }
  
  // Filter by priority
  if (filter.priority !== 'all') {
    filtered = filtered.filter(task => task.priority === filter.priority);
  }
  
  // Filter by search query
  if (filter.searchQuery) {
    const query = filter.searchQuery.toLowerCase();
    filtered = filtered.filter(
      task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
    );
  }
  
  return filtered;
};

// Async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    // In a real app, this would be an API call
    // For demo purposes, we'll get tasks from AsyncStorage
    const tasksJson = await AsyncStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, { getState }) => {
    try {
      // Generate a new task with ID and timestamps
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Get current tasks from state
      const state = getState() as { tasks: TasksState };
      const updatedTasks = [...state.tasks.tasks, newTask];
      
      // Store in AsyncStorage
      await storeTasks(updatedTasks);
      
      return newTask;
    } catch (error) {
      throw new Error('Failed to add task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }, { getState }) => {
    try {
      // Get current tasks from state
      const state = getState() as { tasks: TasksState };
      const taskIndex = state.tasks.tasks.findIndex(task => task.id === id);
      
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      
      // Create updated task
      const updatedTask = {
        ...state.tasks.tasks[taskIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      // Update tasks array
      const updatedTasks = [...state.tasks.tasks];
      updatedTasks[taskIndex] = updatedTask;
      
      // Store in AsyncStorage
      await storeTasks(updatedTasks);
      
      return updatedTask;
    } catch (error) {
      throw new Error('Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { getState }) => {
    try {
      // Get current tasks from state
      const state = getState() as { tasks: TasksState };
      const updatedTasks = state.tasks.tasks.filter(task => task.id !== id);
      
      // Store in AsyncStorage
      await storeTasks(updatedTasks);
      
      return id;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }
);

// Tasks slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<TasksState['filter']>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
    clearFilters: state => {
      state.filter = initialState.filter;
      state.filteredTasks = state.tasks;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.filteredTasks = applyFilters(action.payload, state.filter);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.filteredTasks = applyFilters(state.tasks, state.filter);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add task';
      })
      
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          state.filteredTasks = applyFilters(state.tasks, state.filter);
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update task';
      })
      
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        state.filteredTasks = applyFilters(state.tasks, state.filter);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export const { setFilter, clearFilters } = tasksSlice.actions;
export default tasksSlice.reducer;
