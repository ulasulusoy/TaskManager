import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsStackParamList } from './types';

// Import screens
import SettingsScreen from '../screens/settings/SettingsScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import AboutScreen from '../screens/settings/AboutScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ title: 'About' }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
