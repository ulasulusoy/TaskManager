// User types
export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
}

// Authentication types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
  isLoading: boolean;
  error: string | null;
  filter: {
    status: 'all' | 'completed' | 'active';
    priority: 'all' | 'low' | 'medium' | 'high';
    searchQuery: string;
  };
}

// App settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}

export interface SettingsState {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
}

// Root state
export interface RootState {
  auth: AuthState;
  tasks: TasksState;
  settings: SettingsState;
}
