import { NavigatorScreenParams } from '@react-navigation/native';
import { Task } from '../types';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  TasksStack: NavigatorScreenParams<TasksStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
};

// Tasks Stack
export type TasksStackParamList = {
  TasksList: undefined;
  TaskDetail: { taskId: string };
  AddEditTask: { task?: Task };
};

// Profile Stack
export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Camera: undefined;
};

// Settings Stack
export type SettingsStackParamList = {
  Settings: undefined;
  Notifications: undefined;
  About: undefined;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Loading: undefined;
};
