import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import stack navigators
import TasksNavigator from './TasksNavigator';
import ProfileNavigator from './ProfileNavigator';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const theme = useTheme();
  
  return (
    <Tab.Navigator
      initialRouteName="TasksStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.surfaceVariant,
        },
      }}
    >
      <Tab.Screen 
        name="TasksStack" 
        component={TasksNavigator} 
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="checkbox-marked-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileStack" 
        component={ProfileNavigator} 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="SettingsStack" 
        component={SettingsNavigator} 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
