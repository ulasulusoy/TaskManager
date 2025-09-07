import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAppSelector, useAppDispatch } from '../hooks';
import { checkAuth } from '../store/slices/authSlice';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

// Import screens
import LoadingScreen from '../screens/LoadingScreen';
import { OfflineIndicator } from '../components/common';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    // Check if user is authenticated
    dispatch(checkAuth());
  }, [dispatch]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <View style={{ flex: 1 }}>
      <OfflineIndicator />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            <Stack.Screen name="Main" component={MainTabNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default RootNavigator;
